import { Link } from 'react-router-dom'
import { ROUTES } from '@/lib/routes'

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          Oops! Page not found
        </p>
        <Link
          to={ROUTES.WELCOME}
          className="text-primary underline hover:text-primary/80"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
