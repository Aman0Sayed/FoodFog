
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddMealDialog from "./AddMealDialog";
import { useState } from "react";

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const meals = ['Breakfast', 'Lunch', 'Dinner'];

const mealPlans = {
  'Mon-Breakfast': 'Avocado Toast',
  'Mon-Lunch': 'Caesar Salad',
  'Mon-Dinner': 'Grilled Salmon',
  'Tue-Breakfast': 'Greek Yogurt',
  'Tue-Dinner': 'Pasta Primavera',
  'Wed-Lunch': 'Quinoa Bowl',
  'Wed-Dinner': 'Thai Curry',
  'Thu-Breakfast': 'Smoothie Bowl',
  'Fri-Lunch': 'Buddha Bowl',
  'Fri-Dinner': 'Pizza Night',
  'Sat-Breakfast': 'Pancakes',
  'Sat-Lunch': 'Sandwich',
  'Sun-Dinner': 'Roast Chicken'
};

const MealPlanningCalendar = () => {
  const [currentMeals, setCurrentMeals] = useState(mealPlans);

  const handleAddMeal = (day: string, meal: string, recipe: any) => {
    const mealKey = `${day}-${meal}`;
    setCurrentMeals(prev => ({
      ...prev,
      [mealKey]: recipe.title
    }));
  };

  const handleRemoveMeal = (day: string, meal: string) => {
    const mealKey = `${day}-${meal}`;
    setCurrentMeals(prev => {
      const newMeals = { ...prev };
      delete newMeals[mealKey];
      return newMeals;
    });
  };

  return (
    <div className="h-screen flex flex-col bg-cream-50">
      <div className="flex-1 container mx-auto px-4 py-8">
        <Card className="border-sage-200 shadow-lg h-full flex flex-col">
          <CardHeader className="border-b border-sage-100 pb-6 flex-shrink-0">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl lg:text-3xl font-serif text-sage-800 mb-2">
                  Weekly Meal Planner
                </CardTitle>
                <p className="text-sage-600">Plan your week ahead for stress-free cooking</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="border-sage-300">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="font-medium text-sage-700 min-w-[120px] text-center">
                  Jan 15-21, 2024
                </span>
                <Button variant="outline" size="icon" className="border-sage-300">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 flex-1 flex flex-col">
            <div className="grid grid-cols-8 gap-2 mb-4">
              <div className="p-3"></div>
              {daysOfWeek.map((day) => (
                <div key={day} className="p-3 text-center font-medium text-sage-700 bg-sage-50 rounded-lg">
                  {day}
                </div>
              ))}
            </div>

            <div className="flex-1">
              {meals.map((meal) => (
                <div key={meal} className="grid grid-cols-8 gap-2 mb-2">
                  <div className="p-3 font-medium text-sage-700 bg-cream-100 rounded-lg flex items-center">
                    {meal}
                  </div>
                  {daysOfWeek.map((day) => {
                    const mealKey = `${day}-${meal}`;
                    const plannedMeal = currentMeals[mealKey];
                    
                    return (
                      <div
                        key={`${day}-${meal}`}
                        className="min-h-[80px] p-2 border border-sage-200 rounded-lg hover:border-terracotta-300 transition-colors bg-white"
                      >
                        {plannedMeal ? (
                          <div 
                            className="bg-terracotta-50 text-terracotta-700 p-2 rounded text-sm font-medium h-full flex items-center justify-center text-center cursor-pointer hover:bg-terracotta-100"
                            onClick={() => handleRemoveMeal(day, meal)}
                            title="Click to remove meal"
                          >
                            {plannedMeal}
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <AddMealDialog
                              day={day}
                              mealType={meal}
                              onAddMeal={(recipe) => handleAddMeal(day, meal, recipe)}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center flex-shrink-0">
              <Button className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-6">
                Generate Meal Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MealPlanningCalendar;
