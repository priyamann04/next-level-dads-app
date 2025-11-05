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
  const totalSteps = 4;
  
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    province: "",
    bio: "",
    stages: [] as string[],
    interests: [] as string[],
  });

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
    { label: "Expecting (pregnant/adopting)", value: "Expecting" },
    { label: "Newborn (0–1 year)", value: "Newborn (0–1 year)" },
    { label: "Toddler (2–3 years)", value: "Toddler (2–3 years)" },
    { label: "Preschool (4–5 years)", value: "Preschool (4–5 years)" },
    { label: "Elementary (6–12 years)", value: "Elementary (6–12 years)" },
    { label: "Teen (13–17 years)", value: "Teen (13–17 years)" },
    { label: "Adult (18+ years)", value: "Adult (18+ years)" }
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

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      navigate("/discover");
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
                  placeholder="Your name"
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
                  placeholder="Love hiking with my kids and exploring new coffee shops."
                  value={formData.bio}
                  onChange={(e) => {
                    if (e.target.value.length <= 120) {
                      setFormData({ ...formData, bio: e.target.value });
                    }
                  }}
                  className="rounded-lg min-h-32"
                  maxLength={120}
                  required
                />
                <div className="text-xs text-muted-foreground text-right">
                  {formData.bio.length}/120
                </div>
              </div>

              <div className="space-y-2">
                <Label>Fatherhood Stage (Select all that apply)</Label>
                <div className="flex flex-wrap gap-2">
                  {stageOptions.map((stage) => (
                    <Badge
                      key={stage.value}
                      variant={formData.stages.includes(stage.value) ? "default" : "soft"}
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
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-semibold text-foreground">
                Add a Photo (Optional)
              </h2>
              <p className="text-muted-foreground">
                Help other dads recognize you
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">No photo</span>
              </div>
              <Button
                variant="outline"
                className="rounded-full"
              >
                Upload Photo
              </Button>
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
