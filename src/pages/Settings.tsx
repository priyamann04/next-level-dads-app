import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Account fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [fatherhoodStage, setFatherhoodStage] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");

  // Notification settings
  const [notifMatches, setNotifMatches] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifEvents, setNotifEvents] = useState(true);
  const [notifMentions, setNotifMentions] = useState(true);

  const stages = [
    "Expecting",
    "Infant (0–1 year)",
    "Toddler Years (2–4 years)",
    "School Age (5–8 years)",
    "Pre-Teen (9–12 years)",
    "Teenager (13–17 years)",
  ];

  const interestOptions = [
    "Cooking",
    "Fitness",
    "Outdoors",
    "Tech",
    "Gaming",
    "Sports",
    "Music",
    "Photography",
    "Art",
    "DIY",
    "Travel",
  ];

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      if (profile) {
        setName(profile.name || "");
        setEmail(profile.email || "");
        setCity(profile.city || "");
        setProvince(profile.province || "");
        setFatherhoodStage(profile.fatherhood_stage || "");
        setInterests(profile.interests || []);
        setPhone(profile.phone || "");
        setBirthday(profile.birthday || "");
        setNotifMatches(profile.notifications_matches ?? true);
        setNotifMessages(profile.notifications_messages ?? true);
        setNotifEvents(profile.notifications_events ?? true);
        setNotifMentions(profile.notifications_mentions ?? true);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAccount = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .update({
          name,
          city,
          province,
          fatherhood_stage: fatherhoodStage,
          interests,
          phone,
          birthday,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Account settings saved",
      });
    } catch (error) {
      console.error("Error saving account:", error);
      toast({
        title: "Error",
        description: "Failed to save account settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .update({
          notifications_matches: notifMatches,
          notifications_messages: notifMessages,
          notifications_events: notifEvents,
          notifications_mentions: notifMentions,
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Notification settings saved",
      });
    } catch (error) {
      console.error("Error saving notifications:", error);
      toast({
        title: "Error",
        description: "Failed to save notification settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-safe">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-6 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-heading font-semibold text-foreground">
            Settings
          </h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <div className="bg-card rounded-lg p-6 space-y-4 shadow-md">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="opacity-60 cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">Province</Label>
                  <Input
                    id="province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    placeholder="Province"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Fatherhood Stage</Label>
                <div className="flex flex-wrap gap-2">
                  {stages.map((stage) => (
                    <Badge
                      key={stage}
                      variant={fatherhoodStage === stage ? "default" : "outline"}
                      className="cursor-pointer rounded-full"
                      onClick={() => setFatherhoodStage(stage)}
                    >
                      {stage}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <Badge
                      key={interest}
                      variant={interests.includes(interest) ? "default" : "outline"}
                      className="cursor-pointer rounded-full"
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Private)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                />
                <p className="text-xs text-muted-foreground">Only visible to you</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthday">Birthday (Private)</Label>
                <Input
                  id="birthday"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Only visible to you</p>
              </div>
            </div>

            <Button
              className="w-full rounded-full bg-gradient-gold"
              onClick={handleSaveAccount}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Account Settings"}
            </Button>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="bg-card rounded-lg p-6 space-y-6 shadow-md">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notif-matches" className="text-base">
                    Matches
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you have a new connection
                  </p>
                </div>
                <Switch
                  id="notif-matches"
                  checked={notifMatches}
                  onCheckedChange={setNotifMatches}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notif-messages" className="text-base">
                    Messages
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about new messages
                  </p>
                </div>
                <Switch
                  id="notif-messages"
                  checked={notifMessages}
                  onCheckedChange={setNotifMessages}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notif-events" className="text-base">
                    Event Reminders
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders about upcoming events
                  </p>
                </div>
                <Switch
                  id="notif-events"
                  checked={notifEvents}
                  onCheckedChange={setNotifEvents}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notif-mentions" className="text-base">
                    Community Mentions
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone mentions you
                  </p>
                </div>
                <Switch
                  id="notif-mentions"
                  checked={notifMentions}
                  onCheckedChange={setNotifMentions}
                />
              </div>
            </div>

            <Button
              className="w-full rounded-full bg-gradient-gold"
              onClick={handleSaveNotifications}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Notification Settings"}
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
