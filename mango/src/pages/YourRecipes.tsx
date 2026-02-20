import { useEffect, useState } from "react";
import api from "@/api/client";
import { Link } from "react-router-dom";
import { Clock, Users, Star, Pencil } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const YourRecipes = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<any | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  // Fetch user's recipes from backend
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const username = localStorage.getItem("username");
      if (!username) return;
      try {
        const res = await api.get("/api/your-recipes", { headers: { "x-username": username } });
        setRecipes(res.data || []);
      } catch {}
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
            <Link to="/your-recipes-list" className="mb-4 inline-block text-sage-600 hover:text-terracotta-600 text-sm">
              Switch to List View
            </Link>
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
                    <button
                      className="absolute top-2 right-2 bg-white/80 hover:bg-terracotta-100 rounded-full p-2 shadow"
                      onClick={() => {
                        setEditingRecipe(recipe);
                        setEditForm({ ...recipe });
                      }}
                      aria-label="Edit Recipe"
                    >
                      <Pencil className="w-5 h-5 text-sage-700" />
                    </button>
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
                    <Button size="sm" className="bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-full px-4 w-full" asChild>
                      <Link to={`/your-recipe/${recipe._id}`}>View Recipe</Link>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 w-full mt-2"
                      onClick={async () => {
                        if (!window.confirm("Are you sure you want to delete this recipe?")) return;
                        const username = localStorage.getItem("username");
                        if (!username) return;
                        await api.delete(`/api/your-recipes/${recipe._id}`, { headers: { "x-username": username } }).catch(() => {});
                        setRecipes((prev) => prev.filter((r) => r._id !== recipe._id));
                      }}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Edit Recipe Dialog */}
            <Dialog open={!!editingRecipe} onOpenChange={open => { if (!open) setEditingRecipe(null); }}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Recipe</DialogTitle>
                </DialogHeader>
                {editingRecipe && (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const username = localStorage.getItem("username");
                      if (!username) return;
                      try {
                        const res = await api.put(`/api/your-recipes/${editingRecipe._id}`, editForm, { headers: { "Content-Type": "application/json", "x-username": username } });
                        const updated = res.data;
                        setRecipes((prev) => prev.map(r => r._id === updated._id ? updated : r));
                        setEditingRecipe(null);
                      } catch {
                        alert("Failed to update recipe.");
                      }
                    }}
                    className="space-y-3"
                  >
                    <label className="block">
                      <span className="text-sm font-medium">Title</span>
                      <input className="w-full border rounded p-2" value={editForm.title || ""} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} required />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium">Description</span>
                      <textarea className="w-full border rounded p-2" value={editForm.description || ""} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} required />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium">Image URL</span>
                      <input className="w-full border rounded p-2" value={editForm.image || ""} onChange={e => setEditForm(f => ({ ...f, image: e.target.value }))} />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium">Time</span>
                      <input className="w-full border rounded p-2" value={editForm.time || ""} onChange={e => setEditForm(f => ({ ...f, time: e.target.value }))} />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium">Servings</span>
                      <input type="number" className="w-full border rounded p-2" value={editForm.servings || 1} onChange={e => setEditForm(f => ({ ...f, servings: Number(e.target.value) }))} />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium">Rating</span>
                      <input type="number" className="w-full border rounded p-2" value={editForm.rating || 0} onChange={e => setEditForm(f => ({ ...f, rating: Number(e.target.value) }))} min={0} max={5} />
                    </label>
                    {/* Add more fields as needed for tags, ingredients, nutrition, instructions */}
                    <div className="flex gap-2 mt-4">
                      <Button type="submit" className="bg-terracotta-500 hover:bg-terracotta-600 text-white">Save</Button>
                      <Button type="button" variant="outline" onClick={() => setEditingRecipe(null)}>Cancel</Button>
                    </div>
                  </form>
                )}
              </DialogContent>
            </Dialog>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default YourRecipes;
