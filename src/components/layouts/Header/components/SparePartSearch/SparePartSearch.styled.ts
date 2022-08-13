import styled from 'styled-components'

import { Autocomplete } from 'ui/Autocomplete/Autocomplete.styled'

export { TextField } from 'ui/TextField/TextField.styled'

export const SparePartSearch = styled.div`
  max-width: 487px;
  width: 100%;
  margin-left: 17.63px;

  ${Autocomplete} {
    width: 100%;

    .autocomplete-input-root {
      background: #f4f5f7;

      .autocomplete-input {
        padding-top: 8.5px;
        padding-bottom: 4.5px;
        font-size: 16px;
        color: #505255;

        &::placeholder {
          color: #505255;
        }
      }
    }

    svg {
      fill: var(--color-primary);
    }
  }
`
