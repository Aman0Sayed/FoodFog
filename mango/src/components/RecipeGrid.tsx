import { Clock, Users, Star, Leaf, Drumstick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const recipes = [
	{
		id: 1,
		title: "Mediterranean Quinoa Bowl",
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
		time: "30 min",
		servings: 4,
		difficulty: "Easy",
		rating: 4.8,
		category: "Healthy",
		type: "vegetarian",
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
		nutrition: {
			calories: 320,
			protein: "12g",
			carbs: "45g",
			fat: "10g",
			fiber: "6g",
			sodium: "380mg",
		},
		instructions: [
			"Rinse quinoa under cold water until water runs clear.",
			"In a medium saucepan, bring vegetable broth to a boil.",
			"Add quinoa, reduce heat to low, cover and simmer for 15 minutes.",
			"Remove from heat and let stand 5 minutes, then fluff with a fork.",
			"In a large bowl, combine cooked quinoa with vegetables.",
			"Whisk together olive oil and lemon juice for dressing.",
			"Toss quinoa mixture with dressing and top with feta cheese.",
			"Garnish with fresh herbs and serve immediately.",
		],
	},
	{
		id: 2,
		title: "Homemade Pizza Margherita",
		image: "https://media.istockphoto.com/id/1393150881/photo/italian-pizza-margherita-with-cheese-and-tomato-sauce-on-the-board-on-grey-table-macro-close.jpg?s=612x612&w=0&k=20&c=kL0Vhg2XKBjEl__iG8sFv31WTiahdpLc3rTDtNZuD2g=",
		time: "45 min",
		servings: 6,
		difficulty: "Medium",
		rating: 4.9,
		category: "Italian",
		type: "vegetarian",
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
		nutrition: {
			calories: 285,
			protein: "12g",
			carbs: "38g",
			fat: "9g",
			fiber: "2g",
			sodium: "420mg",
		},
		instructions: [
			"Mix flour, yeast, and salt in a large bowl.",
			"Add warm water and olive oil, mix until dough forms.",
			"Knead dough for 8-10 minutes until smooth.",
			"Place in oiled bowl, cover and let rise for 1 hour.",
			"Preheat oven to 475°F (245°C).",
			"Roll out dough on floured surface.",
			"Spread sauce, add torn mozzarella and basil.",
			"Bake for 12-15 minutes until crust is golden.",
		],
	},
	{
		id: 3,
		title: "Thai Green Curry",
		image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
		time: "25 min",
		servings: 4,
		difficulty: "Medium",
		rating: 4.7,
		category: "Asian",
		type: "non-vegetarian",
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
		nutrition: {
			calories: 380,
			protein: "28g",
			carbs: "15g",
			fat: "25g",
			fiber: "3g",
			sodium: "520mg",
		},
		instructions: [
			"Heat oil in a large pan over medium-high heat.",
			"Add curry paste and cook for 1 minute until fragrant.",
			"Add thick part of coconut milk, stir to combine.",
			"Add chicken and cook until no longer pink.",
			"Add vegetables and remaining coconut milk.",
			"Season with fish sauce and brown sugar.",
			"Simmer for 10-15 minutes until vegetables are tender.",
			"Garnish with Thai basil and serve over rice.",
		],
	},
	{
		id: 4,
		title: "Chocolate Lava Cake",
		image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
		time: "20 min",
		servings: 2,
		difficulty: "Hard",
		rating: 4.9,
		category: "Dessert",
		type: "vegetarian",
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
		nutrition: {
			calories: 425,
			protein: "8g",
			carbs: "35g",
			fat: "28g",
			fiber: "4g",
			sodium: "120mg",
		},
		instructions: [
			"Preheat oven to 425°F (220°C).",
			"Butter two 6-oz ramekins thoroughly.",
			"Melt chocolate and butter in microwave, stir until smooth.",
			"Whisk eggs, sugar, and salt until thick.",
			"Fold chocolate mixture into egg mixture.",
			"Add flour and mix until just combined.",
			"Divide batter between ramekins.",
			"Bake for 12-14 minutes until edges are firm but center jiggles.",
		],
	},
	{
		id: 5,
		title: "Grilled Salmon with Herbs",
		image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
		time: "35 min",
		servings: 4,
		difficulty: "Easy",
		rating: 4.6,
		category: "Seafood",
		type: "seafood",
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
		nutrition: {
			calories: 340,
			protein: "35g",
			carbs: "2g",
			fat: "20g",
			fiber: "0g",
			sodium: "280mg",
		},
		instructions: [
			"Preheat grill to medium-high heat.",
			"Pat salmon fillets dry and season with salt and pepper.",
			"Mix olive oil, garlic, dill, and parsley in a bowl.",
			"Brush herb mixture over salmon fillets.",
			"Grill salmon for 4-5 minutes per side.",
			"Add lemon slices to grill in last 2 minutes.",
			"Remove from grill and top with butter.",
			"Serve immediately with grilled lemon slices.",
		],
	},
	{
		id: 6,
		title: "Vegetarian Tacos",
		image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
		time: "20 min",
		servings: 4,
		difficulty: "Easy",
		rating: 4.5,
		category: "Mexican",
		type: "vegetarian",
		ingredients: [
			"8 corn tortillas",
			"1 can black beans, drained",
			"1 bell pepper, diced",
			"1 onion, diced",
			"2 tbsp olive oil",
			"1 tsp cumin",
			"1 tsp chili powder",
			"1 avocado, sliced",
			"1/4 cup cilantro, chopped",
			"Lime wedges for serving",
		],
		nutrition: {
			calories: 245,
			protein: "9g",
			carbs: "35g",
			fat: "8g",
			fiber: "10g",
			sodium: "320mg",
		},
		instructions: [
			"Heat olive oil in a large skillet over medium heat.",
			"Add onion and bell pepper, cook until softened.",
			"Add black beans, cumin, and chili powder.",
			"Cook for 5 minutes, stirring occasionally.",
			"Warm tortillas in a dry skillet or microwave.",
			"Fill tortillas with bean mixture.",
			"Top with avocado slices and cilantro.",
			"Serve with lime wedges on the side.",
		],
	},
	{
		id: 7,
		title: "Vanilla Ice Cream",
		image: "https://img.freepik.com/premium-photo/bowl-with-delicious-vanilla-ice-cream-white-background_392895-571003.jpg?semt=ais_hybrid&w=740",
		time: "20 min",
		servings: 4,
		difficulty: "Easy",
		rating: 4.8,
		category: "Dessert",
		type: "vegetarian",
		ingredients: [
			"2 cups heavy cream",
			"1 cup whole milk",
			"3/4 cup sugar",
			"1 tbsp vanilla extract",
			"Pinch of salt",
		],
		nutrition: {
			calories: 210,
			protein: "3g",
			carbs: "22g",
			fat: "13g",
			fiber: "0g",
			sodium: "40mg",
		},
		instructions: [
			"Whisk together cream, milk, sugar, vanilla, and salt until sugar dissolves.",
			"Pour mixture into ice cream maker and churn according to manufacturer's instructions.",
			"Transfer to a container and freeze until firm.",
			"Serve and enjoy!",
		],
	},
	{
		id: 8,
		title: "Classic Beef Stew",
		image: "https://images.unsplash.com/photo-1574484284002-952d92456975",
		time: "2h 15min",
		servings: 8,
		difficulty: "Medium",
		rating: 4.9,
		category: "Comfort Food",
		type: "non-vegetarian",
		ingredients: [
			"2 lbs beef chuck, cubed",
			"4 carrots, sliced",
			"4 potatoes, cubed",
			"1 onion, diced",
			"3 cloves garlic, minced",
			"4 cups beef broth",
			"2 tbsp tomato paste",
			"2 bay leaves",
			"Salt and pepper to taste",
		],
		nutrition: {
			calories: 385,
			protein: "32g",
			carbs: "25g",
			fat: "18g",
			fiber: "4g",
			sodium: "520mg",
		},
		instructions: [
			"Brown beef in a large pot.",
			"Add onions and garlic, cook until softened.",
			"Add tomato paste and cook for 1 minute.",
			"Add broth, bay leaves, and seasonings.",
			"Bring to a boil, then simmer for 1.5 hours.",
			"Add carrots and potatoes.",
			"Continue cooking for 30 minutes.",
			"Remove bay leaves before serving.",
		],
	},
	{
		id: 9,
		title: "Orange Juice",
		image: "https://img.freepik.com/free-photo/glass-orange-juice-placed-wood_1150-9661.jpg?ga=GA1.1.1865627950.1748931519&semt=ais_hybrid&w=740",
		time: "10 min",
		servings: 2,
		difficulty: "Easy",
		rating: 4.7,
		category: "Drink",
		type: "drink",
		ingredients: [
			"4 large oranges",
			"1 tbsp lemon juice (optional)",
			"1 tsp sugar (optional)",
			"Ice cubes",
		],
		nutrition: {
			calories: 110,
			protein: "2g",
			carbs: "26g",
			fat: "0g",
			fiber: "2g",
			sodium: "0mg",
		},
		instructions: [
			"Cut the oranges in half and juice them using a citrus juicer.",
			"Strain the juice to remove pulp if desired.",
			"Add lemon juice and sugar if using, stir well.",
			"Serve over ice cubes and enjoy fresh!",
		],
	},
];

const RecipeGrid = () => {
	const getTypeIcon = (type: string) => {
		switch (type) {
			case "vegetarian":
				return <Leaf className="w-4 h-4 text-green-600" />;
			case "seafood":
				return <Drumstick className="w-4 h-4 text-blue-600" />;
			default:
				return <Drumstick className="w-4 h-4 text-red-600" />;
		}
	};

	return (
		<section className="py-12 lg:py-16">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center mb-8">
					<div>
						<h2 className="text-3xl lg:text-4xl font-serif font-bold text-sage-800 mb-2">
							Some Recipes
						</h2>
						<p className="text-sage-600">Discover recipes...</p>
					</div>
					<Link to="/recipes">
						<Button
							variant="outline"
							className="hidden md:block border-terracotta-300 text-terracotta-600 hover:bg-terracotta-50"
						>
							View All Recipes
						</Button>
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{recipes.map((recipe) => (
						<Card
							key={recipe.id}
							className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-sage-100 hover:border-terracotta-200"
						>
							<div className="relative overflow-hidden">
								<img
									src={recipe.image}
									alt={recipe.title}
									className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<div className="absolute top-3 left-3 flex items-center space-x-2">
									<span className="px-2 py-1 text-xs font-medium bg-white/90 text-sage-700 rounded-full">
										{recipe.category}
									</span>
									<div className="p-1 bg-white/90 rounded-full">
										{getTypeIcon(recipe.type)}
									</div>
								</div>
							</div>

							<CardContent className="p-4">
								<h3 className="font-semibold text-sage-800 mb-2 line-clamp-1">
									{recipe.title}
								</h3>

								<div className="flex items-center space-x-4 text-sm text-sage-500 mb-3">
									<div className="flex items-center space-x-1">
										<Clock className="w-4 h-4" />
										<span>{recipe.time}</span>
									</div>
									<div className="flex items-center space-x-1">
										<Users className="w-4 h-4" />
										<span>{recipe.servings}</span>
									</div>
									<span className="text-terracotta-500 font-medium">
										{recipe.difficulty}
									</span>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-1">
										<Star className="w-4 h-4 fill-terracotta-400 text-terracotta-400" />
										<span className="font-medium text-sage-700">
											{recipe.rating}
										</span>
									</div>
									<Link to={`/recipe/${recipe.id}`}>
										<Button
											size="sm"
											className="bg-terracotta-500 hover:bg-terracotta-600 text-white rounded-full px-4"
										>
											View Recipe
										</Button>
									</Link>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="text-center mt-8">
					<Link to="/recipes">
						<Button
							variant="outline"
							className="md:hidden border-terracotta-300 text-terracotta-600 hover:bg-terracotta-50"
						>
							View All Recipes
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default RecipeGrid;
