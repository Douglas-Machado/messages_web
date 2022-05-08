import { Trash, PencilSimple} from 'phosphor-react'
import { IMessage } from './MyNotes'

interface IMessagesListProps {
  messages: IMessage[];
  handleEdit: (index: number) => void;
  handleDelete: (index: number) => void;
}

export function MessagesList({ messages, handleEdit, handleDelete }: IMessagesListProps){

  return(
    <main 
        className="
          flex flex-col sm:mx-auto w-[51%] overflow-x-auto
          scrollbar scrollbar-thumb-zinc-700 scrollbar-thin"
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
                  <div className='flex items-center pr-1'>
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
  )
}