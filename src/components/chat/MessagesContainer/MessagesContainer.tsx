import { Fragment, forwardRef } from 'react'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import InfiniteScroll from 'react-infinite-scroller'

import { useAuth } from 'hooks'
import { Message, DialogMessage, MessagesByDay } from '../types'

import * as S from './MessagesContainer.styled'

type Ref = HTMLDivElement | null

interface ChatMessagesContainerProps {
  messages: Message[]
  hasMoreMessages: boolean
  onLoadMore: () => void
}

// eslint-disable-next-line react/display-name
export const ChatMessagesContainer = forwardRef<Ref, ChatMessagesContainerProps>(
  ({ messages, hasMoreMessages, onLoadMore }, ref) => {
    const { user } = useAuth()

    const dialogMessages: DialogMessage[] = messages.map(
      ({ id, dateTime, message, senderId, file }) => {
        return {
          id,
          dateTime,
          message,
          sender: senderId === user?.id ? ('me' as const) : ('companion' as const),
          file
        }
      }
    )

    const messagesSplitedByDay = dialogMessages.reduce<MessagesByDay[]>((rest, curr, _, arr) => {
      const currMessageDate = new Date(curr.dateTime).toLocaleDateString()
      const currDateExist = rest.some(({ date }) => date === currMessageDate)

      if (currDateExist) return rest

      const messagesByCurrMessDate = arr.filter(
        (message) => new Date(message.dateTime).toLocaleDateString() === currMessageDate
      )

      return [
        ...rest,
        {
          date: currMessageDate,
          messages: messagesByCurrMessDate
        }
      ]
    }, [])

    const createMessagesItems = (messages: DialogMessage[]) => {
      return messages.map(({ id, dateTime, message, sender, file }, idx) => {
        const nextMessSender = messages[idx + 1]?.sender
        const isntLastMessage = messages.length - 1 !== idx
        const time = new Date(dateTime).toLocaleTimeString().slice(0, 5)
        const fileExt = file?.slice(-3)
        const isFileImg = fileExt === 'png' || fileExt === 'jpg'

        return (
          <S.Message
            key={id}
            sender={sender}
            style={
              isntLastMessage
                ? {
                    marginBottom: nextMessSender === sender ? 5 : 20
                  }
                : {}
            }
          >
            <Typography>{message}</Typography>

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

    const createMessagesByDayItems = (messagesByDate: MessagesByDay[]) => {
      return messagesByDate.map(({ date, messages }) => {
        return (
          <Fragment key={date}>
            <S.MessagesDate>{date}</S.MessagesDate>

            {createMessagesItems(messages)}
          </Fragment>
        )
      })
    }

    return (
      <S.ChatMessagesContainer ref={ref}>
        <InfiniteScroll
          pageStart={1}
          loadMore={onLoadMore}
          hasMore={hasMoreMessages}
          useWindow={false}
          initialLoad={false}
          isReverse
        >
          <S.MessagesList>{createMessagesByDayItems(messagesSplitedByDay)}</S.MessagesList>
        </InfiniteScroll>
      </S.ChatMessagesContainer>
    )
  }
)
