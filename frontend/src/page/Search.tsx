import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Switch from '../components/Switch'
import { useDraggable } from 'react-use-draggable-scroll'
import Card from '../components/Card'
import mockResponse from '../mock/card.json'
import { type Search, search } from '../services/search'

export default function Search () {
  // TODO - get categories
  const [categories, setCategories] = useState<string[]>([])
  const [results, setResults] = useState<Search<'cards' | 'decks'>>({ type: 'cards', results: mockResponse.cards })
  const typeRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const type = typeRef.current?.checked ? 'decks' : 'cards'
    const query = e.currentTarget.query.value
    const categories: string[] = []

    e.currentTarget.category.forEach((input: HTMLInputElement) => {
      if (input.checked) categories.push(input.value)
    })

    try {
      const response = await search({ query, categories, type })
      setResults(response)
    } catch (error) {
      setResults({ type, results: [] })
      console.error(error)
    }
  }

  useEffect(() => {
    let categories: string[] = []
    if (results.type === 'decks') {
      const decks = results.results as Deck[]
      categories = decks.flatMap(decks => decks.categories)
    } else if (results.type === 'cards') {
      const cards = results.results as Card[]
      categories = cards.map(card => card.category)
    }
    setCategories(categories.filter((category, index) => categories.indexOf(category) === index))
  }, [results])

  // drag
  const dragRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
  const { events } = useDraggable(dragRef)

  return (
    <StyledSearchMain>
      <form action="" method="get" onSubmit={handleSubmit}>
        <section className='filters'>
          <Switch opts={['Cards', 'Decks']} inputRef={typeRef} className="switch" />
          <div className='search'>
            <input type="text" name="query" placeholder='Search...' />
            <button type="submit">🔍</button>
          </div>
        </section>
        <section className='categories' {...events} ref={dragRef}>
          {/* TODO - Add categories */}
          {categories.map(category => (
            <label key={category} className='category'>{category}<input type="checkbox" name="category" value={category} /></label>
          ))}
        </section>
      </form>
      <section className='results'>
        {results.type === 'cards' && results.results.map(card => <Card key={card._id} card={card as Card} />)}
        {results.type === 'decks' && results.results.map(deck => <Deck key={deck._id} deck={deck as Deck} />)}
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
        height: 2.5rem;
        
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
      height: 2.5rem;
      overflow-x: scroll;
      display: flex;
      justify-content: start;
      gap: 1rem;
      padding: 0 1rem;

      &::-webkit-scrollbar {
        display: none;
      }

      .category {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--s-color);
        border-radius: 2rem;
        padding: 0.5rem 1rem;
        user-select: none;
        transition: all 0.1s ease-out;

        input {
          display: none;
        }
      }

      .category:has(input:checked) {
        background-color: var(--t-color);
      }
    }
  }
  
  .results {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;

    .card {
      width: 15rem;
    }
  }
`
