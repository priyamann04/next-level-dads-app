import BottomNav from "@/components/BottomNav";
import CommunityCard from "@/components/CommunityCard";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const communities = [
  {
    id: 1,
    title: "Saturday Coffee Dads",
    description: "Weekly Saturday morning meetups at local coffee shops. Share stories, swap advice, and build lasting friendships.",
    memberCount: 42,
    nextEvent: "Sat 9am"
  },
  {
    id: 2,
    title: "Outdoor Adventure Dads",
    description: "For dads who love hiking, camping, and exploring nature with their kids. Monthly outdoor excursions.",
    memberCount: 67,
    nextEvent: "Next Sun"
  },
  {
    id: 3,
    title: "Tech & Gaming Dads",
    description: "Connect over technology, gaming, and teaching kids to code. Virtual meetups and gaming sessions.",
    memberCount: 89,
  },
  {
    id: 4,
    title: "New Dads Support",
    description: "Just starting your fatherhood journey? Connect with other new dads navigating the early years together.",
    memberCount: 53,
    nextEvent: "Thu 7pm"
  },
  {
    id: 5,
    title: "Sports & Fitness Dads",
    description: "Stay active together! Organize pickup games, workout sessions, and teach kids about sports.",
    memberCount: 78,
    nextEvent: "Sat 10am"
  },
  {
    id: 6,
    title: "Creative Dads",
    description: "For fathers who love art, music, photography, and creative pursuits. Share projects and inspire each other.",
    memberCount: 34,
  }
];

const Discover = () => {
  const { toast } = useToast();

  const handleJoin = (title: string) => {
    toast({
      title: "Joined community! 🎉",
      description: `You've joined ${title}. Check your messages for group chat access.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-6">
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Discover
          </h1>
          <p className="text-muted-foreground">
            Join communities and find your tribe
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        <Tabs defaultValue="communities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="communities">Communities</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="communities" className="space-y-4 animate-fade-in">
            {communities.map((community) => (
              <CommunityCard
                key={community.id}
                {...community}
                onJoin={() => handleJoin(community.title)}
              />
            ))}
          </TabsContent>

          <TabsContent value="events" className="space-y-4 animate-fade-in">
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-2">
                No upcoming events yet
              </p>
              <p className="text-sm text-muted-foreground">
                Join a community to see their events
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Discover;
