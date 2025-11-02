import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/welcome-hero.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <div className="flex justify-center mt-4 mb-10">
            <img src={logo} alt="Next Level Dads" className="h-72 w-auto" />
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg mb-8">
            <img
              src={heroImage}
              alt="Fathers connecting"
              className="w-full h-64 object-cover"
            />
          </div>
          
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Find friendship, community, and belonging
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Connect with fathers nearby or with similar interests. One connection at a time.
            </p>
          </div>
          
          <div className="space-y-3 pt-4">
            <Button
              size="lg"
              className="w-full rounded-full bg-gradient-gold font-semibold text-base"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-primary font-medium underline"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center pb-8 px-6 text-xs text-muted-foreground">
        <p>Building genuine connections for fathers</p>
      </div>
    </div>
  );
};

export default Welcome;
