import { useContext } from 'react'
import { ModalContext } from '../context/modal'

export const useModal = () => {
  const { showModal, closeModal } = useContext(ModalContext)
  return { showModal, closeModal }
}
