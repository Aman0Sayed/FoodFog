import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import api from "@/api/client";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post(`/api/login`, { username, password });
      const data = res.data;
      if (res.status >= 200 && res.status < 300) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username); // Store username for meal API
        // Fetch and cache profile after login so Account page can show immediately
        try {
          const profileRes = await api.get(`/api/profile`, { headers: { "x-username": username } });
          if (profileRes && profileRes.data) {
            localStorage.setItem('profile', JSON.stringify(profileRes.data));
          }
        } catch (e) {
          // ignore profile load error
        }
        // Fetch and cache favorites after login
        try {
          const favRes = await api.get(`/api/favorites`, { headers: { "x-username": username } });
          if (Array.isArray(favRes.data)) {
            localStorage.setItem("favorites", JSON.stringify(favRes.data));
          }
        } catch (e) {
          // ignore favorites load error
        }
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sage-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-500"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button type="submit" className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white">Login</Button>
            <div className="text-center text-sage-600 text-sm mt-2">
              Don't have an account? <a href="/register" className="text-terracotta-600 underline">Create one</a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
