import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { TrendingUp, Clock, Users, Star, Flame, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Trending = () => {
  const trendingRecipes = [
    {
      id: 1,
      title: "Viral TikTok Pasta",
      description: "The baked feta pasta that broke the internet",
      time: "25 min",
      servings: 4,
      rating: 4.6,
      views: "2.3M",
      trend: "+156%",
      image: "/placeholder.svg",
      tags: ["Viral", "Pasta", "Easy"]
    },
    {
      id: 2,
      title: "Cloud Bread",
      description: "Fluffy, protein-packed bread alternative",
      time: "30 min",
      servings: 8,
      rating: 4.4,
      views: "1.8M",
      trend: "+89%",
      image: "/placeholder.svg",
      tags: ["Trending", "Healthy", "Low Carb"]
    },
    {
      id: 3,
      title: "Dalgona Coffee",
      description: "Whipped coffee that's taking over social media",
      time: "10 min",
      servings: 2,
      rating: 4.7,
      views: "3.1M",
      trend: "+234%",
      image: "/placeholder.svg",
      tags: ["Coffee", "Viral", "Drink"]
    }
  ];

  const categories = [
    { name: "Quick & Easy", count: 45, trend: "+23%" },
    { name: "Healthy", count: 38, trend: "+18%" },
    { name: "Comfort Food", count: 29, trend: "+12%" },
    { name: "International", count: 31, trend: "+27%" },
    { name: "Desserts", count: 22, trend: "+35%" },
    { name: "Vegan", count: 19, trend: "+41%" }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-serif font-bold text-sage-800 mb-2 flex items-center">
                <TrendingUp className="h-8 w-8 mr-3 text-terracotta-600" />
                Trending Recipes
              </h1>
              <p className="text-sage-600">Discover what's hot in the culinary world right now</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-red-50 to-red-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hot Right Now</CardTitle>
                  <Flame className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-800">156</div>
                  <p className="text-xs text-red-600">Viral recipes</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Views Today</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-800">12.3M</div>
                  <p className="text-xs text-orange-600">+23% from yesterday</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-terracotta-50 to-terracotta-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New This Week</CardTitle>
                  <ArrowUp className="h-4 w-4 text-terracotta-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-terracotta-800">89</div>
                  <p className="text-xs text-terracotta-600">Fresh recipes</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-sage-50 to-sage-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                  <Star className="h-4 w-4 text-sage-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-sage-800">4.6</div>
                  <p className="text-xs text-sage-600">Trending recipes</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="recipes" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:w-96">
                <TabsTrigger value="recipes">Trending Recipes</TabsTrigger>
                <TabsTrigger value="categories">Hot Categories</TabsTrigger>
              </TabsList>

              <TabsContent value="recipes">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trendingRecipes.map((recipe) => (
                    <Card key={recipe.id} className="group cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden">
                      <div className="absolute top-2 left-2 z-10">
                        <Badge className="bg-red-500 hover:bg-red-600 text-white">
                          <Flame className="h-3 w-3 mr-1" />
                          {recipe.trend}
                        </Badge>
                      </div>
                      <div className="aspect-video bg-sage-100 rounded-t-lg overflow-hidden">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
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
                        <div className="flex items-center justify-between text-sm text-sage-500 mb-2">
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
                        <div className="text-sm text-terracotta-600 font-medium mb-3">
                          {recipe.views} views
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {recipe.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-sage-100 text-sage-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="categories">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category) => (
                    <Card key={category.name} className="group cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-sage-800 group-hover:text-terracotta-600 transition-colors">
                            {category.name}
                          </CardTitle>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {category.trend}
                          </Badge>
                        </div>
                        <CardDescription>
                          {category.count} trending recipes
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full border-sage-200 text-sage-600 hover:bg-sage-50">
                          Explore Category
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Trending;
