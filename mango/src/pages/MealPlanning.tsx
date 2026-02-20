import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import AddMealDialog, { recipes as staticRecipes } from "@/components/AddMealDialog";
import { Calendar, Clock, Users, ChefHat, X, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "@/components/ui/use-toast";

const ItemType = {
  MEAL: "meal"
};

function DraggableMeal({ meal, mealKey, onDragStart }: { meal: any; mealKey: string; onDragStart: (mealKey: string) => void }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.MEAL,
    item: { mealKey },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [mealKey]);

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {/* ...existing meal cell content... */}
      {meal}
    </div>
  );
}

function DroppableCell({ day, mealType, onDropMeal, children }: { day: string; mealType: string; onDropMeal: (fromKey: string, toKey: string) => void; children: React.ReactNode }) {
  const mealKey = `${day}-${mealType}`;
  const [, drop] = useDrop(() => ({
    accept: ItemType.MEAL,
    drop: (item: { mealKey: string }) => {
      if (item.mealKey !== mealKey) {
        onDropMeal(item.mealKey, mealKey);
      }
    },
  }), [mealKey]);

  return <div ref={drop} className="h-full">{children}</div>;
}

// Helper function to calculate total prep time
function getTotalPrepTime(meals: Record<string, any>): string {
  // Sum up all meal times in minutes
  let totalMinutes = 0;
  Object.values(meals).forEach((meal: any) => {
    if (meal && meal.time) {
      // Extract number from time string (e.g., "45 min", "1h 30min")
      const match = meal.time.match(/(?:(\d+\.?\d*)\s*h)?\s*(\d+)?\s*min?/i);
      if (match) {
        const hours = match[1] ? parseFloat(match[1]) : 0;
        const minutes = match[2] ? parseInt(match[2]) : 0;
        totalMinutes += hours * 60 + minutes;
      }
    }
  });
  // Convert total minutes to hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h${minutes > 0 ? ` ${minutes}min` : ''}` : `${minutes}min`;
}

// Helper function to calculate total servings
function getTotalServings(meals: Record<string, any>): number {
  let total = 0;
  Object.values(meals).forEach((meal: any) => {
    if (meal && meal.servings) {
      total += Number(meal.servings) || 0;
    }
  });
  return total;
}

const MealPlanning = () => {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

  const [meals, setMeals] = useState<Record<string, any>>({});

  useEffect(() => {
    // Fetch meals for the logged-in user from backend
    const username = localStorage.getItem("username");
    if (!username) return;
    fetch("/api/meals", {
      headers: { "x-username": username }
    })
      .then(res => res.json())
      .then(data => {
        // Convert array of meals to { key: recipe } format
        const loadedMeals: Record<string, any> = {};
        data.forEach((meal: any) => {
          loadedMeals[`${meal.day}-${meal.mealType}`] = meal.recipe;
        });
        setMeals(loadedMeals);
      });
  }, []);

  // Save meals to backend whenever meals state changes, with debounce and notification
  useEffect(() => {
    if (!Object.keys(meals).length) return;
    const username = localStorage.getItem("username");
    if (!username) return;
    const controller = new AbortController();
    const saveMeals = async () => {
      try {
        await Promise.all(
          Object.entries(meals).map(([key, recipe]) => {
            const [day, mealType] = key.split("-");
            return fetch("/api/meals", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-username": username
              },
              body: JSON.stringify({ day, mealType, recipe }),
              signal: controller.signal
            });
          })
        );
        toast({
          title: "Meal Plan Saved",
          description: "Your meal has been added to the calendar .",
        });
      } catch (err) {
        // Optionally show error toast
      }
    };
    const timeout = setTimeout(saveMeals, 800); // debounce
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [meals]);

  const handleAddMeal = (day: string, mealType: string, recipe: any) => {
    const key = `${day}-${mealType}`;
    setMeals(prev => ({
      ...prev,
      [key]: recipe
    }));
  };

  const handleRemoveMeal = (day: string, mealType: string) => {
    const key = `${day}-${mealType}`;
    setMeals(prev => {
      const newMeals = { ...prev };
      delete newMeals[key];
      return newMeals;
    });
    // Remove from DB
    const username = localStorage.getItem("username");
    if (username) {
      fetch("/api/meals", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-username": username
        },
        body: JSON.stringify({ day, mealType })
      });
    }
  };

  const handleDropMeal = (fromKey: string, toKey: string) => {
    setMeals(prev => {
      const newMeals = { ...prev };
      // Swap if both cells have meals, otherwise move
      if (newMeals[toKey] && newMeals[fromKey]) {
        const temp = newMeals[toKey];
        newMeals[toKey] = newMeals[fromKey];
        newMeals[fromKey] = temp;
      } else {
        newMeals[toKey] = newMeals[fromKey];
        delete newMeals[fromKey];
      }
      return newMeals;
    });
  };

  // Gather all unique ingredients from planned meals
  const getAllGroceryIngredients = () => {
    const allIngredients: string[] = [];
    Object.values(meals).forEach((meal: any) => {
      if (meal && Array.isArray(meal.ingredients)) {
        allIngredients.push(...meal.ingredients);
      }
    });
    // Remove duplicates
    return Array.from(new Set(allIngredients));
  };

  // Print all grocery ingredients, grouped by recipe, using only recipes from the backend (calendar)
  const handlePrintGrocery = () => {
    // Group ingredients by recipe title from the current calendar (meals state)
    const recipeMap: Record<string, Set<string>> = {};
    Object.values(meals).forEach((meal: any) => {
      let ingredients = meal?.ingredients;
      if ((!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) && meal?.id) {
        const found = staticRecipes.find((r: any) => r.id === meal.id);
        if (found && Array.isArray(found.ingredients)) {
          ingredients = found.ingredients;
        }
      }
      if (meal && meal.title && Array.isArray(ingredients) && ingredients.length > 0) {
        if (!recipeMap[meal.title]) {
          recipeMap[meal.title] = new Set();
        }
        ingredients.forEach((ingredient: string) => recipeMap[meal.title].add(ingredient));
      }
    });
    const hasAnyIngredients = Object.values(recipeMap).some(set => set.size > 0);
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Grocery List - Meal Plan</title>
          <style>
            body { font-family: sans-serif; padding: 2rem; }
            h1 { color: #374151; }
            h2 { margin-top: 2rem; color: #b45309; }
            ul { margin-top: 0.5rem; }
            li { margin-bottom: 0.5rem; }
          </style>
        </head>
        <body>
          <h1>Grocery List for Meal Plan</h1>
          ${hasAnyIngredients ?
            Object.entries(recipeMap).map(([title, ingredients]) => `
              <h2>${title}</h2>
              <ul>
                ${Array.from(ingredients).map((item) => `<li>${item}</li>`).join("")}
              </ul>
            `).join("") :
            '<p style="color:#b91c1c;">No grocery ingredients found for your planned meals.</p>'
          }
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-white font-sans">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 lg:ml-64">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-sage-800 mb-2">Meal Planning</h1>
                  <p className="text-sage-600">Plan your weekly meals and stay organized</p>
                </div>
                <Button
                  className="bg-terracotta-500 hover:bg-terracotta-600 text-white flex items-center gap-2"
                  onClick={handlePrintGrocery}
                  title="Print grocery list for all planned meals"
                >
                  <Printer className="w-5 h-5" />
                  Get Grocery
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-terracotta-50 to-terracotta-100">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">This Week</CardTitle>
                    <Calendar className="h-4 w-4 text-terracotta-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-terracotta-800">{Object.keys(meals).length}</div>
                    <p className="text-xs text-terracotta-600">Meals planned</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-sage-50 to-sage-100">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Prep Time</CardTitle>
                    <Clock className="h-4 w-4 text-sage-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-sage-800">{getTotalPrepTime(meals)}</div>
                    <p className="text-xs text-sage-600">Total this week</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-cream-50 to-cream-100">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Servings</CardTitle>
                    <Users className="h-4 w-4 text-sage-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-sage-800">{getTotalServings(meals)}</div>
                    <p className="text-xs text-sage-600">Total Serving</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-terracotta-50 to-sage-50">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recipes</CardTitle>
                    <ChefHat className="h-4 w-4 text-terracotta-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-terracotta-800">
                      {new Set(Object.values(meals).map((meal: any) => meal.id)).size}
                    </div>
                    <p className="text-xs text-terracotta-600">Unique dishes</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                <div className="grid grid-cols-8 gap-0">
                  <div className="bg-sage-50 p-4 font-medium text-sage-800">Week</div>
                  {weekDays.map((day) => (
                    <div key={day} className="bg-sage-50 p-4 text-center font-medium text-sage-800">
                      {day}
                    </div>
                  ))}
                  
                  {mealTypes.map((mealType) => (
                    <React.Fragment key={mealType}>
                      <div className="bg-cream-50 p-4 font-medium text-sage-800">{mealType}</div>
                      {weekDays.map((day) => {
                        const mealKey = `${day}-${mealType}`;
                        const plannedMeal = meals[mealKey];
                        return (
                          <DroppableCell key={mealKey} day={day} mealType={mealType} onDropMeal={handleDropMeal}>
                            {plannedMeal ? (
                              <DraggableMeal meal={<div className="bg-terracotta-50 text-terracotta-700 p-2 rounded text-sm font-medium h-full flex flex-col justify-between relative group">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => handleRemoveMeal(day, mealType)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                                <div className="text-center pr-6 font-semibold">{plannedMeal.title}</div>
                                <div className="text-xs text-terracotta-600 text-center mt-1">{plannedMeal.time}</div>
                                {plannedMeal.ingredients && plannedMeal.ingredients.length > 0 && (
                                  <ul className="text-xs text-sage-700 mt-2 list-disc list-inside text-left">
                                    {plannedMeal.ingredients.slice(0, 4).map((item: string, idx: number) => (
                                      <li key={idx}>{item}</li>
                                    ))}
                                    {plannedMeal.ingredients.length > 4 && <li>...</li>}
                                  </ul>
                                )}
                              </div>} mealKey={mealKey} onDragStart={() => {}} />
                            ) : (
                              <AddMealDialog 
                                day={day} 
                                mealType={mealType} 
                                onAddMeal={(recipe) => handleAddMeal(day, mealType, recipe)}
                              />
                            )}
                          </DroppableCell>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </DndProvider>
  );
};

export default MealPlanning;
