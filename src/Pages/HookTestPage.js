import React from 'react'
import useLocalStorage from '../Hooks/userLocalStorage';
import useUpdateLogger from '../Hooks/useUpdateLogger';

export default function HookTestPage() {
  const [name, setName] = useLocalStorage('name', () => '')
  useUpdateLogger(name)

  return (
    <>
    <a>Dynamically stores text in local storage and provides a logger on each update.</a>
    <br></br>
    <input type="text" value={name} onChange={e => setName(e.target.value)}/>
    </>
  )
}
