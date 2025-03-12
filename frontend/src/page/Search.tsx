import { useRef, useState } from 'react'
import styled from 'styled-components'
import Switch from '../components/Switch'
import { useDraggable } from 'react-use-draggable-scroll'

export default function Search () {
  // TODO - get categories
  const [categories, setCategories] = useState<string[]>(['category', '2 category'])
  const typeRef = useRef<HTMLInputElement>(null)

  // drag
  const dragRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
  const { events } = useDraggable(dragRef)

  return (
    <StyledSearchMain>
      <form action="" method="get">
        <section className='filters'>
          <Switch opts={['Cards', 'Decks']} inputRef={typeRef} className="switch" />
          <div className='search'>
            <input type="text" name="query" placeholder='Search...' />
            <button type="submit">🔍</button>
          </div>
        </section>
        <section className='categories' {...events} ref={dragRef}>
          {/* TODO - Add categories */}
          {categories.map(category => <div key={category}>{category}</div>)}
        </section>
      </form>
      <section className='results'>
        Results go here
      </section>
    </StyledSearchMain>
  )
}

const StyledSearchMain = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem 0;
  gap: 2rem;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100vw;
    overflow-x: hidden;
    gap: 1rem;
    
    .filters {
      display: flex;
      justify-content: space-between;
      width: 30rem;
      gap: 2rem;

      .search {
        display: flex;
        background-color: var(--s-color);
        border-radius: 2rem;
        padding: 0.5rem 1rem;
        width: 100%;
        
        input {
          background-color: transparent;
          height: 100%;
          width: 100%;
          border: none;
          font-size: 1.1rem;
          font-weight: lighter;

          &:focus {
            outline: none;
          }
          &::placeholder {
            color: var(--black-color);
            opacity: 0.8;
          }
        }
        button {
          cursor: pointer;
          background-color: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    .categories {
      max-width: 100%;
      overflow-x: scroll;
      display: flex;
      justify-content: start;
      gap: 1rem;
      padding: 0 1rem;

      &::-webkit-scrollbar {
        display: none;
      }

      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        background-color: var(--s-color);
        border-radius: 2rem;
        padding: 0.5rem 1rem;
        user-select: none;
      }
    }
  }

`
