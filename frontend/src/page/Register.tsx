import { Link, useNavigate } from 'react-router-dom'
import { StyledAuthMain } from '../styled/AuthMain'
import { emailSchema, passwordSchema, usernameSchema } from '../utils/validations'
import { useEffect, useState } from 'react'
import { register } from '../services/auth'
import { AuthError } from '../utils/errors'
import { toast } from 'react-toastify'
import { BeatLoader } from 'react-spinners'

interface RegisterErrors {
  username?: boolean,
  email?: boolean,
  password?: boolean,
  repeatPassword?: boolean,
  invalid?: boolean,
  error?: boolean
}

export default function Register () {
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = e.currentTarget.username.value
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value
    const repeatPassword = e.currentTarget.repeatPassword.value

    const errors: RegisterErrors = {}
    errors.username = !usernameSchema.safeParse(username).success
    errors.email = !emailSchema.safeParse(email).success
    errors.password = !passwordSchema.safeParse(password).success
    errors.repeatPassword = password !== repeatPassword

    if (errors.email || errors.password || errors.repeatPassword || errors.username) {
      setErrors(errors)
      return
    }

    try {
      setIsLoading(true)
      await register(username, email, password)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      if (error instanceof AuthError) errors.invalid = true
      else errors.error = true
      setErrors(errors)
      return
    }

    toast.success('User created successfully!')
    toast.info('Verify your email before logging in.')
    navigate('/login')
  }

  // throw toast
  useEffect(() => {
    if (errors.invalid) toast.error('Incorrect email or password')
    if (errors.error) toast.error('An error occurred')
  }, [errors])

  return (
    <StyledAuthMain>
      <section>
        <h2>Sign up</h2>
        <form action="" method="post" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
            {errors.username && <p className="error">Invalid username</p>}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" />
            {errors.email && <p className="error">Invalid email</p>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            {errors.password && <p className="error">Invalid password</p>}
          </div>
          <div>
            <label htmlFor="repeatPassword">Repeat password</label>
            <input type="repeatPassword" name="repeatPassword" id="repeatPassword" />
            {errors.password && <p className="error">Passwords are not the same</p>}
          </div>

          <button type="submit" disabled={isLoading}>{isLoading ? <BeatLoader color='#fff' /> : 'Sign up'}</button>
        </form>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </section>
    </StyledAuthMain>
  )
}
