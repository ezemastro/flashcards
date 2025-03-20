import styled from 'styled-components'

export default function Results ({ children }: {children: React.ReactNode}) {
  return (
    <StyledResults className='results'>{children}</StyledResults>
  )
}

const StyledResults = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;

  .card, .deck {
    width: 15rem;
  }
`
