import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const ExploreAccounts = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      const res = await fetch("/api/all-users");
      if (res.ok) {
        const data = await res.json();
        const username = localStorage.getItem("username");
        setAccounts(data.filter((user: any) => user.username !== username));
      }
      setLoading(false);
    };
    fetchAccounts();
  }, []);

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
            <h1 className="text-3xl font-bold text-sage-800 mb-8 text-center">Explore Accounts</h1>
            {loading ? (
              <div className="text-sage-500 text-center">Loading...</div>
            ) : accounts.length === 0 ? (
              <div className="text-sage-500 text-center">No accounts found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {accounts.map((user) => (
                  <Card
                    key={user._id}
                    className="cursor-pointer hover:shadow-lg transition-shadow p-6 flex flex-col items-center"
                    onClick={() => navigate(`/explore-account/${user.username}`)}
                  >
                    <div className="w-16 h-16 rounded-full bg-sage-200 flex items-center justify-center mb-3 text-2xl font-bold text-sage-700">
                      {user.username ? user.username[0].toUpperCase() : "U"}
                    </div>
                    <div className="font-semibold text-sage-800">{user.username}</div>
                    <div className="text-xs text-sage-500 mb-2">{user.role || "Home Chef"}</div>
                    <div className="text-sage-600 text-sm line-clamp-2 text-center">{user.bio || "No bio provided."}</div>
                  </Card>
                ))}
              </div>
            )}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default ExploreAccounts;
