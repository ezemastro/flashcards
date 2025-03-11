import { useRef } from 'react'
import styled from 'styled-components'
import Switch from '../components/Switch'

export default function Search () {
  const typeRef = useRef<HTMLInputElement>(null)

  return (
    <StyledSearchMain>
      <form action="" method="get">
        <section>
          <Switch opts={['Cards', 'Decks']} inputRef={typeRef} className="switch" />
          <div>
            <input type="text" name="query" />
            <button type="submit">🔍</button>
          </div>
        </section>
      </form>
      <section>
        Results go here
      </section>
    </StyledSearchMain>
  )
}

const StyledSearchMain = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
`
