import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/welcome-hero.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: '#EFE8DC' }}>
      <div className="w-full max-w-md space-y-6 animate-fade-in text-center">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Next Level Dads" className="h-24 w-auto" />
        </div>
        
        <div className="space-y-3">
          <p className="text-lg font-medium" style={{ color: '#D8A24A' }}>
            Empowering Fathers. Strengthening Families.
          </p>
          
          <p className="text-foreground leading-relaxed px-4">
            Connect with fathers to find friendship, community, and belonging.<br />
            One connection at a time.
          </p>
        </div>
        
        <div className="pt-6">
          <Button
            size="lg"
            className="w-full rounded-full font-semibold text-base shadow-md"
            style={{ backgroundColor: '#D8A24A' }}
            onClick={() => navigate("/setup")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
