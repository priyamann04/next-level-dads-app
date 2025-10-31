import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import avatarLight1 from "@/assets/avatar-light-1.png";
import avatarMedium1 from "@/assets/avatar-medium-1.png";
import avatarDark1 from "@/assets/avatar-dark-1.png";
import avatarMedium2 from "@/assets/avatar-medium-2.png";

const GroupMembers = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const groupData = {
    private: {
      title: "Weekend Outdoor Adventures",
      type: "Private Group",
      description: "A private group for dads who love outdoor activities and weekend adventures.",
      members: [
        { 
          id: 1, 
          name: "Mike", 
          age: 35, 
          location: "Vancouver, BC",
          bio: "Love hiking and cooking", 
          childrenAges: "Dad of 2 kids, ages 5 and 9",
          stages: ["School Age (5–8 years)", "Pre-Teen (9–12 years)"],
          interests: ["Outdoors", "Cooking", "Fitness"],
          avatar: avatarLight1 
        },
        { 
          id: 2, 
          name: "David", 
          age: 42, 
          location: "Calgary, AB",
          bio: "Tech dad, gaming enthusiast", 
          childrenAges: "Dad of 3 kids, ages 7, 10, and 14",
          stages: ["School Age (5–8 years)", "Pre-Teen (9–12 years)", "Teenager (13–17 years)"],
          interests: ["Tech", "Gaming", "Reading"],
          avatar: avatarMedium1 
        },
        { 
          id: 3, 
          name: "James", 
          age: 38,
          location: "Halifax, NS", 
          bio: "Music lover and photographer", 
          childrenAges: "Dad of 1 kid, age 3",
          stages: ["Toddler Years (2–4 years)"],
          interests: ["Music", "Photography", "Art"],
          avatar: avatarDark1 
        },
      ],
    },
    public: {
      title: "Toronto Dads Community",
      type: "Public Group",
      description: "Open community for all dads in the Toronto area to connect, share experiences, and organize meetups.",
      members: [
        { 
          id: 1, 
          name: "Mike", 
          age: 35,
          location: "Vancouver, BC", 
          bio: "Love hiking and cooking", 
          childrenAges: "Dad of 2 kids, ages 5 and 9",
          stages: ["School Age (5–8 years)", "Pre-Teen (9–12 years)"],
          interests: ["Outdoors", "Cooking", "Fitness"],
          avatar: avatarLight1 
        },
        { 
          id: 2, 
          name: "David", 
          age: 42,
          location: "Calgary, AB", 
          bio: "Tech dad, gaming enthusiast", 
          childrenAges: "Dad of 3 kids, ages 7, 10, and 14",
          stages: ["School Age (5–8 years)", "Pre-Teen (9–12 years)", "Teenager (13–17 years)"],
          interests: ["Tech", "Gaming", "Reading"],
          avatar: avatarMedium1 
        },
        { 
          id: 3, 
          name: "James", 
          age: 38,
          location: "Halifax, NS", 
          bio: "Music lover and photographer", 
          childrenAges: "Dad of 1 kid, age 3",
          stages: ["Toddler Years (2–4 years)"],
          interests: ["Music", "Photography", "Art"],
          avatar: avatarDark1 
        },
        { 
          id: 4, 
          name: "Steve", 
          age: 40,
          location: "Montréal, QC", 
          bio: "Outdoor adventure seeker", 
          childrenAges: "Dad of 2 kids, ages 6 and 8",
          stages: ["School Age (5–8 years)"],
          interests: ["Outdoors", "Sports", "Travel"],
          avatar: avatarMedium2 
        },
      ],
    },
  };

  const group = id === "private" ? groupData.private : groupData.public;

  const handleConnect = (memberId: number, name: string) => {
    toast({
      title: "Connection request sent!",
      description: `Your request to connect with ${name} has been sent.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-6 py-4">
          <button onClick={() => navigate(`/group-chat/${id}`)} className="text-muted-foreground mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="mb-4">
            <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
              {group.title}
            </h1>
            <Badge variant="soft" className="rounded-full mb-3">{group.type}</Badge>
            <p className="text-muted-foreground">{group.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
          Members ({group.members.length})
        </h2>
        <div className="space-y-3">
          {group.members.map((member) => (
            <Card 
              key={member.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/profile/${member.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4 mb-3">
                  <Avatar className="w-12 h-12 shrink-0">
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
                      handleConnect(member.id, member.name);
                    }}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Stages:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.stages.map((stage) => (
                        <Badge key={stage} variant="soft" className="rounded-full text-xs">
                          {stage}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Interests:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.interests.map((interest) => (
                        <Badge key={interest} variant="soft" className="rounded-full text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupMembers;
