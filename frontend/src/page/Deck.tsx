import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useSession } from '../hook/session'
import { getDeck } from '../services/getDeck'
import Switch from '../components/Switch'
import Card from '../components/Card'
import deckMock from '../mock/deck.json'
import cardsMock from '../mock/card.json'
import { useDraggable } from 'react-use-draggable-scroll'
import { updateDeck } from '../services/updateDeck'
import { ValidationError } from '../utils/errors'
import { toast } from 'react-toastify'
import { descSchema, titleSchema } from '../utils/validations'
import { useModal } from '../hook/modal'
import { createDeck } from '../services/createDeck'
import ConfirmModal from '../components/ConfirmModal'

export default function Deck () {
  const { session } = useSession()
  const navigate = useNavigate()
  const params = useParams()
  const [deck, setDeck] = useState<Deck | null>(deckMock[0])
  const [cards, setCards] = useState<Card[]>(cardsMock.cards)
  const [isModified, setIsModified] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const { showModal, closeModal } = useModal()

  useEffect(() => {
    if (!params.id) navigate('/')
    /*
    getDeck(session!.id, params.id!)
      .then(deck => setDeck(deck))
      .catch(() => navigate('/'))
      */
  }, [])

  useEffect(() => {
    const categories = cards.map(card => card.category)
    setCategories(categories.filter((category, index) => categories.indexOf(category) === index))
  }, [cards])

  const handleSave = async () => {
    const title = titleRef.current?.value
    const isPublic = switchRef.current?.checked
    const desc = descRef.current?.value

    if (!titleSchema.safeParse(title).success) return toast.error('Invalid title')
    if (!descSchema.safeParse(desc).success) return toast.error('Invalid description')

    if (!title || typeof isPublic !== 'boolean' || !desc || !params.id) return toast.error('Invalid')

    if (deck?.id_user === session?.id) {
      try {
        await updateDeck({ id: params.id!, title: title!, isPublic: isPublic!, desc: desc! })
      } catch (error) {
        if (error instanceof ValidationError) toast.error(error.message)
        else toast.error('Something went wrong')
        return
      }

      toast.success('Deck updated')
      setIsModified(false)
    } else {
      // create a copy
      const handleConfirm = async () => {
        closeModal()
        try {
          await createDeck({ userId: session!.id, title: title!, isPublic: isPublic!, desc: desc!, cards })
        } catch (error) {
          if (error instanceof ValidationError) toast.error(error.message)
          else toast.error('Something went wrong')
          return
        }

        toast.success('Deck created')
        setIsModified(false)
      }

      showModal(<ConfirmModal
        closeModal={closeModal}
        title='You will own a copy of this deck'
        message='As this deck is not yours, you will own a copy of it with the changes you made.'
        onConfirm={handleConfirm}
      />)
    }
  }
  const titleRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)

  const switchRef = useRef<HTMLInputElement>(null)

  // drag
  const dragRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
  const { events } = useDraggable(dragRef)

  return (
    <StyledDeckMain>
      <section className='header'>
        {isModified && <button className='save' onClick={handleSave}>Save</button>}
        <input
          className='title'
          type="text"
          ref={titleRef}
          placeholder='Title...'
          defaultValue={deck?.name}
          onChange={() => { if (!isModified) setIsModified(true) }}
        />
        <div className="info">
          <div className="desc">
            <h3>Description</h3>
            <textarea
              className='description'
              ref={descRef}
              defaultValue={deck?.description}
              placeholder='Description...'
              onChange={() => { if (!isModified) setIsModified(true) }}
            />
          </div>
          <div className="data">
            <div className="like"><img src="" alt="" /><p>{deck?.likes}</p></div>
            <Switch opts={['Private', 'Public']} defaultChecked={deck?.public} inputRef={switchRef} onChange={() => { if (!isModified) setIsModified(true) }} className='switch' />
            <div className="cardsCount"><img src="" alt="" /><p>{deck?.cardsCount}</p></div>
            <div className="creator">{deck?.id_user}</div>
          </div>
        </div>
        <div className="categories" {...events} ref={dragRef}>
          {categories.map(category => <span className='category' key={category}>{category}</span>)}
        </div>
      </section>

      <section className='cards'>
        {cards.map(card => <Card key={card._id} card={card} />)}
      </section>

    </StyledDeckMain>
  )
}

const StyledDeckMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  align-items: center;

  .header {
    max-width: 80rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .save {
      position: absolute;
      background-color: var(--t-color);
      height: 3rem;
      width: 5rem;
      border-radius: .5rem;
      font-size: 1.5rem;
      font-weight: lighter;
      cursor: pointer;
    }
    .title {
      font-size: 2rem;
      font-weight: normal;
      text-align: center;
    }

    .info {
      display: flex;
      justify-content: space-between;
      gap: 3rem;

      .desc {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        
        h3 {
          font-size: 1.75rem;
          font-weight: normal;
        }
        .description {
          padding: .5rem;
          font-size: 1.1rem;
          width: 100%;
          height: 5rem;
          flex-grow: 1;
          resize: none;
          background-color: var(--s-color);
          border-radius: .5rem;
        }
      }
      .data {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 1rem;
        justify-items: center;
        align-content: space-between;
        padding: .2rem 0;

        .like, .cardsCount {
          font-size: 1.2rem;
          height: 2rem;
          background-color: var(--s-color);
          display: flex;
          align-items: center;
          min-width: 7rem;
          justify-content: space-between;
          padding: 0 .7rem;
          border-radius: .25rem;

          img {
            height: 2rem;
            aspect-ratio: 1/1;
            width: 2rem;
          }
        }

        .switch {
          height: 2rem;
          width: 13rem;
        }
      }
    }

    .categories {
      max-width: 100%;
      height: 2.5rem;
      overflow-x: scroll;
      display: flex;
      gap: 1rem;

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
      }
    }
  }
  input, textarea, button {
    background: none;
    border: none;

    &:focus { outline: none; }
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }
`
