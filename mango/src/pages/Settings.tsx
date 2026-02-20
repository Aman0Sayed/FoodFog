import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Settings as SettingsIcon, User, Shield, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { useTheme } from "@/components/ui/theme-provider";

const Settings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const roleOptions = [
    "Food Stylist",
    "Home Chef",
    "Professional Chef",
    "Cook",
    "Saucier",
    "Commis Chef",
    "Prep Cook"
  ];

  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState<{ username: string; bio: string; role: string }>({ username: "", bio: "", role: "Home Chef" });
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("Home Chef");
  const [country, setCountry] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  // Compact Mode and Animations state
  const [compact, setCompact] = useState(() => localStorage.getItem("compact") === "true");
  const [animations, setAnimations] = useState(() => localStorage.getItem("animations") !== "false");

  useEffect(() => {
    const root = document.documentElement;
    if (compact) {
      root.classList.add("compact");
    } else {
      root.classList.remove("compact");
    }
    localStorage.setItem("compact", String(compact));
  }, [compact]);

  useEffect(() => {
    const root = document.documentElement;
    if (animations) {
      root.classList.add("animations");
    } else {
      root.classList.remove("animations");
    }
    localStorage.setItem("animations", String(animations));
  }, [animations]);

  useEffect(() => {
    const fetchProfile = async () => {
      const username = localStorage.getItem("username");
      if (!username) return;
      const res = await fetch("/api/profile", {
        headers: { "x-username": username },
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setBio(data.bio || "");
        setRole(data.role || "Home Chef");
        setCountry(data.country || "");
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    const username = localStorage.getItem("username");
    if (!username) return;
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-username": username },
      body: JSON.stringify({ bio, role, country }),
    });
    setSaving(false);
    if (res.ok) {
      setSuccess("Profile updated!");
      localStorage.setItem("role", role); // Store role for sidebar/mobile
      // Dispatch custom event to notify sidebar and others
      window.dispatchEvent(new Event("profile-updated"));
    }
  };

  useEffect(() => {
    // Debug: log the classList to verify 'dark' is being toggled
    console.log('HTML classList:', document.documentElement.classList.value);
  }, [theme]);

  return (
    <div className="min-h-screen font-sans bg-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-serif font-bold text-sage-800 mb-2 flex items-center">
                <SettingsIcon className="h-8 w-8 mr-3 text-terracotta-600" />
                Settings
              </h1>
              <p className="text-sage-600">Manage your account and preferences</p>
            </div>
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center">
                  <Palette className="h-4 w-4 mr-2" />
                  Appearance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your username, role, and bio</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-terracotta-400 to-sage-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-2xl">{profile.username ? profile.username[0]?.toUpperCase() : "U"}</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" value={profile.username} disabled />
                    </div>
                    <div>
                      <Label htmlFor="role">Who are you</Label>
                      <select
                        id="role"
                        className="block w-full mt-1 border border-sage-200 rounded px-3 py-2 text-sage-800 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-400"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                      >
                        {roleOptions.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        placeholder="Enter your country"
                      />
                    </div>
                    <Button className="bg-terracotta-500 hover:bg-terracotta-600" onClick={handleSave} disabled={saving}>
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                    {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Manage your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Only show Delete Account section */}
                    <AlertDialog>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Delete Account</div>
                          <div className="text-sm text-sage-600">Permanently delete your account and data</div>
                        </div>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">Delete Account</Button>
                        </AlertDialogTrigger>
                      </div>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Account</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction asChild>
                            <Button variant="destructive" onClick={async () => {
                              const username = localStorage.getItem("username");
                              const res = await fetch("/api/delete-account", {
                                method: "POST",
                                headers: { "Content-Type": "application/json", "x-username": username },
                              });
                              if (res.ok) {
                                localStorage.removeItem("isLoggedIn");
                                localStorage.removeItem("username");
                                window.location.href = "/login";
                              } else {
                                alert("Failed to delete account.");
                              }
                            }}>Delete</Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize how the app looks and feels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Compact Mode</div>
                        <div className="text-sm text-sage-600">Show more content in less space</div>
                      </div>
                      <Switch checked={compact} onCheckedChange={setCompact} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Animations</div>
                        <div className="text-sm text-sage-600">Enable smooth transitions and animations</div>
                      </div>
                      <Switch checked={animations} onCheckedChange={setAnimations} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Button
              className="bg-terracotta-500 hover:bg-terracotta-600 mt-8"
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("username");
                window.location.href = "/login";
              }}
            >
              Logout
            </Button>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Settings;
