import { api } from '../services/api'
import { FormEvent, useEffect, useState } from 'react'

import { MessagesList } from './MessagesList'
import { Form } from './Form'

export interface IMessage {
  title: string,
  content: string,
}

export function MyNotes(){
  const [messages, setMessages] = useState<IMessage[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [index, setIndex] = useState(-1)
  const [error, setError] = useState('')
  let messagesArray = messages

  useEffect(() =>{
    api.get('messages')
      .then(response => {
      setMessages(response.data)
      })
  }, [handleCreateMessage])

  async function handleCreateMessage(e: FormEvent){
    e.preventDefault()
    
    try{
      if(index === -1){
        await api.post('messages', {
         title: title,
         content: content
        })
        clear()
      } else {
        await api.put('message', {
          title: title,
          content: content
        })
        .then(response => {
          messagesArray[index] = response.data 
          setMessages(messagesArray)
        })
        clear()
      }
    }catch(error: any){
      setError(error.response.data.error)
    }
    
  }

  function clear(){
    setTitle('')
    setContent('')
    setError('')
    setIndex(-1)
  }

  return(
    <div 
      className="
      ">
      <header 
        className="py-4 text-center flex flex-col  bg-purple-700 sm:mx-auto w-2/6 p-3 rounded-[3px]">
        <h1 className="text-2xl text-cyan-300">My Notes</h1>
        {error ? (
          <span className='text-sm w-10/12 text-red-500'>{error}</span>
        ) : null}

        <div>
          <Form
            index={index}
            title={title}
            setTitle={setTitle}
            setContent={setContent}
            content={content}
            handleCreateMessage={handleCreateMessage}
          />
        </div>
      </header>
      <MessagesList 
        messages={messages}
        setTitle={setTitle}
        setContent={setContent}
        setIndex={setIndex}
        messagesArray={messagesArray}
        title={title}
        content={content}
        handleCreateMessage={handleCreateMessage}
      />
    </div>
  )
}