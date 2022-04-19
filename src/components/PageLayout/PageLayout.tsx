import React, { FC } from 'react'
import Typography from '@mui/material/Typography'

import { Header, Footer } from 'components'

import * as S from './PageLayout.styled'

interface PageLayout {
  title?: string
}

export const PageLayout: FC<PageLayout> = ({ children, title }) => {
  return (
    <S.PageLayout>
      <Header />

      <S.Wrapper as="main">
        {title && (
          <Typography variant="h2" component="h1">
            {title}
          </Typography>
        )}

        <S.Content>{children}</S.Content>
      </S.Wrapper>

      <Footer />
    </S.PageLayout>
  )
}
