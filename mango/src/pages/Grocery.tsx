import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { ShoppingCart } from "lucide-react";
import { Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import recipes from "./RecipeCollection";
import { AnimatePresence, motion } from "framer-motion";

const staticRecipes = [
	{
		id: 1,
		title: "Mediterranean Quinoa Bowl",
		description: "Fresh and healthy bowl with quinoa, vegetables, and feta",
		time: "25 min",
		servings: 4,
		rating: 4.8,
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
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
		description: "Aromatic coconut curry with vegetables and herbs",
		time: "35 min",
		servings: 6,
		rating: 4.6,
		image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
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
	},
	{
		id: 7,
		title: "Vanilla Ice Cream",
		description: "Classic homemade vanilla ice cream, creamy and delicious",
		time: "20 min",
		servings: 4,
		rating: 4.8,
		image: "https://img.freepik.com/premium-photo/bowl-with-delicious-vanilla-ice-cream-white-background_392895-571003.jpg?semt=ais_hybrid&w=740",
		ingredients: [
			"2 cups heavy cream",
			"1 cup whole milk",
			"3/4 cup sugar",
			"1 tbsp vanilla extract",
			"Pinch of salt",
		],
	},
	{
		id: 8,
		title: "Classic Beef Stew",
		description: "Hearty and comforting stew perfect for cold days",
		time: "2h 15min",
		servings: 8,
		rating: 4.9,
		image: "https://images.unsplash.com/photo-1574484284002-952d92456975",
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
	},
	{
		id: 9,
		title: "Orange Juice",
		description: "Freshly squeezed orange juice, full of vitamin C",
		time: "10 min",
		servings: 2,
		rating: 4.7,
		image: "https://img.freepik.com/free-photo/glass-orange-juice-placed-wood_1150-9661.jpg?ga=GA1.1.1865627950.1748931519&semt=ais_hybrid&w=740",
		ingredients: [
			"4 large oranges",
			"1 tbsp lemon juice (optional)",
			"1 tsp sugar (optional)",
			"Ice cubes",
		],
	},
	{
		id: 10,
		title: "Grandma's Chocolate Chip Cookies",
		description: "The perfect chewy and crispy cookie recipe",
		time: "45 min",
		servings: 24,
		rating: 5.0,
		image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
		ingredients: [
			"2 1/4 cups all-purpose flour",
			"1 tsp baking soda",
			"1 tsp salt",
			"1 cup (2 sticks) butter, softened",
			"3/4 cup granulated sugar",
			"3/4 cup brown sugar",
			"1 tsp vanilla extract",
			"2 large eggs",
			"2 cups chocolate chips",
		],
	},
	{
		id: 11,
		title: "Creamy Mushroom Risotto",
		description: "Rich and creamy Italian comfort food",
		time: "40 min",
		servings: 4,
		rating: 4.9,
		image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371",
		ingredients: [
			"1 1/2 cups Arborio rice",
			"4 cups vegetable broth",
			"1 cup mushrooms, sliced",
			"1/2 cup grated Parmesan cheese",
			"1/2 cup white wine",
			"1 small onion, diced",
			"2 tbsp butter",
			"2 tbsp olive oil",
			"Salt and pepper to taste",
		],
	},
	{
		id: 12,
		title: "Korean BBQ Tacos",
		description: "Fusion dish combining Korean and Mexican flavors",
		time: "30 min",
		servings: 6,
		rating: 4.8,
		image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828",
		ingredients: [
			"1 lb beef short ribs, thinly sliced",
			"8 small corn tortillas",
			"1 cup kimchi, chopped",
			"1/4 cup gochujang sauce",
			"1/4 cup mayonnaise",
			"1 cucumber, julienned",
			"2 green onions, sliced",
			"Sesame seeds for garnish",
		],
	},
];

const Grocery = () => {
	const [recipes, setRecipes] = useState<any[]>(staticRecipes);
	const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
	const selectedRecipe = recipes.find((r) => r.id === selectedRecipeId);

	// Optionally, fetch user's own recipes and merge with static ones
	useEffect(() => {
		const fetchUserRecipes = async () => {
			const username = localStorage.getItem("username");
			if (!username) return;
			const res = await fetch("/api/your-recipes", {
				headers: { "x-username": username },
			});
			if (res.ok) {
				const userRecipes = await res.json();
				// Map user recipes to match static recipe structure
				const mapped = userRecipes.map((r: any, idx: number) => ({
					id: 1000 + idx, // avoid id collision
					title: r.title,
					description: r.description,
					time: r.time,
					servings: r.servings,
					rating: r.rating,
					image: r.image || "/placeholder.svg",
					ingredients: r.ingredients || [],
				}));
				setRecipes([...staticRecipes, ...mapped]);
			}
		};
		fetchUserRecipes();
	}, []);

	const handlePrint = (recipe: any) => {
		const printWindow = window.open("", "_blank");
		if (!printWindow) return;
		printWindow.document.write(`
    <html>
      <head>
        <title>Grocery List - ${recipe.title}</title>
        <style>
          body { font-family: sans-serif; padding: 2rem; }
          h1 { color: #374151; }
          ul { margin-top: 1rem; }
          li { margin-bottom: 0.5rem; }
        </style>
      </head>
      <body>
        <h1>Grocery List for ${recipe.title}</h1>
        <ul>
          ${recipe.ingredients.map((item: string) => `<li>${item}</li>`).join("")}
        </ul>
      </body>
    </html>
  `);
		printWindow.document.close();
		printWindow.focus();
		printWindow.print();
	};

	return (
		<div className="min-h-screen font-sans bg-white">
			<Header />
			<div className="flex">
				<Sidebar />
				<main className="flex-1 lg:ml-64">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
						<div className="mb-8 flex items-center gap-3">
							<ShoppingCart className="h-8 w-8 text-terracotta-600" />
							<h1 className="text-3xl font-serif font-bold text-sage-800">
								Grocery List
							</h1>
						</div>
						<p className="text-sage-600 mb-6">
							Choose a recipe to generate your grocery list.
						</p>
						
						<div className="mb-10">
							<h2 className="text-xl font-semibold text-sage-700 mb-4">
								Recipe Collection
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{recipes
									.filter((r) => r.id < 1000)
									.map((recipe) => (
										<div key={recipe.id} className="relative">
											<div
												className={`border rounded-lg p-3 flex items-center gap-4 cursor-pointer transition-shadow hover:shadow-md ${
													selectedRecipeId === recipe.id
														? "border-terracotta-500 bg-terracotta-50"
														: "border-sage-200 bg-white"
												}`}
												onClick={() =>
													setSelectedRecipeId(
														selectedRecipeId === recipe.id ? null : recipe.id
													)
												}
											>
												<img
													src={recipe.image}
													alt={recipe.title}
													className="w-16 h-16 object-cover rounded"
												/>
												<div className="flex-1">
													<div className="font-semibold text-sage-800">
														{recipe.title}
													</div>
													<div className="text-xs text-sage-500">
														{recipe.time} • {recipe.servings} servings
													</div>
												</div>
												<button
													className="ml-2 p-2 rounded hover:bg-sage-100 text-sage-700"
													title="Print grocery list"
													onClick={(e) => {
														e.stopPropagation();
														handlePrint(recipe);
													}}
												>
													<Printer className="w-5 h-5" />
												</button>
											</div>
											<AnimatePresence>
												{selectedRecipeId === recipe.id && (
													<motion.div
														key={recipe.id}
														initial={{ opacity: 0, x: -80 }}
														animate={{ opacity: 1, x: 0 }}
														exit={{ opacity: 0, x: -80 }}
														transition={{ duration: 0.3 }}
														className="fixed top-1/2 left-8 transform -translate-y-1/2 w-80 max-w-[90vw] bg-sage-50 border border-sage-200 rounded-lg p-6 z-50 shadow-2xl overflow-y-auto max-h-[90vh]"
														style={{ right: "auto" }}
													>
														<h2 className="text-lg font-semibold text-sage-800 mb-4">
															Ingredients
														</h2>
														<ul className="list-disc pl-6 text-sage-700">
															{recipe.ingredients.map(
																(item: string, idx: number) => (
																	<li key={idx}>{item}</li>
																)
															)}
														</ul>
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									))}
							</div>
						</div>
						<div className="mb-10">
							<h2 className="text-xl font-semibold text-sage-700 mb-4">
								Your Recipes
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{recipes
									.filter((r) => r.id >= 1000)
									.map((recipe) => (
										<div key={recipe.id} className="relative">
											<div
												className={`border rounded-lg p-3 flex items-center gap-4 cursor-pointer transition-shadow hover:shadow-md ${
													selectedRecipeId === recipe.id
														? "border-terracotta-500 bg-terracotta-50"
														: "border-sage-200 bg-white"
												}`}
												onClick={() =>
													setSelectedRecipeId(
														selectedRecipeId === recipe.id ? null : recipe.id
													)
												}
											>
												<img
													src={recipe.image}
													alt={recipe.title}
													className="w-16 h-16 object-cover rounded"
												/>
												<div className="flex-1">
													<div className="font-semibold text-sage-800">
														{recipe.title}
													</div>
													<div className="text-xs text-sage-500">
														{recipe.time} • {recipe.servings} servings
													</div>
												</div>
												<button
													className="ml-2 p-2 rounded hover:bg-sage-100 text-sage-700"
													title="Print grocery list"
													onClick={(e) => {
														e.stopPropagation();
														handlePrint(recipe);
													}}
												>
													<Printer className="w-5 h-5" />
												</button>
											</div>
											<AnimatePresence>
												{selectedRecipeId === recipe.id && (
													<motion.div
														key={recipe.id}
														initial={{ opacity: 0, x: -80 }}
														animate={{ opacity: 1, x: 0 }}
														exit={{ opacity: 0, x: -80 }}
														transition={{ duration: 0.3 }}
														className="fixed top-1/2 left-8 transform -translate-y-1/2 w-80 max-w-[90vw] bg-sage-50 border border-sage-200 rounded-lg p-6 z-50 shadow-2xl overflow-y-auto max-h-[90vh]"
														style={{ right: "auto" }}
													>
														<h2 className="text-lg font-semibold text-sage-800 mb-4">
															Ingredients
														</h2>
														<ul className="list-disc pl-6 text-sage-700">
															{recipe.ingredients.map(
																(item: string, idx: number) => (
																	<li key={idx}>{item}</li>
																)
															)}
														</ul>
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									))}
								{recipes.filter((r) => r.id >= 1000).length === 0 && (
									<div className="text-sage-500 col-span-2">
										No created recipes yet.
									</div>
								)}
							</div>
						</div>
					</div>
					<Footer />
				</main>
			</div>
		</div>
	);
};

export default Grocery;
