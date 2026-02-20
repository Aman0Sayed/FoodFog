import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import api from "@/api/client";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const ExploreAccountDetail = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndRecipes = async () => {
      setLoading(true);
      const loggedInUsername = localStorage.getItem("username");
      try {
        if (username === loggedInUsername) {
          // Use the logged-in user's own info endpoints
          const [resProfile, resRecipes] = await Promise.all([
            api.get(`/api/profile`, { headers: { "x-username": loggedInUsername! } }),
            api.get(`/api/your-recipes`, { headers: { "x-username": loggedInUsername! } }),
          ]);
          setProfile(resProfile.data);
          setRecipes(Array.isArray(resRecipes.data) ? resRecipes.data : []);
          setLoading(false);
          return;
        }
        // Otherwise, fetch public info
        const [resProfile, resRecipes] = await Promise.all([
          api.get(`/api/public-profile`, { params: { username } }),
          api.get(`/api/recipes-by-user`, { params: { username } }),
        ]);
        setProfile(resProfile.data);
        setRecipes(Array.isArray(resRecipes.data) ? resRecipes.data : []);
      } catch (e) {
        // ignore
      }
      setLoading(false);
    };
    fetchProfileAndRecipes();
  }, [username]);

  return (
    <div className="min-h-screen font-sans bg-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64 flex flex-col items-center min-h-[80vh]">
          <div className="w-full max-w-2xl mx-auto py-12">
            <button
              className="mb-4 px-4 py-2 bg-sage-100 hover:bg-sage-200 text-sage-700 rounded shadow text-sm"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
            {loading ? (
              <div className="text-sage-500 text-center">Loading...</div>
            ) : !profile ? (
              <div className="text-sage-500 text-center">User not found.</div>
            ) : (
              <>
                <div className="flex flex-col items-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-sage-200 flex items-center justify-center text-3xl font-bold text-sage-700 mb-3">
                    {profile.username ? profile.username[0].toUpperCase() : "U"}
                  </div>
                  <div className="font-bold text-2xl text-sage-800">{profile.username}</div>
                  <div className="text-xs text-sage-500 mb-2">{profile.role || "Home Chef"}</div>
                  <div className="text-xs text-sage-500 mb-2">{profile.country || ""}</div>
                  <div className="text-sage-600 text-center mb-2">{profile.bio || "No bio provided."}</div>
                </div>
                <h2 className="text-xl font-semibold text-sage-800 mb-4 text-center">Created Recipes</h2>
                {recipes.length === 0 ? (
                  <div className="text-sage-500 text-center">No recipes found.</div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {recipes.map((recipe) => (
                      <Card key={recipe._id} className="p-4 cursor-pointer hover:shadow-md flex items-center gap-4" onClick={() => window.location.href = `/your-recipe/${recipe._id}` }>
                        <img
                          src={recipe.image || "/placeholder.svg"}
                          alt={recipe.title}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-sage-800">{recipe.title}</div>
                          <div className="text-xs text-sage-500">{recipe.time} • {recipe.servings} servings</div>
                          <div className="text-sage-600 text-sm line-clamp-2">{recipe.description}</div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default ExploreAccountDetail;
