import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Calculator, Plus, Minus, Zap, Apple, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

const NutritionCalculator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [ingredients, setIngredients] = useState([
    { id: 1, name: "Chicken Breast", amount: 100, unit: "g" },
    { id: 2, name: "Brown Rice", amount: 50, unit: "g" },
    { id: 3, name: "Broccoli", amount: 80, unit: "g" }
  ]);

  const [newIngredient, setNewIngredient] = useState({ name: "", amount: "", unit: "g" });

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.amount) {
      setIngredients([
        ...ingredients,
        {
          id: Date.now(),
          name: newIngredient.name,
          amount: parseFloat(newIngredient.amount),
          unit: newIngredient.unit
        }
      ]);
      setNewIngredient({ name: "", amount: "", unit: "g" });
    }
  };

  const removeIngredient = (id: number) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const updateIngredient = (id: number, field: string, value: any) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };

  // Mock nutrition calculation (in a real app, this would use a nutrition API)
  const totalNutrition = {
    calories: 387,
    protein: 42.3,
    carbs: 28.1,
    fat: 8.9,
    fiber: 4.2,
    sugar: 3.1,
    sodium: 245
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-serif font-bold text-sage-800 mb-2 flex items-center">
                <Calculator className="h-8 w-8 mr-3 text-terracotta-600" />
                Nutrition Calculator
              </h1>
              <p className="text-sage-600">Calculate the nutritional value of your dishes and recipes</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Ingredients Input */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-sage-800">Recipe Ingredients</CardTitle>
                    <CardDescription>Add ingredients to calculate total nutrition</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Add New Ingredient */}
                    <div className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-6">
                        <Label htmlFor="ingredient-name">Ingredient</Label>
                        <Input
                          id="ingredient-name"
                          placeholder="e.g., Chicken breast"
                          value={newIngredient.name}
                          onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                        />
                      </div>
                      <div className="col-span-3">
                        <Label htmlFor="ingredient-amount">Amount</Label>
                        <Input
                          id="ingredient-amount"
                          type="number"
                          placeholder="100"
                          value={newIngredient.amount}
                          onChange={(e) => setNewIngredient({...newIngredient, amount: e.target.value})}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="ingredient-unit">Unit</Label>
                        <select
                          id="ingredient-unit"
                          className="w-full h-10 px-3 py-2 border border-sage-200 rounded-md text-sm"
                          value={newIngredient.unit}
                          onChange={(e) => setNewIngredient({...newIngredient, unit: e.target.value})}
                        >
                          <option value="g">g</option>
                          <option value="kg">kg</option>
                          <option value="ml">ml</option>
                          <option value="l">l</option>
                          <option value="cup">cup</option>
                          <option value="tbsp">tbsp</option>
                          <option value="tsp">tsp</option>
                        </select>
                      </div>
                      <div className="col-span-1">
                        <Button onClick={addIngredient} size="sm" className="w-full">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Ingredient List */}
                    <div className="space-y-2">
                      {ingredients.map((ingredient) => (
                        <div key={ingredient.id} className="grid grid-cols-12 gap-2 items-center p-3 bg-sage-50 rounded-lg">
                          <div className="col-span-6">
                            <Input
                              value={ingredient.name}
                              onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                              className="bg-white"
                            />
                          </div>
                          <div className="col-span-3">
                            <Input
                              type="number"
                              value={ingredient.amount}
                              onChange={(e) => updateIngredient(ingredient.id, 'amount', parseFloat(e.target.value))}
                              className="bg-white"
                            />
                          </div>
                          <div className="col-span-2">
                            <select
                              className="w-full h-10 px-3 py-2 border border-sage-200 rounded-md text-sm bg-white"
                              value={ingredient.unit}
                              onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                            >
                              <option value="g">g</option>
                              <option value="kg">kg</option>
                              <option value="ml">ml</option>
                              <option value="l">l</option>
                              <option value="cup">cup</option>
                              <option value="tbsp">tbsp</option>
                              <option value="tsp">tsp</option>
                            </select>
                          </div>
                          <div className="col-span-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeIngredient(ingredient.id)}
                              className="w-full text-red-600 hover:bg-red-50"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-terracotta-500 hover:bg-terracotta-600">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calculate Nutrition
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Nutrition Results */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-sage-800">Nutritional Information</CardTitle>
                    <CardDescription>Per serving based on current ingredients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-terracotta-50 to-terracotta-100 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-terracotta-800">Calories</span>
                          <Zap className="h-4 w-4 text-terracotta-600" />
                        </div>
                        <div className="text-2xl font-bold text-terracotta-800">{totalNutrition.calories}</div>
                        <div className="text-xs text-terracotta-600">kcal</div>
                      </div>

                      <div className="bg-gradient-to-br from-sage-50 to-sage-100 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-sage-800">Protein</span>
                          <Apple className="h-4 w-4 text-sage-600" />
                        </div>
                        <div className="text-2xl font-bold text-sage-800">{totalNutrition.protein}g</div>
                        <div className="text-xs text-sage-600">44% DV</div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-800">Carbs</span>
                          <Droplets className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-blue-800">{totalNutrition.carbs}g</div>
                        <div className="text-xs text-blue-600">10% DV</div>
                      </div>

                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-yellow-800">Fat</span>
                          <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
                        </div>
                        <div className="text-2xl font-bold text-yellow-800">{totalNutrition.fat}g</div>
                        <div className="text-xs text-yellow-600">11% DV</div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-sage-600">Fiber</span>
                        <span className="font-medium text-sage-800">{totalNutrition.fiber}g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-sage-600">Sugar</span>
                        <span className="font-medium text-sage-800">{totalNutrition.sugar}g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-sage-600">Sodium</span>
                        <span className="font-medium text-sage-800">{totalNutrition.sodium}mg</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-sage-800">Macronutrient Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Protein</span>
                          <span>44%</span>
                        </div>
                        <div className="w-full bg-sage-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '44%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Carbs</span>
                          <span>29%</span>
                        </div>
                        <div className="w-full bg-sage-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '29%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Fat</span>
                          <span>21%</span>
                        </div>
                        <div className="w-full bg-sage-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '21%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default NutritionCalculator;
