import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { sendContactEmail, type ContactFormData } from "./emailService.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware to parse JSON bodies (MUST come before routes)
  app.use(express.json());

  // API endpoint for contact form (MUST come before static files)
  app.post("/api/contact", async (req, res) => {
    try {
      console.log("Received contact form submission:", req.body);

      const { name, phone, email, message } = req.body as ContactFormData;

      // Basic validation
      if (!name || !phone || !email || !message) {
        console.log("Validation failed: Missing fields");
        return res.status(400).json({
          success: false,
          error: "All fields are required",
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.log("Validation failed: Invalid email format");
        return res.status(400).json({
          success: false,
          error: "Invalid email address",
        });
      }

      // Send email
      console.log("Attempting to send email...");
      await sendContactEmail({ name, phone, email, message });
      console.log("Email sent successfully!");

      res.status(200).json({
        success: true,
        message: "Your message has been sent successfully",
      });
    } catch (error) {
      console.error("Error in /api/contact endpoint:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";

      // Check if it's a configuration error
      if (errorMessage.includes('Email configuration is missing')) {
        return res.status(503).json({
          success: false,
          error: "Email service is not configured. Please contact the administrator.",
          details: errorMessage,
        });
      }

      // Check if it's an authentication error
      if (errorMessage.includes('authentication failed') || errorMessage.includes('Invalid login')) {
        return res.status(503).json({
          success: false,
          error: "Email service authentication failed. Please contact the administrator.",
          details: errorMessage,
        });
      }

      // Generic server error
      res.status(500).json({
        success: false,
        error: "Failed to send message. Please try again later.",
        details: errorMessage,
      });
    }
  });

  // Serve static files from dist/public in production (AFTER API routes)
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes (MUST be last)
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
