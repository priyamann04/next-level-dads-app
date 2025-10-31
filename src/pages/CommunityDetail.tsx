import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import avatarLight1 from "@/assets/avatar-light-1.png";
import avatarMedium1 from "@/assets/avatar-medium-1.png";
import avatarDark1 from "@/assets/avatar-dark-1.png";
import avatarMedium2 from "@/assets/avatar-medium-2.png";

const CommunityDetail = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const community = {
    title: "Saturday Coffee Dads",
    description: "Weekly Saturday morning meetups at local coffee shops. Share stories, swap advice, and build lasting friendships.",
    memberCount: 42,
    nextEvent: "Sat 9am"
  };

  const members = [
    { id: 1, name: "Mike", age: 35, location: "Vancouver, BC", bio: "Love hiking and cooking", childrenAges: "Dad of 2 kids, ages 5 and 9", avatar: avatarLight1 },
    { id: 2, name: "David", age: 42, location: "Calgary, AB", bio: "Tech dad, gaming enthusiast", childrenAges: "Dad of 3 kids, ages 7, 10, and 14", avatar: avatarMedium1 },
    { id: 3, name: "James", age: 38, location: "Halifax, NS", bio: "Music lover and photographer", childrenAges: "Dad of 1 kid, age 3", avatar: avatarDark1 },
    { id: 4, name: "Steve", age: 40, location: "Montréal, QC", bio: "Outdoor adventure seeker", childrenAges: "Dad of 2 kids, ages 6 and 8", avatar: avatarMedium2 },
  ];

  const handleConnect = (name: string) => {
    toast({
      title: "Connection request sent!",
      description: `Your request to connect with ${name} has been sent.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-4">
          <button onClick={() => navigate("/discover")} className="text-muted-foreground mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
            {community.title}
          </h1>
          <p className="text-muted-foreground mb-4">{community.description}</p>
          <Button className="w-full rounded-full bg-gradient-gold">
            Join Community
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
          Members ({members.length})
        </h2>
        <div className="space-y-3">
          {members.map((member) => (
            <Card 
              key={member.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/profile/${member.id}`)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">
                    {member.name}, {member.age}
                  </h3>
                  <p className="text-xs text-muted-foreground">{member.childrenAges}</p>
                  <p className="text-sm text-muted-foreground truncate">{member.bio}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConnect(member.name);
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
