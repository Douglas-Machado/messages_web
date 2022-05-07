import { api } from './services/api'

import { Eraser, PencilSimple, Plus } from 'phosphor-react'
import { useEffect, useState } from 'react'

type Message = {
  title: string,
  content: string,
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() =>{
    api.get<Message[]>('messages')
      .then(response => {
      setMessages(response.data)
      })
  }, [])

  function handleCreateMessage() {
   
  }

  function handleEdit(){

  }

  function handleDelete() {
    console.log("oi")
  }


  return (
    <div className="my-0 mx-auto max-h-[800px] w-96 p-3 
      bg-[#192627] border-2 border-[#4ad9b0] rounded-md mt-6">
      <header className="ml-[37%] flex items-center justify-between py-4">
        <h1 className="text-lg text-[#4ad9b0]">Mensagens</h1>
        <span title='Adicionar mensagem'>
          <button
            onClick={handleCreateMessage}
          >
          <Plus 
            className='cursor-pointer w-5 h-5'
          />
          </button>
        </span>
      </header>

      <div>
        <form className='my-4 flex flex-col justify-center w-10/12 mx-auto text-zinc-900'>
          <input 
            className='my-2 rounded-sm'
            type="text"/>
          <textarea className='rounded-sm text-sm resize-none min-h-[72px]'></textarea>
        </form>
        <ul className="flex gap-4 flex-col">
          {messages.map(message => {
            return(
              <li className="text-center" key={message.title}>
                <div className=' ml-2 flex flex-row items-center justify-between'>
                <span className="text-[#addccf] text-2xl">{message.title}</span>
                <div className='flex items-center'>
                  <button
                    type='submit'
                    onClick={handleEdit}
                    title="Editar"
                  >
                    <PencilSimple 
                      className='cursor-pointer w-5 h-5'
                    />
                  </button>
                  <button
                    type='submit'
                    onClick={handleDelete}
                    title="Deletar"
                  >
                    <Eraser
                      className='cursor-pointer w-5 h-5'
                      />
                  </button>
                </div>
                </div>
                <p 
                  className="text-left min-h-[16px]"
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
