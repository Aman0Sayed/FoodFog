import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Heart, Clock, Users, Star, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Favorites = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { favorites, removeFromFavorites } = useFavorites();
  const { toast } = useToast();

  const handleRemoveFromFavorites = (recipeId: number, title: string) => {
    removeFromFavorites(recipeId);
    toast({
      title: "Removed from favorites",
      description: `${title} has been removed from your favorites.`,
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 lg:ml-64 flex flex-col">
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-serif font-bold text-sage-800 mb-2 flex items-center">
                      <Heart className="h-8 w-8 mr-3 text-red-500 fill-red-500" />
                      Favorite Recipes
                    </h1>
                    <p className="text-sage-600">Your most loved recipes all in one place</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="bg-gradient-to-r from-terracotta-50 to-sage-50 rounded-lg p-6 border border-terracotta-200">
                  <h3 className="text-lg font-semibold text-sage-800 mb-2">Your Collection</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-2xl font-bold text-terracotta-600">{favorites.length}</span>
                      <p className="text-sage-600">Total Favorites</p>
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-terracotta-600">
                        {favorites.length > 0 ? (favorites.reduce((sum, recipe) => sum + recipe.rating, 0) / favorites.length).toFixed(1) : '0'}
                      </span>
                      <p className="text-sage-600">Average Rating</p>
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-terracotta-600">{Math.min(favorites.length, 8)}</span>
                      <p className="text-sage-600">Tried This Month</p>
                    </div>
                  </div>
                </div>
              </div>

              {favorites.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No favorites yet</h3>
                    <p className="text-gray-500">Start adding recipes to your favorites from the Recipe Collection!</p>
                    <Link to="/recipes">
                      <Button className="mt-4 bg-terracotta-500 hover:bg-terracotta-600">
                        Browse Recipes
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-hidden">
                  {viewMode === 'grid' ? (
                    <div className="h-full overflow-y-auto">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
                        {favorites.map((recipe) => (
                          <Card key={recipe.id} className="group cursor-pointer hover:shadow-md transition-shadow relative">
                            <Link to={`/recipe/${recipe.id}`}>
                              <div className="aspect-video bg-sage-100 rounded-t-lg overflow-hidden relative">
                                <img
                                  src={recipe.image}
                                  alt={recipe.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                                <div className="absolute top-2 right-2 z-10">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleRemoveFromFavorites(recipe.id, recipe.title);
                                    }}
                                    className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                                  >
                                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                  </Button>
                                </div>
                              </div>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg text-sage-800 group-hover:text-terracotta-600 transition-colors">
                                  {recipe.title}
                                </CardTitle>
                                <CardDescription className="text-sage-600">
                                  {recipe.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex items-center justify-between text-sm text-sage-500 mb-3">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {recipe.time}
                                  </div>
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-1" />
                                    {recipe.servings}
                                  </div>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                                    {recipe.rating}
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {recipe.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs bg-sage-100 text-sage-700">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                            </Link>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full overflow-y-auto">
                      <div className="space-y-4 pb-4">
                        {favorites.map((recipe) => (
                          <Card key={recipe.id} className="group cursor-pointer hover:shadow-md transition-shadow">
                            <Link to={`/recipe/${recipe.id}`}>
                              <div className="flex">
                                <div className="w-48 h-32 bg-sage-100 overflow-hidden relative">
                                  <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                  />
                                  <div className="absolute top-2 right-2 z-10">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleRemoveFromFavorites(recipe.id, recipe.title);
                                      }}
                                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                                    >
                                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="flex-1 p-6">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h3 className="text-xl font-semibold text-sage-800 group-hover:text-terracotta-600 transition-colors mb-2">
                                        {recipe.title}
                                      </h3>
                                      <p className="text-sage-600 mb-3">{recipe.description}</p>
                                      <div className="flex items-center space-x-4 text-sm text-sage-500 mb-3">
                                        <div className="flex items-center">
                                          <Clock className="h-4 w-4 mr-1" />
                                          {recipe.time}
                                        </div>
                                        <div className="flex items-center">
                                          <Users className="h-4 w-4 mr-1" />
                                          {recipe.servings} servings
                                        </div>
                                        <div className="flex items-center">
                                          <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                                          {recipe.rating}
                                        </div>
                                      </div>
                                      <div className="flex flex-wrap gap-1">
                                        {recipe.tags.map((tag) => (
                                          <Badge key={tag} variant="secondary" className="text-xs bg-sage-100 text-sage-700">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <div className="lg:ml-64">
        <Footer />
      </div>
    </div>
  );
};

export default Favorites;
