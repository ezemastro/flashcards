import styled from 'styled-components'

export const StyledAuthMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  section {
    background-color: var(--s-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 2rem;
    padding: 2rem;
    gap: 2rem;
    min-width: 30rem;
    box-shadow: var(--shadow);

    h2 {
      color: var(--black-color);
      font-size: 2rem;
      font-weight: normal;
    }

    form {
      width: 100%;
      min-width: 20rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        label {
          font-weight: lighter;
          font-size: 1.3rem;
        }

      }
      input, button {
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: none;
        background-color: var(--bg-color);
        font-size: 1rem;
        box-shadow: var(--shadow);

        &:focus {
          outline: none;
        }
      }
      button {
        margin-top: 1rem;
        background-color: var(--f-color);
        color: var(--white-color);
        font-size: 1.3rem;
      }
    }
  }
`
