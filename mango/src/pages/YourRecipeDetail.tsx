import { useEffect, useState } from "react";
import api from "@/api/client";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";

const YourRecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      const username = localStorage.getItem("username");
      let found = null;
      if (username && id) {
        try {
          const res = await api.get("/api/your-recipes", { headers: { "x-username": username } });
          const data = res.data || [];
          found = (data as any[]).find((r: any) => r._id === id);
        } catch {}
      }
      if (!found && id) {
        // Try to fetch any recipe by id (public)
        try {
          const res = await api.get(`/api/recipe/${id}`);
          found = res.data;
        } catch {}
      }
      setRecipe(found);
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div className="min-h-screen bg-white font-sans"><Header /><Sidebar /><main className="flex-1 lg:ml-64"><div className="max-w-2xl mx-auto py-16 text-center text-sage-500">Recipe not found.</div></main><Footer /></div>;

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/your-recipes-list" className="text-sage-600 hover:text-terracotta-600 text-sm mb-4 inline-block">&larr; Back to Your Recipes</Link>
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-serif text-sage-800 mb-2">{recipe.title}</CardTitle>
                <div className="flex items-center space-x-6 text-sage-600 mb-2">
                  <div className="flex items-center"><Clock className="h-5 w-5 mr-2" /><span>{recipe.time}</span></div>
                  <div className="flex items-center"><Users className="h-5 w-5 mr-2" /><span>{recipe.servings} servings</span></div>
                  <div className="flex items-center"><Star className="h-5 w-5 mr-2 fill-yellow-400 text-yellow-400" /><span>{recipe.rating}</span></div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {(recipe.tags || []).map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-sage-100 text-sage-700">{tag}</Badge>
                  ))}
                </div>
                <p className="text-sage-700 mb-4">{recipe.description}</p>
              </CardHeader>
              <CardContent>
                <img src={recipe.image || "/placeholder.svg"} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-sage-800 mb-2">Ingredients</h4>
                    <ul className="list-disc list-inside text-sage-700 space-y-1">
                      {(recipe.ingredients || []).map((ing: string, i: number) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sage-800 mb-2">Nutrition Facts</h4>
                    <ul className="text-sage-700 space-y-1">
                      {(() => {
                        const n = recipe.nutrition || {};
                        return [
                          n.calories && <li key="calories">Calories: {n.calories}</li>,
                          n.protein && <li key="protein">Protein: {n.protein}</li>,
                          n.carbs && <li key="carbs">Carbs: {n.carbs}</li>,
                          n.fat && <li key="fat">Fat: {n.fat}</li>,
                          n.fiber && <li key="fiber">Fiber: {n.fiber}</li>,
                          n.sodium && <li key="sodium">Sodium: {n.sodium}</li>,
                        ].filter(Boolean);
                      })()}
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sage-800 mb-2">Cooking Instructions</h4>
                  <ol className="list-decimal list-inside text-sage-700 space-y-2">
                    {(recipe.instructions || []).map((step: string, i: number) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default YourRecipeDetail;
