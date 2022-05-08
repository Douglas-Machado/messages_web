import { FormEvent } from "react";

interface IFormProps {
  index: number;
  title: string;
  setTitle: (e: string) => void
  setContent: (e: string) => void
  content: string;
  handleCreateMessage: (e: FormEvent) => void
}

export function Form({ index, title, setTitle, setContent, content, handleCreateMessage }: IFormProps){
  return(
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
  )
}