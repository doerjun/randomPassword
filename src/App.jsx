import { useCallback, useEffect, useState,useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const[password,setPassword]=useState('');
  const[numbersAllowed,setNumbersAllowed]=useState(false);
  const[charsAllowed,setCharsAllowed]=useState(false);
  //ref hook
  const passwordRef=useRef(null);
  const randomPasswordGenerator=useCallback(()=>{
    let pass='';
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let num='0123456789';
    let char='!@#$%^&*';
    if(numbersAllowed)str+=num;
    if(charsAllowed)str+=char;
    for(let i=0;i<=length;i++){

      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char)
      
    }
    setPassword(pass)
  },[length,numbersAllowed,charsAllowed,setPassword])
  const copyPasswordClip=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(password)

  },[password])
  //randomPasswordGenerator(); too many re-renders happening so react limits the number of renders to limit the loop
  useEffect(()=>{
   randomPasswordGenerator()

  },[length,numbersAllowed,charsAllowed,randomPasswordGenerator])


  return (
    <>
    <div className='w-full mx-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-600'>
      <h1 className='text-white text-center text-4xl my-3 '>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type='text'
      value={password}
      placeholder='set password'
      className='outline-none w-full py-1 px-3'
      readOnly
      ref={passwordRef}/>
      <button onClick={copyPasswordClip} className='outline-none bg-blue-700  px-3 py-0.5  shrink-0'>copy</button>
   </div>
   <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input type='range' min={8}  value={length} max={20} 
      className='cursor-pointer'
      onChange={(e)=>{setLength(e.target.value)}}/>
      <label>Numbers:{length}</label>
       </div>
       <input type='checkbox'defaultChecked={numbersAllowed}
       onChange={()=>{setNumbersAllowed((prev)=>!prev)}}/>
       <label>Numbers</label>
       <input type='checkbox' defaultChecked={charsAllowed}
       onChange={()=>{setCharsAllowed((prev)=>!prev)}}/>
       <label>Characters</label>
   </div>
    </div>
    </>
  )
}

export default App
