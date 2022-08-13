import React, { forwardRef, Fragment } from 'react'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

import { useUser } from 'hooks'
import { Message } from 'types/chat'

import * as S from './MessagesList.styled'

type Ref = HTMLDivElement | null

interface DayGroupedMessages {
  date: string
  messages: Message[]
}

interface MessagesListProps {
  messages?: Message[]
}

export const MessagesList = forwardRef<Ref, MessagesListProps>(({ messages = [] }, ref) => {
  const user = useUser()

  const groupMessagesByDay = (messages: Message[]) => {
    const formatIsoToShortDate = (date: string) => {
      return new Date(date).toLocaleDateString()
    }

    return messages.reduce<DayGroupedMessages[]>((prev, message, _, messages) => {
      const messageDate = formatIsoToShortDate(message.dateTime)
      const isDateExist = prev.some(({ date }) => date === messageDate)

      if (isDateExist) {
        return prev
      }

      const allMessagesByCurrDate = messages.filter(
        ({ dateTime }) => formatIsoToShortDate(dateTime) === messageDate
      )

      return [
        ...prev,
        {
          date: messageDate,
          messages: allMessagesByCurrDate
        }
      ]
    }, [])
  }

  const renderMessages = (messages: Message[]) => {
    return messages.map((message, idx) => {
      const { id, dateTime, message: messageText, senderId, file } = message
      const isntLastMessage = messages.length - 1 !== idx
      const nextMessSenderId = messages[idx + 1]?.senderId
      const time = new Date(dateTime).toLocaleTimeString().slice(0, 5)
      const fileExt = file?.slice(-3)
      const isFileImg = fileExt === 'png' || fileExt === 'jpg'

      return (
        <S.Message
          key={id}
          mineMessage={senderId === user.id}
          style={
            isntLastMessage
              ? {
                  marginBottom: nextMessSenderId === senderId ? 5 : 20
                }
              : {}
          }
        >
          <Typography>{messageText}</Typography>

          {file && (
            <S.FileContainer>
              {isFileImg ? (
                <S.MessageImg>
                  <img src={file} />
                </S.MessageImg>
              ) : (
                <Link href={file} passHref>
                  <S.MessageFileLink>{file}</S.MessageFileLink>
                </Link>
              )}
            </S.FileContainer>
          )}

          <S.MessageTime>{time}</S.MessageTime>
        </S.Message>
      )
    })
  }

  const renderMessagesGroups = (messages: DayGroupedMessages[]) => {
    return messages.map(({ date, messages }) => {
      return (
        <Fragment key={date}>
          <S.MessagesDate>{date}</S.MessagesDate>

          {renderMessages(messages)}
        </Fragment>
      )
    })
  }

  return (
    <S.MessagesListContainer ref={ref}>
      <S.MessagesList>{renderMessagesGroups(groupMessagesByDay(messages))}</S.MessagesList>
    </S.MessagesListContainer>
  )
})
