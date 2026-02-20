import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Clock, Users, Star, Leaf, Fish, Drumstick, GlassWater } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const allRecipes = [
	{
		id: 1,
		title: "Mediterranean Quinoa Bowl",
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
		time: "30 min",
		servings: 4,
		rating: 4.8,
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
		rating: 4.9,
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
		rating: 4.7,
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
		rating: 4.9,
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
		rating: 4.6,
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
		rating: 4.5,
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
		rating: 4.8,
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
		rating: 4.9,
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
		description: "Freshly squeezed orange juice, full of vitamin C",
		time: "10 min",
		servings: 2,
		rating: 4.7,
		image: "https://img.freepik.com/free-photo/glass-orange-juice-placed-wood_1150-9661.jpg?ga=GA1.1.1865627950.1748931519&semt=ais_hybrid&w=740",
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
	{
		id: 10,
		title: "Grandma's Chocolate Chip Cookies",
		image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
		time: "45 min",
		servings: 24,
		rating: 5.0,
		type: "vegetarian",
		ingredients: [
			"2 1/4 cups all-purpose flour",
			"1 tsp baking soda",
			"1 tsp salt",
			"1 cup unsalted butter, softened",
			"3/4 cup granulated sugar",
			"3/4 cup brown sugar",
			"1 tsp vanilla extract",
			"2 large eggs",
			"2 cups semisweet chocolate chips",
			"1 cup chopped walnuts (optional)",
		],
		nutrition: {
			calories: 160,
			protein: "2g",
			carbs: "22g",
			fat: "8g",
			fiber: "1g",
			sodium: "85mg",
		},
		instructions: [
			"Preheat oven to 375°F (190°C).",
			"Combine flour, baking soda, and salt in a small bowl.",
			"Beat butter, granulated sugar, brown sugar, and vanilla in a large mixer bowl until creamy.",
			"Add eggs one at a time, beating well after each addition.",
			"Gradually beat in flour mixture.",
			"Stir in chocolate chips and nuts.",
			"Drop by rounded tablespoon onto ungreased baking sheets.",
			"Bake for 9-11 minutes or until golden brown.",
			"Cool on baking sheets for 2 minutes; remove to wire racks to cool completely.",
		],
	},
	{
		id: 11,
		title: "Creamy Mushroom Risotto",
		image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371",
		time: "40 min",
		servings: 4,
		rating: 4.9,
		type: "vegetarian",
		ingredients: [
			"1 1/2 cups Arborio rice",
			"1 lb mushrooms, sliced",
			"1 small onion, diced",
			"2 cloves garlic, minced",
			"4 cups vegetable broth, kept warm",
			"1/2 cup dry white wine",
			"1/2 cup grated Parmesan cheese",
			"2 tbsp olive oil",
			"2 tbsp butter",
			"Salt and pepper to taste",
			"Fresh parsley for garnish",
		],
		nutrition: {
			calories: 390,
			protein: "10g",
			carbs: "60g",
			fat: "12g",
			fiber: "3g",
			sodium: "600mg",
		},
		instructions: [
			"Heat olive oil and 1 tbsp butter in a large skillet over medium heat.",
			"Add onion and garlic, cook until softened.",
			"Add mushrooms and cook until browned.",
			"Stir in rice and cook for 1-2 minutes.",
			"Add wine and cook until mostly absorbed.",
			"Add broth 1/2 cup at a time, stirring constantly and letting each addition absorb before adding more.",
			"Continue until rice is creamy and al dente (about 18-20 minutes).",
			"Stir in remaining butter and Parmesan cheese.",
			"Season with salt and pepper, garnish with parsley, and serve warm.",
		],
	},
	{
		id: 12,
		title: "Korean BBQ Tacos",
		image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828",
		time: "30 min",
		servings: 6,
		rating: 4.8,
		type: "non-vegetarian",
		ingredients: [
			"1 lb beef sirloin, thinly sliced",
			"1/4 cup soy sauce",
			"2 tbsp brown sugar",
			"2 tbsp sesame oil",
			"2 cloves garlic, minced",
			"1 tbsp ginger, grated",
			"1 tbsp rice vinegar",
			"1 tbsp gochujang (Korean chili paste)",
			"1 tsp black pepper",
			"12 small corn tortillas",
			"2 cups shredded cabbage",
			"1 carrot, julienned",
			"2 green onions, sliced",
			"1 tbsp sesame seeds",
			"Cilantro for garnish",
		],
		nutrition: {
			calories: 320,
			protein: "18g",
			carbs: "34g",
			fat: "12g",
			fiber: "3g",
			sodium: "700mg",
		},
		instructions: [
			"In a bowl, whisk together soy sauce, brown sugar, sesame oil, garlic, ginger, rice vinegar, gochujang, and black pepper.",
			"Marinate beef in the sauce for at least 15 minutes.",
			"Heat a skillet over high heat and cook beef until browned and cooked through.",
			"Warm tortillas in a dry skillet.",
			"Assemble tacos with beef, cabbage, carrot, green onions, and cilantro.",
			"Sprinkle with sesame seeds and serve.",
		],
	},
];

const RecipeDetail = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { id } = useParams();
	const recipe = allRecipes.find((r) => r.id === parseInt(id || "1"));

	if (!recipe) {
		return <div>Recipe not found</div>;
	}

	const getTypeIcon = (type: string) => {
		switch (type) {
			case "vegetarian":
				return <Leaf className="h-6 w-6 text-green-600" />;
			case "seafood":
				return <Fish className="h-6 w-6 text-blue-600" />;
			case "drink":
				return <GlassWater className="h-6 w-6 text-orange-400" />;
			default:
				return <Drumstick className="h-6 w-6 text-red-600" />;
		}
	};

	const getTypeLabel = (type: string) => {
		switch (type) {
			case "vegetarian":
				return "Vegetarian";
			case "seafood":
				return "Seafood";
			case "drink":
				return "Drink";
			default:
				return "Non-Vegetarian";
		}
	};

	return (
		<div className="min-h-screen bg-white font-sans">
			<Header />
			<div className="flex">
				<Sidebar />
				<main className="flex-1 lg:ml-64">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
						{/* Recipe Image */}
						<div className="mb-8">
							<img
								src={recipe.image}
								alt={recipe.title}
								className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
							/>
						</div>

						{/* Recipe Title and Basic Info */}
						<div className="mb-8">
							<h1 className="text-3xl md:text-4xl font-serif font-bold text-sage-800 mb-4">
								{recipe.title}
							</h1>
							<div className="flex items-center space-x-6 text-sage-600">
								<div className="flex items-center">
									<Clock className="h-5 w-5 mr-2" />
									<span>{recipe.time}</span>
								</div>
								<div className="flex items-center">
									<Users className="h-5 w-5 mr-2" />
									<span>{recipe.servings} servings</span>
								</div>
								<div className="flex items-center">
									<Star className="h-5 w-5 mr-2 fill-yellow-400 text-yellow-400" />
									<span>{recipe.rating}</span>
								</div>
							</div>
						</div>

						{/* Ingredients and Nutrition */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
							{/* Ingredients */}
							<Card>
								<CardHeader>
									<CardTitle className="text-xl text-sage-800">
										Ingredients
									</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2">
										{recipe.ingredients.map((ingredient, index) => (
											<li
												key={index}
												className="flex items-center text-sage-700"
											>
												<span className="w-2 h-2 bg-terracotta-400 rounded-full mr-3"></span>
												{ingredient}
											</li>
										))}
									</ul>
								</CardContent>
							</Card>

							{/* Nutrition */}
							<Card>
								<CardHeader>
									<CardTitle className="text-xl text-sage-800">
										Nutrition Facts
									</CardTitle>
									<p className="text-sm text-sage-600">Per serving</p>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 gap-4">
										<div className="text-center p-3 bg-sage-50 rounded-lg">
											<div className="text-2xl font-bold text-sage-800">
												{recipe.nutrition.calories}
											</div>
											<div className="text-sm text-sage-600">
												Calories
											</div>
										</div>
										<div className="text-center p-3 bg-sage-50 rounded-lg">
											<div className="text-xl font-bold text-sage-800">
												{recipe.nutrition.protein}
											</div>
											<div className="text-sm text-sage-600">Protein</div>
										</div>
										<div className="text-center p-3 bg-sage-50 rounded-lg">
											<div className="text-xl font-bold text-sage-800">
												{recipe.nutrition.carbs}
											</div>
											<div className="text-sm text-sage-600">Carbs</div>
										</div>
										<div className="text-center p-3 bg-sage-50 rounded-lg">
											<div className="text-xl font-bold text-sage-800">
												{recipe.nutrition.fat}
											</div>
											<div className="text-sm text-sage-600">Fat</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Food Type and Instructions */}
						<Card className="mb-8">
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="text-xl text-sage-800">
										Cooking Instructions
									</CardTitle>
									<div className="flex items-center space-x-2">
										{getTypeIcon(recipe.type)}
										<Badge
											variant="outline"
											className="text-sage-700"
										>
											{getTypeLabel(recipe.type)}
										</Badge>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<ol className="space-y-4">
									{recipe.instructions.map((instruction, index) => (
										<li key={index} className="flex">
											<span className="flex-shrink-0 w-8 h-8 bg-terracotta-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
												{index + 1}
											</span>
											<span className="text-sage-700 pt-1">
												{instruction}
											</span>
										</li>
									))}
								</ol>
							</CardContent>
						</Card>
					</div>
					<Footer />
				</main>
			</div>
		</div>
	);
};

export default RecipeDetail;
