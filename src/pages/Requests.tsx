import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import ConnectionRequestCard from "@/components/ConnectionRequestCard";
import avatarDefaultGrey from "@/assets/avatar-default-grey.png";
import { toast } from "sonner";

const Requests = () => {
  const navigate = useNavigate();

  // Mock pending requests data
  const requests = [
    {
      id: "1",
      name: "James Anderson",
      age: 38,
      city: "Toronto",
      province: "ON",
      childAgeRange: "Preschool (4-5 years)",
      bio: "New to Toronto and looking to connect with local dads.",
      interests: ["Fitness", "Photography", "Coffee"],
      avatarUrl: avatarDefaultGrey,
    },
    {
      id: "2",
      name: "Robert Lee",
      age: 41,
      city: "Ottawa",
      province: "ON",
      childAgeRange: "Elementary (6-12 years)",
      bio: "Hockey dad who loves the outdoors and weekend camping trips.",
      interests: ["Sports", "Outdoors", "Music"],
      avatarUrl: avatarDefaultGrey,
    },
    {
      id: "3",
      name: "Chris Martinez",
      age: 36,
      city: "Toronto",
      province: "ON",
      childAgeRange: "Teen (13-17 years)",
      bio: "Entrepreneur and dad of two teens. Always learning something new.",
      interests: ["Business", "Reading", "Tech"],
      avatarUrl: avatarDefaultGrey,
    },
  ];

  const handleAccept = (name: string) => {
    toast.success(`Accepted connection request from ${name}`);
  };

  const handleIgnore = (name: string) => {
    toast.success(`Ignored connection request from ${name}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <img src={logo} alt="Next Level Dads" className="h-8" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profile")}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-heading font-semibold text-foreground">
              Connection Requests
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-4 animate-fade-in">
        {requests.length > 0 ? (
          requests.map((request) => (
            <ConnectionRequestCard
              key={request.id}
              {...request}
              onAccept={() => handleAccept(request.name)}
              onIgnore={() => handleIgnore(request.name)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No pending requests</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Requests;
