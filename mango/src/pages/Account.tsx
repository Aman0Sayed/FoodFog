import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import api from "@/api/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [profile, setProfile] = useState<any>(null);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [createdCount, setCreatedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const username = localStorage.getItem("username");
      if (!username) return;
      try {
        const res = await api.get("/api/profile", { headers: { "x-username": username } });
        setProfile(res.data);
      } catch {}
    };
    const fetchCreatedCount = async () => {
      const username = localStorage.getItem("username");
      if (!username) return;
      try {
        const res = await api.get("/api/your-recipes", { headers: { "x-username": username } });
        const recipes = res.data;
        setCreatedCount(Array.isArray(recipes) ? recipes.length : 0);
      } catch {}
    };
    const fetchFavoritesCount = async () => {
      const username = localStorage.getItem("username");
      if (!username) return;
      try {
        const res = await api.get("/api/favorites", { headers: { "x-username": username } });
        const favorites = res.data;
        setFavoritesCount(Array.isArray(favorites) ? favorites.length : 0);
      } catch {}
    };
    fetchProfile();
    fetchCreatedCount();
    fetchFavoritesCount();
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center relative">
            <div className="absolute -top-14 left-1/2 -translate-x-1/2">
              <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg bg-sage-200 flex items-center justify-center overflow-hidden">
                {/* Profile image placeholder, could use profile.image if available */}
                <span className="text-5xl text-sage-700 font-bold">
                  {profile?.username ? profile.username[0]?.toUpperCase() : "U"}
                </span>
              </div>
            </div>
            <div className="mt-20 text-center">
              <h2 className="text-2xl font-bold text-sage-800">{profile?.username || "Username"}</h2>
              <div className="text-sage-500 mb-2">{profile?.role || "Home Chef"}</div>
              <div className="text-sage-500 mb-2">{profile?.country || ""}</div>
              <div className="text-sage-700 mb-4">
                {profile?.bio || "Web Producer - Web Specialist\nColumbia University - New York"}
              </div>
              <div className="flex justify-center gap-8 mb-6">
                <div>
                  <div className="text-xl font-bold text-sage-800">{createdCount}</div>
                  <div className="text-xs text-sage-500">Recipes Created</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-sage-800">{favoritesCount}</div>
                  <div className="text-xs text-sage-500">Favourites</div>
                </div>
              </div>
              <Button className="bg-terracotta-500 hover:bg-terracotta-600 rounded-full px-6 py-2" onClick={() => navigate("/explore-accounts")}>Explore</Button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
