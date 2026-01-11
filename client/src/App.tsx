import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/services"} component={Services} />
      <Route path={"/contact"} component={ContactUs} />
      <Route path={"/gallery"} component={Gallery} />
      <Route path={"/products"} component={Products} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  useEffect(() => {
    // Check if scripts already exist to avoid duplicates
    const bootstrapScriptId = 'bootstrap-bundle-script';
    const customScriptId = 'custom-script';
    
    // Load Bootstrap JS only if it doesn't already exist
    if (!document.getElementById(bootstrapScriptId)) {
      const bootstrapScript = document.createElement('script');
      bootstrapScript.id = bootstrapScriptId;
      bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
      bootstrapScript.async = true;
      bootstrapScript.crossOrigin = 'anonymous';
      document.body.appendChild(bootstrapScript);
    }

    // Load custom script only if it doesn't already exist
    if (!document.getElementById(customScriptId)) {
      const customScript = document.createElement('script');
      customScript.id = customScriptId;
      customScript.src = '/script.js';
      customScript.async = true;
      document.body.appendChild(customScript);
    }

    // No cleanup function - scripts should persist for the lifetime of the page
    // Removing them can cause issues with React's reconciliation and libraries that depend on them
  }, []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider
          defaultTheme="light"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
