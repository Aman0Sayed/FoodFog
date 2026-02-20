import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Index from "./pages/Index";
import MealPlanning from "./pages/MealPlanning";
import RecipeCollection from "./pages/RecipeCollection";
import RecipeDetail from "./pages/RecipeDetail";
import AddRecipe from "./pages/AddRecipe";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Register from "./pages/Register";
import YourRecipes from "./pages/YourRecipes";
import YourRecipesList from "./pages/YourRecipesList";
import YourRecipeDetail from "./pages/YourRecipeDetail";
import { useEffect } from "react";
import { ThemeProvider, useTheme } from "@/components/ui/theme-provider";
import Grocery from "./pages/Grocery";
import Account from "./pages/Account";
import ExploreAccounts from "./pages/ExploreAccounts";
import ExploreAccountDetail from "./pages/ExploreAccountDetail";

const queryClient = new QueryClient();

function RequireAuth({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);
  if (!isLoggedIn) {
    return null;
  }
  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <FavoritesProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/*"
                element={
                  <RequireAuth>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/meal-planning" element={<MealPlanning />} />
                      <Route path="/recipes" element={<RecipeCollection />} />
                      <Route path="/recipe/:id" element={<RecipeDetail />} />
                      <Route path="/add-recipe" element={<AddRecipe />} />
                      <Route path="/favorites" element={<Favorites />} />
                      <Route path="/grocery" element={<Grocery />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/your-recipes" element={<YourRecipes />} />
                      <Route path="/your-recipes-list" element={<YourRecipesList />} />
                      <Route path="/your-recipe/:id" element={<YourRecipeDetail />} />
                      <Route path="/account" element={<Account />} />
                      <Route path="/explore-accounts" element={<ExploreAccounts />} />
                      <Route path="/explore-account/:username" element={<ExploreAccountDetail />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </RequireAuth>
                }
              />
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
