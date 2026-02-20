import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Filter, Clock, Users, Star, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const RecipeCollection = () => {
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const recipes = [
    {
      id: 1,
      title: "Mediterranean Quinoa Bowl",
      description: "Fresh and healthy bowl with quinoa, vegetables, and feta",
      time: "25 min",
      servings: 4,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      tags: ["Healthy", "Vegetarian", "Mediterranean"]
    },
    {
      id: 2,
      title: "Homemade Pizza Margherita",
      description: "Classic Italian pizza with fresh mozzarella and basil",
      time: "45 min",
      servings: 6,
      rating: 4.9,
      image: "https://media.istockphoto.com/id/1393150881/photo/italian-pizza-margherita-with-cheese-and-tomato-sauce-on-the-board-on-grey-table-macro-close.jpg?s=612x612&w=0&k=20&c=kL0Vhg2XKBjEl__iG8sFv31WTiahdpLc3rTDtNZuD2g=",
      tags: ["Italian", "Vegetarian", "Pizza"]
    },
    {
      id: 3,
      title: "Thai Green Curry",
      description: "Aromatic coconut curry with vegetables and herbs",
      time: "35 min",
      servings: 6,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
      tags: ["Spicy", "Thai", "Vegan"]
    },
    {
      id: 4,
      title: "Chocolate Lava Cake",
      description: "Decadent dessert with molten chocolate center",
      time: "20 min",
      servings: 2,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
      tags: ["Dessert", "Chocolate", "Sweet"]
    },
    {
      id: 5,
      title: "Grilled Salmon with Herbs",
      description: "Light and flavorful salmon with fresh herbs",
      time: "35 min",
      servings: 4,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
      tags: ["Seafood", "Healthy", "Grilled"]
    },
    {
      id: 6,
      title: "Vegetarian Tacos",
      description: "Delicious plant-based tacos with black beans",
      time: "20 min",
      servings: 4,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
      tags: ["Mexican", "Vegetarian", "Quick"]
    },
    {
      id: 7,
      title: "Vanilla Ice Cream",
      description: "Classic homemade vanilla ice cream, creamy and delicious",
      time: "20 min",
      servings: 4,
      rating: 4.8,
      image: "https://img.freepik.com/premium-photo/bowl-with-delicious-vanilla-ice-cream-white-background_392895-571003.jpg?semt=ais_hybrid&w=740",
      tags: ["Dessert", "Vegetarian", "Ice Cream"]
    },
    {
      id: 8,
      title: "Classic Beef Stew",
      description: "Hearty and comforting stew perfect for cold days",
      time: "2h 15min",
      servings: 8,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975",
      tags: ["Comfort Food", "Beef", "Slow Cook"]
    },
    {
      id: 9,
      title: "Orange Juice",
      description: "Freshly squeezed orange juice, full of vitamin C",
      time: "10 min",
      servings: 2,
      rating: 4.7,
      image: "https://img.freepik.com/free-photo/glass-orange-juice-placed-wood_1150-9661.jpg?t=st=1748934047~exp=1748937647~hmac=1af376117263d5731d3dec8fafce2e014f878b37c997a3543a8548358ea8ff81&w=1060",
      tags: ["Drink", "Healthy", "Juice"]
    },
    {
      id: 10,
      title: "Grandma's Chocolate Chip Cookies",
      description: "The perfect chewy and crispy cookie recipe",
      time: "45 min",
      servings: 24,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
      tags: ["Dessert", "Baking", "Family Recipe"]
    },
    {
      id: 11,
      title: "Creamy Mushroom Risotto",
      description: "Rich and creamy Italian comfort food",
      time: "40 min",
      servings: 4,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371",
      tags: ["Italian", "Vegetarian", "Comfort Food"]
    },
    {
      id: 12,
      title: "Korean BBQ Tacos",
      description: "Fusion dish combining Korean and Mexican flavors",
      time: "30 min",
      servings: 6,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828",
      tags: ["Fusion", "Korean", "Mexican"]
    }
  ];

  // Combine recipes with favorites (favorites first, then regular recipes that aren't favorited)
  const allRecipes = [...favorites, ...recipes.filter(recipe => !isFavorite(recipe.id))];
  
  const filteredRecipes = allRecipes.filter(recipe => {
    let typeMatch = true;
    if (filterType === "veg") typeMatch = recipe.tags.includes("Vegetarian");
    if (filterType === "nonveg") typeMatch = !recipe.tags.includes("Vegetarian") && !recipe.tags.includes("Dessert") && !recipe.tags.includes("Drink");
    if (filterType === "dessert") typeMatch = recipe.tags.includes("Dessert");
    if (filterType === "drink") typeMatch = recipe.tags.includes("Drink");
    let ratingMatch = recipe.rating >= rating;
    return typeMatch && ratingMatch;
  });

  const recipesPerPage = 4;
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const startIndex = currentPage * recipesPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, startIndex + recipesPerPage);

  const handleToggleFavorite = (recipe: any) => {
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
      toast({
        title: "Removed from favorites",
        description: `${recipe.title} has been removed from your favorites.`,
      });
    } else {
      addToFavorites(recipe);
      toast({
        title: "Added to favorites",
        description: `${recipe.title} has been added to your favorites.`,
      });
    }
  };

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  // IDs that should not have navigation (the previously pre-existing favorites)
  const noNavigationIds = [10, 11, 12];

  const RecipeCard = ({ recipe }: { recipe: any }) => (
    <Card className="group cursor-pointer hover:shadow-md transition-shadow relative h-full">
      {noNavigationIds.includes(recipe.id) ? (
        <Link to={`/recipe/${recipe.id}`} className="h-full flex flex-col">
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
                  handleToggleFavorite(recipe);
                }}
                className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
              >
                <Heart 
                  className={`h-4 w-4 ${
                    isFavorite(recipe.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-400 hover:text-red-500'
                  }`} 
                />
              </Button>
            </div>
          </div>
          <CardHeader className="pb-2 flex-1">
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
          </CardContent>
        </Link>
      ) : (
        <Link to={recipe.title === "Vanilla Ice Cream" ? "/recipe/7" : `/recipe/${recipe.id}`} className="h-full flex flex-col">
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
                  handleToggleFavorite(recipe);
                }}
                className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
              >
                <Heart 
                  className={`h-4 w-4 ${
                    isFavorite(recipe.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-400 hover:text-red-500'
                  }`} 
                />
              </Button>
            </div>
          </div>
          <CardHeader className="pb-2 flex-1">
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
          </CardContent>
        </Link>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 lg:ml-64 flex flex-col">
          <div className="flex-1 overflow-hidden">
            <div className="px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-sage-800 mb-2">Recipe Collection</h1>
                <p className="text-sage-600">Discover and organize your favorite recipes</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button variant="outline" className="border-sage-200 text-sage-600 hover:bg-sage-50" onClick={() => setShowFilter(v => !v)}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                {showFilter && (
                  <div className="flex gap-2 mb-4 items-center">
                    <Button variant={filterType === "veg" ? "default" : "outline"} onClick={() => setFilterType("veg")}>Veg</Button>
                    <Button variant={filterType === "nonveg" ? "default" : "outline"} onClick={() => setFilterType("nonveg")}>Non Veg</Button>
                    <Button variant={filterType === "dessert" ? "default" : "outline"} onClick={() => setFilterType("dessert")}>Dessert</Button>
                    <Button variant={filterType === "drink" ? "default" : "outline"} onClick={() => setFilterType("drink")}>Drink</Button>
                    <Button variant="ghost" onClick={() => setFilterType("")}>Clear</Button>
                    <div className="flex items-center ml-4">
                      <span className="mr-2 text-sage-700">Min Rating:</span>
                      <input type="range" min="0" max="5" step="0.1" value={rating} onChange={e => setRating(Number(e.target.value))} className="w-32" />
                      <span className="ml-2 text-sage-700 font-bold">{rating}</span>
                    </div>
                  </div>
                )}
                <Link to="/add-recipe?your=1">
                  <Button className="bg-terracotta-500 hover:bg-terracotta-600">
                    Add Recipe
                  </Button>
                </Link>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-sage-800">All Recipes</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevious}
                      disabled={currentPage === 0}
                      className="border-sage-200 text-sage-600 hover:bg-sage-50 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <span className="text-sm text-sage-600 px-3">
                      Page {currentPage + 1} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNext}
                      disabled={currentPage === totalPages - 1}
                      className="border-sage-200 text-sage-600 hover:bg-sage-50 disabled:opacity-50"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredRecipes.slice(startIndex, startIndex + recipesPerPage).map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </div>
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

export default RecipeCollection;
