import { useEffect, useRef } from 'react'
import styled from 'styled-components'

type Props = {
  opts: [string, string],
  inputRef: React.RefObject<HTMLInputElement>,
  className?: string,
  defaultChecked?: boolean,
  onChange?: () => void
}

export default function Switch ({ opts, inputRef, className, defaultChecked, onChange }: Props) {
  const switchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputRef.current === null) return
    if (defaultChecked) inputRef.current.checked = true
  }, [])

  const handleClick = () => {
    if (inputRef.current === null) return
    inputRef.current.click()

    onChange?.()
  }

  return (
    <StyledSwitch className={className} ref={switchRef} onClick={handleClick}>
      <input type="checkbox" name="" ref={inputRef} onClick={(e) => e.stopPropagation()} />
      <div>{opts[0]}</div>
      <div>{opts[1]}</div>
      <span />
    </StyledSwitch>
  )
}

const StyledSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  padding: 0.2rem 0;
  background-color: var(--s-color);
  border-radius: 2rem;
  text-align: center;
  user-select: none;
  cursor: pointer;

  div {
    z-index: 1;
    width: 5rem;
  }

  input {
    display: none;
  }

  span {
    position: absolute;
    left: 0;
    width: 50%;
    height: 100%;
    border-radius: 2rem;
    background-color: var(--t-color);
    transition: all 0.2s ease-in-out;
  }

  input:checked ~ span {
    left: 50%;    
  }
`
