import { Link, useNavigate } from 'react-router-dom'
import { StyledAuthMain } from '../styled/AuthMain'
import { emailSchema, passwordSchema } from '../utils/validations'
import { useEffect, useState } from 'react'
import { login } from '../services/auth'
import { useSession } from '../hook/session'
import { AuthError } from '../utils/errors'
import { toast } from 'react-toastify'
import { BeatLoader } from 'react-spinners'

interface LoginErrors {
  email?: boolean,
  password?: boolean,
  invalid?: boolean,
  error?: boolean
}

export default function Login () {
  const { setSession } = useSession()
  const [errors, setErrors] = useState<LoginErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value

    const errors: LoginErrors = {}
    errors.email = !emailSchema.safeParse(email).success
    errors.password = !passwordSchema.safeParse(password).success

    if (errors.email || errors.password) {
      setErrors(errors)
      return
    }

    let id, username
    try {
      setIsLoading(true)
      const loginResponse = await login(email, password)
      setIsLoading(false)
      id = loginResponse.id
      username = loginResponse.username
    } catch (error) {
      setIsLoading(false)
      if (error instanceof AuthError) errors.invalid = true
      else errors.error = true
      setErrors(errors)
      return
    }

    setSession({ id, username })
    toast.success('Logged in successfully')
    navigate('/')
  }

  // throw toast
  useEffect(() => {
    if (errors.invalid) toast.error('Incorrect email or password')
    if (errors.error) toast.error('An error occurred')
  }, [errors])

  return (
    <StyledAuthMain>
      <section>
        <h2>Log in</h2>
        <form action="" method="post" onSubmit={handleLogin}>
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

          <button type="submit" disabled={isLoading}>{isLoading ? <BeatLoader color='#fff' /> : 'Log in'}</button>
        </form>
        <p>Don&apos;t have an account? <Link to="/register">Sign up</Link></p>
      </section>
    </StyledAuthMain>
  )
}
