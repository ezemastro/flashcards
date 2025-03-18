import styled from 'styled-components'

type Props = {
  closeModal: () => void,
  title?: string,
  message?: string,
  onConfirm?: () => void
}

export default function ConfirmModal ({ closeModal, title, message, onConfirm }: Props) {
  return (
    <StyledConfirmModal>
      {title && <h3>{title}</h3>}
      {message && <p>{message}</p>}
      <div className='buttons'>
        {onConfirm && <button onClick={onConfirm}>Confirm</button>}
        <button onClick={closeModal}>Close</button>
      </div>
    </StyledConfirmModal>
  )
}
const StyledConfirmModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--s-color);
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.7);
  border-radius: 0.5rem;
  padding: 2rem;
  font-size: 1.2rem;

  .buttons {
    display: flex;
    flex-direction: row-reverse;
    gap: 1rem;
    
    button {
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem; 
      border: none;
      cursor: pointer;
    }

    button:nth-child(1) {
      background-color: var(--bg-color);
    }
    button:nth-child(2) {
      background-color: var(--t-color);
      font-weight: lighter;
    }
  }
`
