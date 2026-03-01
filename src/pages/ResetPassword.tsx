import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import logo from '@/assets/logo.png'
import { ROUTES } from '@/lib/routes'
import { useToast } from '@/components/ui/use-toast'
import { MIN_PASSWORD_LENGTH } from '@/config/constants'
import validator from 'validator'
import { supabase } from '@/lib/supabase'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    if (!newPassword || !confirmPassword) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      })
      return
    }
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match.',
        variant: 'destructive',
      })
      return
    }
    if (
      !validator.isStrongPassword(newPassword, {
        minLength: MIN_PASSWORD_LENGTH,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      toast({
        title: 'Weak password',
        description: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long and include uppercase letters, lowercase letters, numbers, and special characters.`,
        variant: 'destructive',
      })
      return
    }
    setIsLoading(true)
    try {
      let res: any = await supabase.auth.updateUser({
        password: newPassword,
      })
      if (res.error) {
        throw res.error
      }
      res = await supabase.auth.signOut()
      if (res.error) {
        throw res.error
      }
      window.history.replaceState({}, document.title, ROUTES.RESET_PASSWORD) // clear query params from URL
      toast({
        title: 'Password reset successful',
        description: 'Your password has been reset.',
      })
      navigate(ROUTES.LOGIN)
    } catch (err: any) {
      toast({
        title: 'Password reset failed',
        description:
          err.message || 'An error occurred while resetting your password.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: '#EFE8DC' }}
    >
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Next Level Dads"
            className="w-48 h-auto"
          />
        </div>

        <Card className="shadow-md">
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl font-heading font-semibold text-center text-foreground">
              Reset Password
            </h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-foreground"
                >
                  New Password
                </label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="rounded-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-foreground"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full font-semibold text-base shadow-md"
                style={{ backgroundColor: '#D8A24A' }}
                disabled={isLoading}
              >
                Reset Password
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              <button
                type="button"
                onClick={() => navigate(ROUTES.LOGIN)}
                className="font-semibold hover:underline"
                style={{ color: '#D8A24A' }}
                disabled={isLoading}
              >
                Back to Login
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ResetPassword
