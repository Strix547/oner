import React from 'react'
import Typography from '@mui/material/Typography'

import { Header, Footer } from 'components'

import * as S from './PageLayout.styled'

interface PageLayout {
  children: React.ReactNode
  title?: string
}

export const PageLayout = ({ children, title }: PageLayout) => {
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
