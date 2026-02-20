import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams, useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [time, setTime] = useState("");
  const [servings, setServings] = useState("");
  const [rating, setRating] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [fiber, setFiber] = useState("");
  const [sodium, setSodium] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isYourRecipe = searchParams.get("your") === "1";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const updateInstruction = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    if (isYourRecipe) {
      // Save to user recipes
      const username = localStorage.getItem("username");
      if (!username) return;
      const res = await fetch("/api/your-recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-username": username },
        body: JSON.stringify({
          title,
          description,
          image,
          time,
          servings: Number(servings) || 1,
          rating: Number(rating) || 0,
          tags: tags && tags.length ? tags : [],
          ingredients: ingredients.filter((i) => i && i.trim()),
          nutrition: {
            calories: calories || "",
            protein: protein || "",
            carbs: carbs || "",
            fat: fat || "",
            fiber: fiber || "",
            sodium: sodium || ""
          },
          instructions: instructions.filter((i) => i && i.trim()),
        }),
      });
      setLoading(false);
      if (res.ok) {
        setTitle("");
        setDescription("");
        setSuccess("Recipe added!");
        toast({ title: "Recipe Added!", description: "Your recipe has been added to your account." });
        setTimeout(() => navigate("/your-recipes"), 1000);
      }
    } else {
      // ...existing code for public recipes...
      setLoading(false);
      toast({ title: "Recipe Added!", description: "Your recipe has been successfully added to the collection." });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-serif font-bold text-sage-800 mb-2">Add New Recipe</h1>
              <p className="text-sage-600">Share your favorite recipe with our community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-sage-800">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Recipe Title</Label>
                      <Input id="title" placeholder="Enter recipe title" required value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input id="image" placeholder="https://..." value={image} onChange={e => setImage(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Recipe description" required value={description} onChange={e => setDescription(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="time">Cooking Time</Label>
                      <Input id="time" placeholder="30 min" required value={time} onChange={e => setTime(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="servings">Servings</Label>
                      <Input id="servings" type="number" placeholder="4" required value={servings} onChange={e => setServings(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="type">Food Type</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                          <SelectItem value="seafood">Seafood</SelectItem>
                          <SelectItem value="drink">Drink</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" placeholder="e.g., Italian, Asian, Dessert" required />
                  </div>
                </CardContent>
              </Card>

              {/* Ingredients */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-sage-800">Ingredients</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={ingredient}
                        onChange={(e) => updateIngredient(index, e.target.value)}
                        placeholder={`Ingredient ${index + 1}`}
                        required
                      />
                      {ingredients.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeIngredient(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addIngredient}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Ingredient
                  </Button>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-sage-800">Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {instructions.map((instruction, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-terracotta-500 text-white rounded-full flex items-center justify-center text-sm font-medium mt-2">
                        {index + 1}
                      </span>
                      <Textarea
                        value={instruction}
                        onChange={(e) => updateInstruction(index, e.target.value)}
                        placeholder={`Step ${index + 1}`}
                        required
                      />
                      {instructions.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeInstruction(index)}
                          className="mt-2"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addInstruction}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Instruction
                  </Button>
                </CardContent>
              </Card>

              {/* Nutrition Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-sage-800">Nutrition Information (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="calories">Calories</Label>
                      <Input id="calories" type="number" placeholder="320" value={calories} onChange={e => setCalories(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="protein">Protein</Label>
                      <Input id="protein" placeholder="12g" value={protein} onChange={e => setProtein(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="carbs">Carbs</Label>
                      <Input id="carbs" placeholder="45g" value={carbs} onChange={e => setCarbs(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="fat">Fat</Label>
                      <Input id="fat" placeholder="10g" value={fat} onChange={e => setFat(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="fiber">Fiber</Label>
                      <Input id="fiber" placeholder="5g" value={fiber} onChange={e => setFiber(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="sodium">Sodium</Label>
                      <Input id="sodium" placeholder="200mg" value={sodium} onChange={e => setSodium(e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-3 text-lg"
                  disabled={loading}
                >
                  {loading ? "Adding Recipe..." : "Add Recipe"}
                </Button>
              </div>
            </form>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AddRecipe;
