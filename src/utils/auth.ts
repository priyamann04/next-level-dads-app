import validator from 'validator'
import { MIN_PASSWORD_LENGTH } from '@/config/constants'

export const isStrongPassword = (password: string): boolean => {
  return validator.isStrongPassword(password, {
    minLength: MIN_PASSWORD_LENGTH,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
}
