import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    province: "",
    fatherhoodStage: "",
    interests: [] as string[],
    birthday: "",
    phone: "",
    email: "",
    notificationsPush: true,
    notificationsEmail: true,
  });

  useEffect(() => {
    // Get current user and check if they've completed onboarding
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUserId(session.user.id);
      
      // Pre-fill email from Google OAuth
      setFormData(prev => ({
        ...prev,
        email: session.user.email || '',
        name: session.user.user_metadata.name || '',
      }));

      // Check if user has already completed onboarding
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', session.user.id)
        .single();

      if (profile?.onboarding_completed) {
        navigate('/discover');
      }
    };

    checkAuth();
  }, [navigate]);

  const [customInterest, setCustomInterest] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const interestOptions = [
    "Sports", "Cooking", "Outdoors", "Fitness", "Gaming", "Music", "Reading", 
    "Travel", "Tech", "DIY", "Photography", "Art", "Cars", "Parenting", 
    "Mental Wellness", "Movies", "Coffee", "Home Projects", "Volunteering", 
    "Board Games", "Faith", "Entrepreneurship", "Pets", "Gardening", 
    "Podcasts", "Finance", "Writing"
  ];

  const stageOptions = [
    "New Dad (0–1 years)",
    "Toddler Years (2–4 years)",
    "School Age (5–8 years)",
    "Pre-Teen (9–12 years)",
    "Teenager (13–17 years)",
    "Adult Children (18+)"
  ];

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const selectStage = (stage: string) => {
    setFormData(prev => ({
      ...prev,
      fatherhoodStage: stage
    }));
  };

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !formData.interests.includes(customInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, customInterest.trim()]
      }));
      setCustomInterest("");
      setShowCustomInput(false);
    }
  };

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Save profile to database
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast.error('User not authenticated');
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.city || !formData.province || 
        !formData.fatherhoodStage || !formData.phone || 
        formData.interests.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          city: formData.city,
          province: formData.province,
          fatherhood_stage: formData.fatherhoodStage,
          interests: formData.interests,
          birthday: formData.birthday || null,
          phone: formData.phone,
          email: formData.email,
          notifications_push: formData.notificationsPush,
          notifications_email: formData.notificationsEmail,
          onboarding_completed: true,
        })
        .eq('id', userId);

      if (error) throw error;

      toast.success('Profile completed!');
      navigate('/discover');
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast.error(error.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={handleBack} className="text-muted-foreground">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <span className="text-sm font-medium text-muted-foreground">
              Step {step} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-6 animate-fade-in">
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                Tell us about yourself
              </h2>
              <p className="text-muted-foreground">
                Let's start with the basics
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your first name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="rounded-lg bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  From your Google account
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="e.g., Vancouver"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Input
                  id="province"
                  placeholder="e.g., BC"
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="rounded-lg"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Private - only visible to you
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthday">Birthday (Optional)</Label>
                <Input
                  id="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                  className="rounded-lg"
                />
                <p className="text-xs text-muted-foreground">
                  Private - only visible to you
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                Your fatherhood stage
              </h2>
              <p className="text-muted-foreground">
                Select the stage that best describes you
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {stageOptions.map((stage) => (
                  <Badge
                    key={stage}
                    variant={formData.fatherhoodStage === stage ? "default" : "soft"}
                    className="cursor-pointer rounded-full"
                    onClick={() => selectStage(stage)}
                  >
                    {stage}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                Your interests & preferences
              </h2>
              <p className="text-muted-foreground">
                Select what you enjoy doing
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <Badge
                    key={interest}
                    variant={formData.interests.includes(interest) ? "default" : "soft"}
                    className="cursor-pointer rounded-full"
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
                {formData.interests.filter(i => !interestOptions.includes(i)).map((interest) => (
                  <Badge
                    key={interest}
                    variant="default"
                    className="cursor-pointer rounded-full bg-gradient-gold"
                  >
                    {interest}
                  </Badge>
                ))}
                {!showCustomInput ? (
                  <Badge
                    variant="outline"
                    className="cursor-pointer rounded-full"
                    onClick={() => setShowCustomInput(true)}
                  >
                    + Add your own
                  </Badge>
                ) : (
                  <div className="flex gap-2 w-full">
                    <Input
                      placeholder="Type your interest..."
                      value={customInterest}
                      onChange={(e) => setCustomInterest(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCustomInterest()}
                      className="rounded-lg"
                      autoFocus
                    />
                    <Button
                      size="sm"
                      onClick={handleAddCustomInterest}
                      className="rounded-full"
                    >
                      Add
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <Label>Notification Preferences</Label>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications" className="text-base">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about messages and events
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={formData.notificationsPush}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, notificationsPush: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications" className="text-base">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={formData.notificationsEmail}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, notificationsEmail: checked })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <Button
          size="lg"
          className="w-full rounded-full bg-gradient-gold font-semibold"
          onClick={handleNext}
          disabled={loading}
        >
          {loading ? "Saving..." : step === totalSteps ? "Complete Profile" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileSetup;
