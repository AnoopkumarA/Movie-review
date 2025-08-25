import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { tmdbImageUrl } from "@/integrations/tmdb/client";
import { Footer } from "@/components/Footer";
import { User, Edit, Save, X, Heart, Star, Film, Trash2, Loader2 } from "lucide-react";
import { checkSchema } from "@/utils/checkSchema";

const Profile = () => {
  const { items, remove } = useWatchlist();
  const { user } = useAuth();
  const { profile, loading: profileLoading, saving, updateName, updateInterests } = useProfile();
  const navigate = useNavigate();
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [userName, setUserName] = useState(profile?.name || "Add your name");
  const [userInterests, setUserInterests] = useState<string[]>(profile?.interests || ["Action", "Drama", "Comedy", "Sci-Fi"]);
  const [newInterest, setNewInterest] = useState("");

  // Update local state when profile data changes
  useEffect(() => {
    if (profile) {
      console.log('Profile updated, setting local state:', profile);
      setUserName(profile.name || "Add your name");
      setUserInterests(profile.interests || ["Action", "Drama", "Comedy", "Sci-Fi"]);
    }
  }, [profile]);

  // Check schema on component mount
  useEffect(() => {
    checkSchema();
  }, []);

  const handleSaveName = async () => {
    if (userName.trim() && userName !== "Add your name") {
      await updateName(userName.trim());
      setIsEditingName(false);
    }
  };

  const handleSaveInterests = async () => {
    console.log('Saving interests:', userInterests);
    await updateInterests(userInterests);
    console.log('After saving, profile:', profile);
    setIsEditingInterests(false);
  };

  const addInterest = () => {
    if (newInterest.trim() && !userInterests.includes(newInterest.trim())) {
      setUserInterests([...userInterests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setUserInterests(userInterests.filter(i => i !== interest));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addInterest();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        {/* Profile Header */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-background to-primary/5 border border-primary/10">
          {profileLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Profile Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center border-4 border-primary/30">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full bg-background border-primary/30"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="text-2xl font-bold h-10"
                        placeholder="Enter your name"
                      />
                      <Button 
                        size="sm" 
                        onClick={handleSaveName} 
                        disabled={saving}
                        className="bg-primary hover:bg-primary/90"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setIsEditingName(false)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold">{userName}</h1>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => setIsEditingName(true)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <p className="text-foreground font-medium">{user?.email}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Member Since</Label>
                  <p className="text-foreground font-medium">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Recently'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>

                 {/* Interests Section */}
         <Card className="p-8 mb-8 border border-primary/10">
           <div className="flex items-center justify-between mb-6">
             <h2 className="text-2xl font-bold flex items-center gap-3 text-foreground">
               <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                 <Heart className="w-5 h-5 text-primary" />
               </div>
               Your Interests
             </h2>
             {!isEditingInterests && !profileLoading && (
               <Button 
                 variant="outline" 
                 size="sm" 
                 onClick={() => setIsEditingInterests(true)}
                 className="text-primary hover:text-primary/80 border-primary/30 hover:border-primary/50"
               >
                 <Edit className="w-4 h-4 mr-2" />
                 Edit Interests
               </Button>
             )}
           </div>

          {profileLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <>
                             {isEditingInterests ? (
                 <div className="space-y-6">
                   <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg border border-primary/20">
                     <h3 className="text-lg font-semibold mb-4 text-foreground">Add New Interest</h3>
                     <div className="flex gap-3">
                       <Input
                         value={newInterest}
                         onChange={(e) => setNewInterest(e.target.value)}
                         onKeyPress={handleKeyPress}
                         placeholder="Type your interest here..."
                         className="flex-1 text-base"
                       />
                       <Button onClick={addInterest} size="default" className="bg-primary hover:bg-primary/90 px-6">
                         Add Interest
                       </Button>
                     </div>
                     <div className="text-sm text-muted-foreground mt-3 bg-background/80 p-3 rounded-md border border-primary/20">
                       💡 <strong>Tip:</strong> Click "Add Interest" to add it to your list, then click "Save Changes" to update your profile.
                     </div>
                   </div>
                   
                   <div className="space-y-4">
                     <h3 className="text-lg font-semibold text-foreground">Current Interests</h3>
                     <div className="flex flex-wrap gap-3">
                       {userInterests.map((interest) => (
                         <Badge 
                           key={interest} 
                           variant="secondary" 
                           className="flex items-center gap-2 px-4 py-2 text-base font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                         >
                           <span className="text-sm">{interest}</span>
                           <Button
                             size="sm"
                             variant="ghost"
                             className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive rounded-full"
                             onClick={() => removeInterest(interest)}
                           >
                             <X className="w-4 h-4" />
                           </Button>
                         </Badge>
                       ))}
                     </div>
                   </div>
                                     <div className="flex gap-3 pt-4 border-t border-primary/20">
                     <Button 
                       onClick={handleSaveInterests} 
                       size="default" 
                       disabled={saving}
                       className="bg-primary hover:bg-primary/90 px-6"
                     >
                       {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                       Save Changes
                     </Button>
                     <Button 
                       variant="outline" 
                       size="default" 
                       onClick={() => setIsEditingInterests(false)}
                       disabled={saving}
                       className="px-6"
                     >
                       Cancel
                     </Button>
                   </div>
                 </div>
               ) : (
                 <div className="space-y-4">
                   <div className="text-sm text-muted-foreground mb-4">
                     You have {userInterests.length} interest{userInterests.length !== 1 ? 's' : ''} in your profile
                   </div>
                   <div className="flex flex-wrap gap-3">
                     {userInterests.map((interest) => (
                       <Badge 
                         key={interest} 
                         variant="secondary" 
                         className="px-4 py-2 text-base font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                       >
                         {interest}
                       </Badge>
                     ))}
                   </div>
                 </div>
               )}
            </>
          )}
        </Card>

        {/* Watchlist Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Film className="w-5 h-5 text-primary" />
              Your Watchlist
              <Badge variant="secondary" className="ml-2">
                {items.length} movies
              </Badge>
            </h2>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-lg font-medium text-muted-foreground mb-2">Your watchlist is empty</p>
              <p className="text-sm text-muted-foreground mb-4">
                Start adding movies you want to watch later
              </p>
              <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90">
                <Star className="w-4 h-4 mr-2" />
                Discover Movies
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="aspect-[3/4] bg-muted relative">
                    {item.poster_path && (
                      <img 
                        src={tmdbImageUrl(item.poster_path, 'original') || ''} 
                        alt={item.title} 
                        className="w-full h-full object-cover" 
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="font-semibold line-clamp-2 text-sm">{item.title}</div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => navigate(`/movie/${item.movie_id}`)}
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        Open
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => remove(item.movie_id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Profile;


