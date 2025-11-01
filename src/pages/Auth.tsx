import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Check if user has completed onboarding
        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .eq('id', session.user.id)
          .single();

        if (profile?.onboarding_completed) {
          navigate('/discover');
        } else {
          navigate('/setup');
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/setup`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in with Google');
      console.error('Google sign in error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="flex flex-col items-center space-y-4">
          <img src={logo} alt="Dad Tribe" className="w-24 h-24 mb-4" />
          <h1 className="text-3xl font-heading font-semibold text-foreground text-center">
            Welcome to Dad Tribe
          </h1>
          <p className="text-muted-foreground text-center">
            Find friendship, community, and belonging
          </p>
        </div>

        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full rounded-full bg-gradient-gold font-semibold"
            onClick={handleGoogleSignIn}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Auth;
