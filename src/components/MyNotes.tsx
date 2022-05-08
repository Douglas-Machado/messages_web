import { api } from '../services/api'
import { FormEvent, useEffect, useState } from 'react'

import { Trash, PencilSimple} from 'phosphor-react'

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

  async function handleCreateMessage(e: FormEvent) {
    console.log(content.length)
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
    }catch(e: any){
      setError(e.response.data.error)
    }
    
  }

  function handleEdit(index: number){
    setTitle(messages[index].title)
    setContent(messages[index].content)
    setIndex(index)
    messagesArray[index] = {title, content}

    handleCreateMessage
  }

  async function handleDelete(index: number) {
    try{
      await api.delete('message', {
        data: {
          title: messages[index].title
        }
      })
    }catch(e: any){
      setError(e.response.data.error)
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
        className="py-4 text-center flex flex-col  bg-purple-700 sm:mx-auto w-3/6 p-3 rounded-[3px]">
        <h1 className="text-2xl text-cyan-300">My Notes</h1>
        {error ? (
          <span className='text-sm w-10/12 text-red-500'>{error}</span>
        ) : null}

        <div>
          <form
            onSubmit={e => handleCreateMessage(e)} 
            className='my-4 flex flex-col justify-center w-10/12 mx-auto text-zinc-900'>
            <input
              disabled={index !== -1}
              required
              spellCheck="true"
              value={title}
              placeholder='Título'
              onChange={e => setTitle(e.target.value)}
              className='rounded-md bg-zinc-900 border-[1px] pl-2
                border-zinc-500 text-zinc-100 placeholder:text-zinc-500'
              type="text"
            />
            <textarea
              maxLength={150}
              required
              spellCheck="true"
              value={content}
              onChange={e => setContent(e.target.value)}
              className="
                rounded-md text-sm resize-none min-h-[78px] p-2 my-2 scrollbar
              bg-zinc-900 border-[1px] border-zinc-500 text-zinc-100 placeholder:text-zinc-500 
              scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin 
              "
              placeholder='Digite a descrição da mensagem...'>
            </textarea>

            <button className="flex flex-1 justify-center items-center p-2 rounded-sm bg-blue-400">
              Submit
            </button>
          </form>
        </div>
      </header>
      <main 
        className="
          flex flex-col sm:mx-auto w-[51%] overflow-x-auto
          scrollbar scrollbar-thumb-zinc-700 scrollbar-thin
        "
      >
        <ul className="flex flex-col"
        >
          {messages.map((message, index) => {
            return(
              <li 
                key={message.title}  
                className="border-[5px] border-b-[1px] border-zinc-900 block rounded-[8px] bg-purple-700"
              >
                <div className='flex flex-row items-center justify-between'>
                  <span 
                    className="text-cyan-300 text-2xl py-1 pl-1 uppercase"
                  >{message.title}</span>
                  <div className='flex items-center'>
                    <button
                      type='submit'
                      onClick={() => handleEdit(index)}
                      title="Editar"
                    >
                      <PencilSimple 
                        color='#4dd0e1'
                        weight='bold'
                        className='w-5 h-5'
                      />
                    </button>
                    <button
                      type='submit'
                      onClick={() => handleDelete(index)}
                      title="Deletar"
                    >
                      <Trash
                        color='#4dd0e1'
                        weight='bold'
                        className='w-5 h-5'
                        />
                    </button>
                  </div>
                </div>
                <p 
                  className="text-black font-semibold text-left"
                  style={{
                    overflowWrap: 'break-word',
                  }}
                >
                  {message.content}
                </p>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}