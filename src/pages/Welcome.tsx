import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.png'
import heroImage from '@/assets/welcome-hero.jpg'
import { ROUTES } from '@/lib/routes'

const Welcome = () => {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: '#EFE8DC' }}
    >
      <div className="w-full max-w-md space-y-8 animate-fade-in text-center px-6">
        <div className="flex justify-center mt-12 mb-8">
          <img
            src={logo}
            alt="Next Level Dads"
            className="w-[95%] h-auto"
          />
        </div>

        <div className="space-y-3">
          <p
            className="text-2xl font-semibold leading-snug [text-shadow:0_0_2px_#c9b06d,0_0_4px_#c9b06d,1px_1px_2px_#c9b06d,-1px_-1px_2px_#c9b06d]"
            style={{ color: '#000000' }}
          >
            Empowering Fathers.
            <br />
            Building Community.
          </p>
        </div>

        <div className="pt-3 space-y-3">
          <Button
            size="lg"
            className="w-full rounded-full font-semibold text-base shadow-md"
            style={{ backgroundColor: '#D8A24A' }}
            onClick={() => navigate(ROUTES.SETUP)}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="w-full rounded-full font-semibold text-base text-muted-foreground hover:text-foreground"
            onClick={() => navigate(ROUTES.DISCOVER_DADS)}
          >
            Skip
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Welcome
