import React from 'react'
import Link from 'next/link'
import Typography from '@mui/material/Typography'

import { ROUTE_NAMES } from 'core'

import * as S from './Footer.styled'

import ChatIcon from 'public/icons/chat.svg'
import ArrowRightIcon from 'public/icons/arrows/sign-right.svg'

import VisaIcon from 'public/icons/payments/visa.svg'
import MasterCardIcon from 'public/icons/payments/mastercard.svg'
import MirIcon from 'public/icons/payments/mir.svg'

export const Footer = () => {
  const nav = [
    {
      tag: 'Меню компании',
      items: [
        { label: 'Что такое Oner', link: '/' },
        { label: 'Реквизиты и информация', link: '/' },
        { label: 'Новости', link: '/' },
        { label: 'Вакансии', link: '/' },
        { label: 'Поставщикам', link: '/' },
        { label: 'Контакты', link: '/' }
      ]
    },
    {
      tag: 'Каталоги',
      items: [
        { label: 'Оригинальные запчасти', link: ROUTE_NAMES.ORIGINAL_SPARE_PARTS },
        { label: 'Неоригинальные запчасти', link: ROUTE_NAMES.NON_ORIGINAL_SPARE_PARTS },
        { label: 'Запчасти для ТО', link: ROUTE_NAMES.MAINTENANCE_SPARE_PARTS },
        { label: 'Автомасла', link: ROUTE_NAMES.CAR_OILS },
        { label: 'Аккумуляторы', link: ROUTE_NAMES.ACCUMULATORS },
        { label: 'Распродажа', link: '/' }
      ]
    },
    {
      tag: 'Помощь',
      items: [
        { label: 'Часто задаваемые вопросы', link: '/' },
        { label: 'Консультация Online', link: '/' },
        { label: 'Оплата заказа', link: '/' },
        { label: 'Доставка заказа', link: '/' },
        { label: 'Возврат товара', link: '/' },
        { label: 'Забыл пароль', link: '/' }
      ]
    },
    {
      tag: 'Товары и бренды',
      items: [
        { label: 'Список брендов', link: '/' },
        { label: 'Популярные товары', link: '/' },
        { label: 'Наличие на складах', link: '/' }
      ]
    }
  ]

  const payments = [
    { label: 'visa', icon: <VisaIcon /> },
    { label: 'mastercard', icon: <MasterCardIcon /> },
    { label: 'mir', icon: <MirIcon /> }
  ]

  const navColumns = nav.map(({ tag, items }) => {
    const navItems = items.map(({ label, link }) => {
      return (
        <S.NavItem key={label}>
          <Link href={link}>{label}</Link>
        </S.NavItem>
      )
    })

    return (
      <S.NavColumn key={tag}>
        <S.NavTag>{tag}</S.NavTag>

        <S.NavList>{navItems}</S.NavList>
      </S.NavColumn>
    )
  })

  const paymentItems = payments.map(({ label, icon }) => {
    return <S.PaymentItem key={label}>{icon}</S.PaymentItem>
  })

  const navAccordionItems = nav.map(({ tag, items }) => {
    const navItems = items.map(({ label, link }) => {
      return (
        <S.NavItem key={label} as="div">
          <Link href={link}>{label}</Link>
        </S.NavItem>
      )
    })

    return (
      <S.NavAccordion key={tag}>
        <S.NavAccordionSummary expandIcon={<ArrowRightIcon />}>
          <S.NavTag>{tag}</S.NavTag>
        </S.NavAccordionSummary>

        <S.NavAccordionDetails>{navItems}</S.NavAccordionDetails>
      </S.NavAccordion>
    )
  })

  const docs = (
    <S.Documents>
      <Link href="/">Оферта</Link>
      <Link href="/">Конфиденциальность</Link>
    </S.Documents>
  )

  return (
    <S.Footer>
      <S.Wrapper>
        <S.Top>
          {navColumns}

          <S.NavAccordionContainer>{navAccordionItems}</S.NavAccordionContainer>

          <S.TopRight>
            <S.Consultation>
              <Link href="/" passHref>
                <S.ConsultationLink>
                  <ChatIcon />

                  <span>
                    <span>Консультация Online</span>
                    <span>Задавайте вопросы</span>
                  </span>
                </S.ConsultationLink>
              </Link>

              <S.ConsultationStatus>
                <S.ConsultationIndicator />

                <Typography>Сервис работает в обычном режиме</Typography>
              </S.ConsultationStatus>
            </S.Consultation>

            {docs}
          </S.TopRight>
        </S.Top>

        <S.Bottom>
          <Typography>Copyright © ООО «Oner.ru» 2021. All rights reserved.</Typography>

          <S.PaymentAccept>
            <Typography>Принимаем к оплате</Typography>

            <S.PaymentServices>{paymentItems}</S.PaymentServices>
          </S.PaymentAccept>

          {docs}
        </S.Bottom>
      </S.Wrapper>
    </S.Footer>
  )
}
