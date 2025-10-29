import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    province: "",
    country: "",
    bio: "",
    stages: [] as string[],
    interests: [] as string[],
  });

  const interestOptions = [
    "Sports", "Cooking", "Outdoors", "Fitness", "Gaming", "Music", "Reading", 
    "Travel", "Tech", "DIY", "Photography", "Art", "Cars", "Parenting", 
    "Mental Wellness", "Movies", "Coffee", "Home Projects", "Volunteering", 
    "Board Games", "Faith", "Entrepreneurship", "Pets", "Gardening", 
    "Podcasts", "Finance", "Writing", "Add your own"
  ];

  const stageOptions = [
    { label: "New Dad (0–1)", value: "New Dad (0–1)" },
    { label: "Toddler (1–4)", value: "Toddler (1–4)" },
    { label: "Early School Age (5–8)", value: "Early School Age (5–8)" },
    { label: "Pre-Teen (9–12)", value: "Pre-Teen (9–12)" },
    { label: "Teenager (13–18)", value: "Teenager (13–18)" },
    { label: "Adult Children (18+)", value: "Adult Children (18+)" }
  ];

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const toggleStage = (stage: string) => {
    setFormData(prev => ({
      ...prev,
      stages: prev.stages.includes(stage)
        ? prev.stages.filter(s => s !== stage)
        : [...prev.stages, stage]
    }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      navigate("/match");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/");
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Your age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Your city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Input
                  id="province"
                  placeholder="Your province"
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country (optional)</Label>
                <Input
                  id="country"
                  placeholder="Your country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                Share your story
              </h2>
              <p className="text-muted-foreground">
                Help others get to know you
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">About You</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us a bit about yourself, your interests, and what you're looking for in a friendship..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="rounded-lg min-h-32"
                />
              </div>

              <div className="space-y-2">
                <Label>Fatherhood Stage (Select all that apply)</Label>
                <div className="flex flex-wrap gap-2">
                  {stageOptions.map((stage) => (
                    <Badge
                      key={stage.value}
                      variant={formData.stages.includes(stage.value) ? "default" : "outline"}
                      className="cursor-pointer rounded-full"
                      onClick={() => toggleStage(stage.value)}
                    >
                      {stage.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                Your interests
              </h2>
              <p className="text-muted-foreground">
                Select what you enjoy doing
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <Badge
                  key={interest}
                  variant={formData.interests.includes(interest) ? "default" : "outline"}
                  className="cursor-pointer rounded-full"
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Button
          size="lg"
          className="w-full rounded-full bg-gradient-gold font-semibold"
          onClick={handleNext}
        >
          {step === totalSteps ? "Complete Profile" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileSetup;
