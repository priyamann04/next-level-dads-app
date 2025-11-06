import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/welcome-hero.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: '#EFE8DC' }}>
      <div className="w-full max-w-md space-y-4 animate-fade-in text-center px-6">
        <div className="flex justify-center mt-8 mb-6">
          <img src={logo} alt="Next Level Dads" className="h-40 w-auto" />
        </div>
        
        <div className="space-y-3">
          <p className="text-xl font-medium leading-snug" style={{ color: '#D8A24A' }}>
            Empowering Fathers.<br />
            Strengthening Families.
          </p>
          
          <p className="text-foreground leading-relaxed text-base">
            Connect with fathers to find friendship, community, and belonging. One connection at a time.
          </p>
        </div>
        
        <div className="pt-3 space-y-2">
          <Button
            size="lg"
            className="w-full rounded-full font-semibold text-base shadow-md"
            style={{ backgroundColor: '#D8A24A' }}
            onClick={() => navigate("/setup")}
          >
            Get Started
          </Button>
          <p className="text-sm text-foreground">
            Already have an account?{" "}
            <button 
              onClick={() => navigate("/login")} 
              className="font-semibold underline"
              style={{ color: '#D8A24A' }}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
