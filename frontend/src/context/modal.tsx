import { createContext, useState } from 'react'
import styled from 'styled-components'

interface ModalContext {
  showModal: (Modal: React.JSX.Element) => void
  closeModal: () => void
}

export const ModalContext = createContext<ModalContext>({
  showModal: () => {},
  closeModal: () => {}
})

export const ModalContainer = ({ children }: { children: React.ReactNode }) => {
  const [Modal, setModal] = useState<React.ReactNode | null>(null)

  const closeModal = () => setModal(null)
  return (
    <ModalContext.Provider value={{
      showModal: (Modal: React.ReactElement) => setModal(Modal),
      closeModal
    }}>
      <StyledContainer>
        {children}
        <div className={'overlay' + (Modal ? ' active' : '')} onClick={closeModal}/>
        {Modal && <div className="modal">{Modal}</div>}
      </StyledContainer>
    </ModalContext.Provider>
  )
}

const StyledContainer = styled.div`
  position: relative;

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    
    &.active {
      backdrop-filter: blur(15px);
      pointer-events: all;
    }
  }
  
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
`
