import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const YourRecipesList = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const username = localStorage.getItem("username");
      if (!username) return;
      const res = await fetch("/api/your-recipes", {
        headers: { "x-username": username },
      });
      if (res.ok) {
        const data = await res.json();
        setRecipes(data);
      }
      setLoading(false);
    };
    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-serif font-bold text-sage-800 mb-6">Your Recipes</h1>
            <h2 className="text-xl font-semibold text-sage-700 mb-4">Added Recipes</h2>
            {loading && <div>Loading...</div>}
            {recipes.length === 0 && !loading && <div className="text-sage-500">No recipes yet.</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe, idx) => (
                <Card key={idx} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-sage-100 hover:border-terracotta-200">
                  <div className="relative overflow-hidden">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sage-800 mb-2 line-clamp-1">{recipe.title}</h3>
                    <p className="text-sm text-sage-600 mb-3 line-clamp-2">{recipe.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-sage-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{recipe.servings}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{recipe.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {(recipe.tags || []).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-sage-100 text-sage-700">{tag}</Badge>
                      ))}
                    </div>
                    <Link to={`/your-recipe/${recipe._id}`}>
                      <Button size="sm" className="bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-full px-4 w-full">
                        View Recipe
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 w-full mt-2"
                      onClick={async () => {
                        if (!window.confirm("Are you sure you want to delete this recipe?")) return;
                        const username = localStorage.getItem("username");
                        if (!username) return;
                        await fetch(`/api/your-recipes/${recipe._id}`, {
                          method: "DELETE",
                          headers: { "x-username": username },
                        });
                        setRecipes((prev) => prev.filter((r) => r._id !== recipe._id));
                      }}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default YourRecipesList;
