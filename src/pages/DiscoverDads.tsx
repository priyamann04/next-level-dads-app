import { useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import DadCard from "@/components/DadCard";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import avatarDefaultGrey from "@/assets/avatar-default-grey.png";
import logo from "@/assets/logo.png";

const dads = [
  {
    id: 1,
    name: "James Martinez",
    age: 32,
    city: "Vancouver",
    province: "BC",
    stage: "Toddler (2–3 years)",
    bio: "Weekend warrior dad who loves trail running and teaching my little one about nature.",
    interests: ["Fitness", "Cooking", "Outdoors"],
    avatarUrl: avatarDefaultGrey
  },
  {
    id: 2,
    name: "David Chen",
    age: 38,
    city: "Toronto",
    province: "ON",
    stage: "Elementary (6–12 years)",
    bio: "Tech enthusiast and soccer coach. Always looking for ways to keep the kids active and learning.",
    interests: ["Tech", "Sports", "Gaming"],
    avatarUrl: avatarDefaultGrey
  },
  {
    id: 3,
    name: "Marcus Johnson",
    age: 35,
    city: "Calgary",
    province: "AB",
    stage: "Preschool (4–5 years)",
    bio: "Music lover and amateur photographer. My kids keep me busy but I'd love to connect with local dads.",
    interests: ["Music", "Photography", "Art"],
    avatarUrl: avatarDefaultGrey
  },
  {
    id: 4,
    name: "Steve Williams",
    age: 40,
    city: "Montréal",
    province: "QC",
    stage: "Teen (13–17 years)",
    bio: "Outdoor adventure seeker and sports enthusiast. Let's connect and share parenting stories!",
    interests: ["Outdoors", "Sports", "Travel"],
    avatarUrl: avatarDefaultGrey
  }
];

const DiscoverDads = () => {
  const { toast } = useToast();
  
  // Dad filters - pending selections (in filter panel)
  const [pendingChildrenAges, setPendingChildrenAges] = useState<string[]>([]);
  const [pendingInterests, setPendingInterests] = useState<string[]>([]);
  const [pendingLocations, setPendingLocations] = useState<string[]>([]);
  const [pendingDadAges, setPendingDadAges] = useState<string[]>([]);
  
  // Applied filters (actually filtering the list)
  const [appliedChildrenAges, setAppliedChildrenAges] = useState<string[]>([]);
  const [appliedInterests, setAppliedInterests] = useState<string[]>([]);
  const [appliedLocations, setAppliedLocations] = useState<string[]>([]);
  const [appliedDadAges, setAppliedDadAges] = useState<string[]>([]);

  const handleConnect = (name: string) => {
    toast({
      title: "Connection sent! 🎉",
      description: `Your connection request was sent to ${name}.`,
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshed",
      description: "Loading new connections...",
    });
  };

  // Extract unique values for filters
  const stageOptions = [
    "Expecting",
    "Newborn (0–1 year)",
    "Toddler (2–3 years)",
    "Preschool (4–5 years)",
    "Elementary (6–12 years)",
    "Teen (13–17 years)",
    "Adult (18+ years)"
  ];
  
  const interestOptions = [
    "Sports", "Cooking", "Outdoors", "Fitness", "Gaming", "Music", "Reading", 
    "Travel", "Tech", "DIY", "Photography", "Art", "Cars", "Parenting", 
    "Mental Wellness", "Movies", "Coffee", "Home Projects", "Volunteering", 
    "Board Games", "Faith", "Entrepreneurship", "Pets", "Gardening", 
    "Podcasts", "Finance", "Writing"
  ];
  
  const provinces = Array.from(new Set(dads.map(d => d.province)));
  const ageRanges = ["all", "Under 30", "30-35", "36-40", "Over 40"];

  // Toggle functions for pending filters
  const togglePendingChildrenAge = (stage: string) => {
    setPendingChildrenAges(prev =>
      prev.includes(stage) ? prev.filter(s => s !== stage) : [...prev, stage]
    );
  };

  const togglePendingInterest = (interest: string) => {
    setPendingInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const togglePendingLocation = (location: string) => {
    setPendingLocations(prev =>
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  const togglePendingDadAge = (ageRange: string) => {
    setPendingDadAges(prev =>
      prev.includes(ageRange) ? prev.filter(a => a !== ageRange) : [...prev, ageRange]
    );
  };

  // Apply filters
  const applyFilters = () => {
    setAppliedChildrenAges(pendingChildrenAges);
    setAppliedInterests(pendingInterests);
    setAppliedLocations(pendingLocations);
    setAppliedDadAges(pendingDadAges);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setPendingChildrenAges([]);
    setPendingInterests([]);
    setPendingLocations([]);
    setPendingDadAges([]);
    setAppliedChildrenAges([]);
    setAppliedInterests([]);
    setAppliedLocations([]);
    setAppliedDadAges([]);
  };

  // Filter dads based on applied filters
  const filteredDads = dads.filter((dad) => {
    const matchesChildrenAge = appliedChildrenAges.length === 0 || appliedChildrenAges.includes(dad.stage);
    const matchesInterest = appliedInterests.length === 0 || dad.interests.some(i => appliedInterests.includes(i));
    const matchesLocation = appliedLocations.length === 0 || appliedLocations.includes(dad.province);
    
    let matchesAge = true;
    if (appliedDadAges.length > 0) {
      matchesAge = appliedDadAges.some(range => {
        if (range === "Under 30") return dad.age < 30;
        if (range === "30-35") return dad.age >= 30 && dad.age <= 35;
        if (range === "36-40") return dad.age >= 36 && dad.age <= 40;
        if (range === "Over 40") return dad.age > 40;
        return false;
      });
    }
    
    return matchesChildrenAge && matchesInterest && matchesLocation && matchesAge;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-6 flex items-center gap-4">
          <img src={logo} alt="Next Level Dads" className="h-8" />
          <div>
            <h1 className="text-2xl font-heading font-semibold text-foreground">
              Discover
            </h1>
            <p className="text-muted-foreground text-sm">
              Join communities and find community.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6">
        <div className="w-full grid grid-cols-3 bg-card border-b border-border h-12 mb-6">
          <Link 
            to="/discover/dads"
            className="flex items-center justify-center border-b-2 border-primary text-foreground font-medium"
          >
            Dads
          </Link>
          <Link 
            to="/discover/communities"
            className="flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            Communities
          </Link>
          <Link 
            to="/discover/events"
            className="flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            Events
          </Link>
        </div>

        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="rounded-full">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Dads</SheetTitle>
                  <SheetDescription>
                    Refine your search to find the perfect connections
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground">Children's Age</h3>
                    <p className="text-xs text-muted-foreground">Select all that apply</p>
                    <div className="flex gap-2 flex-wrap">
                      {stageOptions.map((stage) => (
                        <Badge
                          key={stage}
                          variant={pendingChildrenAges.includes(stage) ? "default" : "outline"}
                          className="cursor-pointer rounded-full"
                          onClick={() => togglePendingChildrenAge(stage)}
                        >
                          {stage}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground">Interests</h3>
                    <p className="text-xs text-muted-foreground">Select all that apply</p>
                    <div className="flex gap-2 flex-wrap">
                      {interestOptions.map((interest) => (
                        <Badge
                          key={interest}
                          variant={pendingInterests.includes(interest) ? "default" : "outline"}
                          className="cursor-pointer rounded-full"
                          onClick={() => togglePendingInterest(interest)}
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground">Location</h3>
                    <p className="text-xs text-muted-foreground">Select all that apply</p>
                    <div className="flex gap-2 flex-wrap">
                      {provinces.map((province) => (
                        <Badge
                          key={province}
                          variant={pendingLocations.includes(province) ? "default" : "outline"}
                          className="cursor-pointer rounded-full"
                          onClick={() => togglePendingLocation(province)}
                        >
                          {province}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground">Dad's Age</h3>
                    <p className="text-xs text-muted-foreground">Select all that apply</p>
                    <div className="flex gap-2 flex-wrap">
                      {ageRanges.slice(1).map((range) => (
                        <Badge
                          key={range}
                          variant={pendingDadAges.includes(range) ? "default" : "outline"}
                          className="cursor-pointer rounded-full"
                          onClick={() => togglePendingDadAge(range)}
                        >
                          {range}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <Button
                      className="flex-1"
                      onClick={applyFilters}
                    >
                      Apply Filters
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={clearAllFilters}
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="space-y-4">
            {filteredDads.length > 0 ? (
              filteredDads.map((dad) => (
                <DadCard
                  key={dad.id}
                  {...dad}
                  onConnect={() => handleConnect(dad.name)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No dads match your filters</p>
              </div>
            )}
          </div>
          
          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full rounded-full"
              onClick={handleRefresh}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default DiscoverDads;
