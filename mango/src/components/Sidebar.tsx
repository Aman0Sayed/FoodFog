import { Home, Calendar, BookOpen, Heart, Settings, Calculator } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import api from "@/api/client";

const navigation = [
	{ name: "Home", icon: Home, path: "/" },
	{ name: "Meal Planning", icon: Calendar, path: "/meal-planning" },
	{ name: "Recipe Collection", icon: BookOpen, path: "/recipes" },
	{ name: "Your Recipes", icon: BookOpen, path: "/your-recipes" },
	{ name: "Favorites", icon: Heart, path: "/favorites" },
	{ name: "Grocery", icon: Calculator, path: "/grocery" }, // Changed icon to Calculator for cart, you can swap for a cart icon if available
	{ name: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar = () => {
	const location = useLocation();

	// Use state to track username and role
	const [username, setUsername] = useState(() => localStorage.getItem("username") || "");
	const [role, setRole] = useState(() => {
		// Only get role for the current username
		const storedUsername = localStorage.getItem("username");
		const storedRole = localStorage.getItem("role");
		// If no username, fallback to Home Chef
		if (!storedUsername) return "Home Chef";
		// If role is not set, fallback to Home Chef
		return storedRole || "Home Chef";
	});
	const initials = username ? username.slice(0, 2).toUpperCase() : "U";

	// Sync with localStorage on mount and when storage changes
	useEffect(() => {
		const syncUser = () => {
			const currentUsername = localStorage.getItem("username") || "";
			setUsername(currentUsername);
			// Always update role based on current username
			if (currentUsername) {
				// Try to fetch the latest profile from backend for this username
				api.get("/api/profile", { headers: { "x-username": currentUsername } })
					.then(res => {
						const data = res.data;
						if (data && data.role) {
							setRole(data.role);
							localStorage.setItem("role", data.role);
						} else {
							setRole(localStorage.getItem("role") || "");
						}
					})
					.catch(() => {
						setRole(localStorage.getItem("role") || "");
					});
			} else {
				setRole("");
			}
		};
		window.addEventListener("storage", syncUser);
		window.addEventListener("profile-updated", syncUser);
		// Also sync on mount
		syncUser();
		return () => {
			window.removeEventListener("storage", syncUser);
			window.removeEventListener("profile-updated", syncUser);
		};
	}, []);

	return (
		<div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16">
			<div className="flex flex-col flex-grow bg-cream-50 border-r border-sage-200 pt-5 pb-4 overflow-y-auto">
				<div className="flex items-center flex-shrink-0 px-4 mb-6">
					<div className="w-12 h-12 bg-gradient-to-br from-sage-600 to-sage-800 rounded-full flex items-center justify-center">
						<span className="text-white font-semibold text-lg">{initials}</span>
					</div>
					<div className="ml-3">
						<p className="text-sm font-medium text-sage-800">{username || "John Doe"}</p>
						<p className="text-xs text-sage-500">{role}</p>
					</div>
				</div>
				<nav className="mt-5 flex-1 px-2 space-y-1">
					{navigation.map((item) => {
						const isActive = location.pathname === item.path;
						return (
							<Link
								key={item.name}
								to={item.path}
								onClick={() => window.scrollTo(0, 0)}
								className={cn(
									isActive
										? "bg-sage-100 text-sage-800 border-r-2 border-sage-600"
										: "text-sage-600 hover:bg-sage-50 hover:text-sage-800",
									"group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors"
								)}
							>
								<item.icon
									className={cn(
										isActive
											? "text-sage-700"
											: "text-sage-400 group-hover:text-sage-600",
										"mr-3 flex-shrink-0 h-5 w-5"
									)}
								/>
								{item.name}
							</Link>
						);
					})}
				</nav>
			</div>
		</div>
	);
};

export default Sidebar;
