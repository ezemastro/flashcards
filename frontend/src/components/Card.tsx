import styled from 'styled-components'

type Props = {
  card: Card
}

export default function Card ({ card }: Props) {
  return (
    <StyledCard className="card">
      <p className="question">{card.question}</p>
      <div className="answer">{card.answer}</div>
      <div className="info">
        <div className="category">{card.category}</div>
        <div className='deck'>
          {/* TODO - Add deck and Links */}
          Deck name
        </div>
      </div>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  background-color: var(--s-color);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1rem;
  border-radius: 0.5rem;

  .question {
    font-size: 1.5rem;
    max-height: 5rem;
    flex-grow: 1;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
  }

  .answer {
    background-color: var(--bg-color);
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
  }

  .info {
    display: flex;
    justify-content: space-between;

    div {
      background-color: var(--bg-color);
      border-radius: 0.5rem;
      padding: 0.5rem;
      font-size: 0.8rem;
    }
  }
`
