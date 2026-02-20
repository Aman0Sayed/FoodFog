import { User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileSidebar from "./MobileSidebar";
import { useTheme } from "@/components/ui/theme-provider";
import { Sun, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import api from "@/api/client";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({ accounts: [], recipes: [], own: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  // Add static RecipeCollection recipes for search
  const recipeCollectionRecipes = [
    { id: 1, title: "Mediterranean Quinoa Bowl" },
    { id: 2, title: "Homemade Pizza Margherita" },
    { id: 3, title: "Thai Green Curry" },
    { id: 4, title: "Chocolate Lava Cake" },
    { id: 5, title: "Grilled Salmon with Herbs" },
    { id: 6, title: "Vegetarian Tacos" },
    { id: 7, title: "Vanilla Ice Cream" },
    { id: 8, title: "Classic Beef Stew" },
    { id: 9, title: "Orange Juice" },
    { id: 10, title: "Grandma's Chocolate Chip Cookies" },
    { id: 11, title: "Creamy Mushroom Risotto" },
    { id: 12, title: "Korean BBQ Tacos" },
  ];

  useEffect(() => {
    if (!search) {
      setResults({ accounts: [], recipes: [], own: [] });
      setShowDropdown(false);
      return;
    }
    let ignore = false;
    const fetchResults = async () => {
      // Fetch accounts
      let accounts: any[] = [];
      try {
        const accRes = await api.get("/api/all-users");
        accounts = Array.isArray(accRes.data) ? accRes.data : [];
      } catch {}
      // Fetch all public recipes (simulate with static/demo data or add endpoint if needed)
      let recipes: any[] = [];
      try {
        const recRes = await api.get("/api/recipes-by-user", { params: { username: "demo" } }); // fallback: fetch demo user's recipes
        recipes = Array.isArray(recRes.data) ? recRes.data : [];
      } catch {}
      // Fetch own recipes if logged in
      let own: any[] = [];
      const username = localStorage.getItem("username");
      if (username) {
        try {
          const ownRes = await api.get("/api/your-recipes", { headers: { "x-username": username } });
          own = Array.isArray(ownRes.data) ? ownRes.data : [];
        } catch {}
      }
      // Smarter filter: match if any word in the title matches the query (case-insensitive, partial)
      const q = search.toLowerCase().trim();
      const matchSmart = (title) => {
        if (!title) return false;
        const words = title.toLowerCase().split(/\s+/);
        return words.some(word => word.includes(q)) || title.toLowerCase().includes(q);
      };
      const filteredAccounts = accounts.filter((a) => a.username?.toLowerCase().includes(q));
      // Search RecipeCollection recipes
      const filteredRecipeCollection = recipeCollectionRecipes.filter(r => matchSmart(r.title));
      // Combine with any backend recipes if needed (currently not used)
      const filteredRecipes = filteredRecipeCollection;
      const filteredOwn = own.filter((r) => matchSmart(r.title));
      if (!ignore) {
        setResults({ accounts: filteredAccounts, recipes: filteredRecipes, own: filteredOwn });
        setShowDropdown(true);
      }
    };
    fetchResults();
    return () => { ignore = true; };
  }, [search]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-sage-200 bg-cream-50/95 backdrop-blur supports-[backdrop-filter]:bg-cream-50/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <MobileSidebar />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sage-600 to-sage-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FF</span>
            </div>
            <h1 className="text-xl font-serif font-semibold text-sage-800">FoodFog</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 h-4 w-4" />
            <Input
              ref={inputRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => search && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              placeholder="Search accounts, recipes, or your recipes..."
              className="pl-10 bg-white/70 border-sage-200 focus:border-sage-400 focus:ring-sage-200"
            />
            {showDropdown && (search || results.accounts.length || results.recipes.length || results.own.length) && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-sage-200 rounded shadow-lg z-50 max-h-80 overflow-y-auto">
                {results.accounts.length > 0 && (
                  <div>
                    <div className="px-3 pt-2 pb-1 text-xs text-sage-500 font-semibold">Accounts</div>
                    {results.accounts.map((a) => (
                      <div key={a.username} className="px-4 py-2 hover:bg-sage-50 cursor-pointer" onMouseDown={() => navigate(`/explore-account/${a.username}`)}>
                        @{a.username} <span className="text-xs text-sage-400">{a.role}</span>
                      </div>
                    ))}
                  </div>
                )}
                {results.recipes.length > 0 && (
                  <div>
                    <div className="px-3 pt-2 pb-1 text-xs text-sage-500 font-semibold">Recipes</div>
                    {results.recipes.map((r) => (
                      <div key={r._id || r.id} className="px-4 py-2 hover:bg-sage-50 cursor-pointer" onMouseDown={() => navigate(`/recipe/${r._id || r.id}`)}>
                        {r.title}
                      </div>
                    ))}
                  </div>
                )}
                {results.own.length > 0 && (
                  <div>
                    <div className="px-3 pt-2 pb-1 text-xs text-sage-500 font-semibold">Your Recipes</div>
                    {results.own.map((r) => (
                      <div key={r._id} className="px-4 py-2 hover:bg-sage-50 cursor-pointer" onMouseDown={() => navigate(`/your-recipe/${r._id}`)}>
                        {r.title}
                      </div>
                    ))}
                  </div>
                )}
                {results.accounts.length === 0 && results.recipes.length === 0 && results.own.length === 0 && (
                  <div className="px-4 py-2 text-sage-400">No results found.</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-sage-600 hover:text-sage-700 shadow-md shadow-sage-300/40 border border-sage-200 bg-white rounded-full transition-all duration-200">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate("/account")}>Account</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
