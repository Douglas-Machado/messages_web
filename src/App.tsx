import { api } from './services/api'
import { Eraser, PencilSimple} from 'phosphor-react'
import { FormEvent, useEffect, useState } from 'react'

interface Message {
  title: string,
  content: string,
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [index, setIndex] = useState(-1)
  const [error, setError] = useState('')
  let messagesArray = messages

  useEffect(() =>{
    api.get<Message[]>('messages')
      .then(response => {
      setMessages(response.data)
      })
  }, [handleCreateMessage])

  async function handleCreateMessage(e: FormEvent) {
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

  async function handleEdit(index: number){
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
  }

  return (
    <div 
      className="sm:mx-auto h-screen sm:h-screen w-96 p-3 sm:rounded-md bg-opacity-70
         sm:border-[1px] border-zinc-500 bg-zinc-800 scrollbar
         scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin
      ">
      <header className="py-4 text-center flex flex-col items-center">
        <h1 className="text-2xl text-green-500">Mensagens</h1>
        {error ? (
          <span className='text-sm w-10/12 text-red-500'>{error}</span>
        ) : null}
      </header>


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
            required
            spellCheck="true"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="
              rounded-md text-sm resize-none min-h-[72px] p-2 my-2 scrollbar
            bg-zinc-900 border-[1px] border-zinc-500 text-zinc-100 placeholder:text-zinc-500 
            scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin 
            "
            placeholder='Digite a descrição da mensagem...'>
          </textarea>

          <button className="flex flex-1 justify-center items-center p-2 rounded-md bg-blue-400">
            Submit
          </button>
        </form>
        <ul className="flex gap-4 flex-col">
          {messages.map((message, index) => {
            return(
              <li className="text-center" key={message.title}>
                <div className=' ml-2 flex flex-row items-center justify-between'>
                <span className="text-[#000] text-2xl">{message.title}</span>
                <div className='flex items-center'>
                  <button
                    type='submit'
                    onClick={() => handleEdit(index)}
                    title="Editar"
                  >
                    <PencilSimple 
                      className='w-5 h-5'
                    />
                  </button>
                  <button
                    type='submit'
                    onClick={() => handleDelete(index)}
                    title="Deletar"
                  >
                    <Eraser
                      className='w-5 h-5'
                      />
                  </button>
                </div>
                </div>
                <p 
                  className="text-zinc-900 text-left min-h-[16px]"
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
      </div>
    </div>
  )
}

export default App
