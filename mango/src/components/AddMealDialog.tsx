import { useState } from "react";
import { Plus, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const recipes = [
	{
		id: 1,
		title: "Mediterranean Quinoa Bowl",
		description: "Fresh and healthy bowl with quinoa, vegetables, and feta",
		time: "25 min",
		servings: 4,
		rating: 4.8,
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
		tags: ["Healthy", "Vegetarian", "Mediterranean"],
		ingredients: [
			"1 cup quinoa",
			"2 cups vegetable broth",
			"1 cucumber, diced",
			"2 tomatoes, chopped",
			"1/2 red onion, sliced",
			"1/4 cup feta cheese",
			"2 tbsp olive oil",
			"1 lemon, juiced",
			"Fresh herbs (parsley, mint)",
		],
	},
	{
		id: 2,
		title: "Homemade Pizza Margherita",
		description: "Classic Italian pizza with fresh mozzarella and basil",
		time: "45 min",
		servings: 6,
		rating: 4.9,
		image: "https://media.istockphoto.com/id/1393150881/photo/italian-pizza-margherita-with-cheese-and-tomato-sauce-on-the-board-on-grey-table-macro-close.jpg?s=612x612&w=0&k=20&c=kL0Vhg2XKBjEl__iG8sFv31WTiahdpLc3rTDtNZuD2g=",
		tags: ["Italian", "Vegetarian", "Pizza"],
		ingredients: [
			"2 cups all-purpose flour",
			"1 tsp active dry yeast",
			"1 tsp salt",
			"3/4 cup warm water",
			"2 tbsp olive oil",
			"1/2 cup pizza sauce",
			"8 oz fresh mozzarella",
			"Fresh basil leaves",
			"Salt and pepper to taste",
		],
	},
	{
		id: 3,
		title: "Thai Green Curry",
		description: "Aromatic coconut curry with chicken and vegetables",
		time: "25 min",
		servings: 4,
		rating: 4.7,
		image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
		tags: ["Thai", "Spicy", "Asian"],
		ingredients: [
			"1 lb chicken breast, sliced",
			"2 tbsp green curry paste",
			"1 can coconut milk",
			"1 bell pepper, sliced",
			"1 eggplant, cubed",
			"2 tbsp fish sauce",
			"1 tbsp brown sugar",
			"Thai basil leaves",
			"Jasmine rice for serving",
		],
	},
	{
		id: 4,
		title: "Chocolate Lava Cake",
		description: "Decadent dessert with molten chocolate center",
		time: "20 min",
		servings: 2,
		rating: 4.9,
		image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
		tags: ["Dessert", "Chocolate", "Sweet"],
		ingredients: [
			"4 oz dark chocolate",
			"4 tbsp butter",
			"2 large eggs",
			"2 tbsp granulated sugar",
			"Pinch of salt",
			"2 tbsp all-purpose flour",
			"Butter for ramekins",
			"Powdered sugar for dusting",
		],
	},
	{
		id: 5,
		title: "Grilled Salmon with Herbs",
		description: "Light and flavorful salmon with fresh herbs",
		time: "35 min",
		servings: 4,
		rating: 4.6,
		image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
		tags: ["Seafood", "Healthy", "Grilled"],
		ingredients: [
			"4 salmon fillets (6 oz each)",
			"2 tbsp olive oil",
			"2 cloves garlic, minced",
			"2 tbsp fresh dill",
			"2 tbsp fresh parsley",
			"1 lemon, sliced",
			"Salt and pepper to taste",
			"1 tbsp butter",
		],
	},
	{
		id: 6,
		title: "Vegetarian Tacos",
		description: "Delicious plant-based tacos with black beans",
		time: "20 min",
		servings: 4,
		rating: 4.5,
		image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
		tags: ["Mexican", "Vegetarian", "Quick"],
		ingredients: [
			"8 corn tortillas",
			"1 can black beans, drained",
			"1 bell pepper, diced",
			"1/2 red onion, sliced",
			"1 avocado, sliced",
			"1/2 cup salsa",
			"Fresh cilantro",
			"Lime wedges",
		],
	},
];

interface AddMealDialogProps {
	day: string;
	mealType: string;
	onAddMeal: (recipe: any) => void;
}

const AddMealDialog = ({ day, mealType, onAddMeal }: AddMealDialogProps) => {
	const [open, setOpen] = useState(false);

	const handleSelectRecipe = (recipe: any) => {
		onAddMeal(recipe);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="w-full h-full border-dashed border-sage-300 text-sage-500 hover:border-terracotta-300 hover:text-terracotta-600"
				>
					<Plus className="h-4 w-4 mr-2" />
					Add Meal
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-4xl max-h-[80vh]">
				<DialogHeader>
					<DialogTitle className="text-xl font-serif text-sage-800">
						Add {mealType} for {day}
					</DialogTitle>
				</DialogHeader>
				<ScrollArea className="h-[60vh] pr-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{recipes.map((recipe) => (
							<Card
								key={recipe.id}
								className="cursor-pointer hover:shadow-md transition-shadow border-sage-200 hover:border-terracotta-200"
								onClick={() => handleSelectRecipe(recipe)}
							>
								<div className="aspect-video bg-sage-100 rounded-t-lg overflow-hidden">
									<img
										src={recipe.image}
										alt={recipe.title}
										className="w-full h-full object-cover"
									/>
								</div>
								<CardContent className="p-4">
									<h3 className="font-semibold text-sage-800 mb-2 line-clamp-1">
										{recipe.title}
									</h3>
									<p className="text-sm text-sage-600 mb-3 line-clamp-2">
										{recipe.description}
									</p>
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
										{recipe.tags.slice(0, 2).map((tag) => (
											<Badge
												key={tag}
												variant="secondary"
												className="text-xs bg-sage-100 text-sage-700"
											>
												{tag}
											</Badge>
										))}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

export default AddMealDialog;
