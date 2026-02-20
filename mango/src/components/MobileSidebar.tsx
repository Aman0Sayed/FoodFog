import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Calendar, BookOpen, Heart, Settings, Calculator } from "lucide-react";

const navigation = [
	{ name: 'Home', icon: Home, path: '/' },
	{ name: 'Meal Planning', icon: Calendar, path: '/meal-planning' },
	{ name: 'Recipe Collection', icon: BookOpen, path: '/recipes' },
	{ name: 'Favorites', icon: Heart, path: '/favorites' },
	{ name: 'Nutrition Calculator', icon: Calculator, path: '/nutrition-calc' },
	{ name: 'Settings', icon: Settings, path: '/settings' },
];

const MobileSidebar = () => {
	const [open, setOpen] = useState(false);
	const location = useLocation();

	// Get user info from localStorage
	const username = localStorage.getItem("username") || "";
	const role = localStorage.getItem("role") || "Home Chef";
	const initials = username ? username.slice(0, 2).toUpperCase() : "U";

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="lg:hidden">
					<Menu className="h-5 w-5" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-64 p-0">
				<div className="flex flex-col h-full bg-cream-50">
					<div className="flex items-center justify-between p-4 border-b border-sage-200">
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-gradient-to-br from-sage-600 to-sage-800 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-sm">FF</span>
							</div>
							<h1 className="text-lg font-serif font-semibold text-sage-800">FoodFog</h1>
						</div>
					</div>

					<div className="flex items-center px-4 py-6 border-b border-sage-200">
						<div className="w-12 h-12 bg-gradient-to-br from-sage-600 to-sage-800 rounded-full flex items-center justify-center">
							<span className="text-white font-semibold text-lg">{initials}</span>
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-sage-800">{username || "John Doe"}</p>
							<p className="text-xs text-sage-500">{role}</p>
						</div>
					</div>

					<nav className="flex-1 px-2 py-4 space-y-1">
						{navigation.map((item) => {
							const isActive = location.pathname === item.path;
							return (
								<Link
									key={item.name}
									to={item.path}
									onClick={() => setOpen(false)}
									className={cn(
										isActive
											? 'bg-sage-100 text-sage-800 border-r-2 border-sage-600'
											: 'text-sage-600 hover:bg-sage-50 hover:text-sage-800',
										'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors'
									)}
								>
									<item.icon
										className={cn(
											isActive ? 'text-sage-700' : 'text-sage-400 group-hover:text-sage-600',
											'mr-3 flex-shrink-0 h-5 w-5'
										)}
									/>
									{item.name}
								</Link>
							);
						})}
					</nav>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MobileSidebar;
