import { Link } from 'react-router-dom'
import { StyledAuthMain } from '../styled/AuthMain'

export default function Register () {
  return (
    <StyledAuthMain>
      <section>
        <h2>Log in</h2>
        <form action="" method="post">
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>

          <button type="submit">Log in</button>
        </form>
        <p>Don&apos;t have an account? <Link to="/register">Sign up</Link></p>
      </section>
    </StyledAuthMain>
  )
}
