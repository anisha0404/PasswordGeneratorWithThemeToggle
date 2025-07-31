import './App.css'
import  { useState, useCallback, useEffect, useRef } from 'react';

function App() {
const [length,setLength] = useState(8);
const [numbers,setNumbers] = useState(false);
const [characters,setCharacters] = useState(false);
const [password,setPassword] = useState('');
const [copied, setCopied] = useState(false);
const [theme, setTheme] = useState('dark'); 
const passwordRef=useRef(null);

const passwordgenerator = useCallback(()=>{
  let pass='';
  let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  if (numbers) str += '0123456789';
  if (characters) str += '!@#$%^&*()_+[]{}/-=`~';
  for (let i = 1; i <=length; i++) 
    {
      let char=Math.random() * str.length+1;
      char=Math.floor(char);
      pass += str.charAt(char);
    }
  setPassword(pass);

},[length,numbers,characters,setPassword]);/*use for opimisation to avoid unnecessary re-renders*/


const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password)
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);

},[password]);

const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };


const bgClass = theme === 'dark' ? 'bg-gray-800 text-orange-500' : 'bg-white text-black';
  const inputBg = theme === 'dark' ? 'bg-gray-500 text-white' : 'bg-gray-100 text-black';


useEffect(() => { passwordgenerator()}, [length, numbers, characters, passwordgenerator]);





  return (
    
    <div className={`relative w-full max-w-xl mx-auto shadow-md rounded-xl px-10 py-5 my-8 text-2xl ${bgClass}`}>
    
    <div className='flex justify-start mb-4'>
          <button
            onClick={toggleTheme}
            className='text-sm px-4 py-1 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-all'
          >
            {theme === 'dark' ? 'Switch to Light 🌞' : 'Switch to Dark 🌙'}
          </button>
        </div>
      <div className='w-full max-w-xl  mx-auto shadow-md rounded-xl px-10 py-5 my-8 mx-150 text-2xl text-orange-500 bg-gray-800 '>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
          value={password}
          className='outline-none w-full py-2 px-3 text-white bg-gray-500' 
          placeholder='password'
          readOnly
          ref={passwordRef}/>

          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>COPY</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-5'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-2 my-2 '>
            <input type="checkbox" defaultChecked={characters} id="charinput" onChange={()=>{setCharacters((prev)=>!prev)}} />
            <label>Characters</label>
          </div>
          <div className='flex items-center gap-x-5'>
            <input type="checkbox" defaultChecked={numbers} id="numInput" onChange={()=>{setNumbers((prev)=>!prev)}} />
            <label>Numbers</label>
          </div>
        </div>



        {copied && (
          <div className='absolute top-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md text-sm animate-bounce'>
            Copied to clipboard!
          </div>
        )}


      </div>
      
    </div>
  )
}

export default App
