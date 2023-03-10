import React, {createContext, useContext, createRef, useEffect, useState}  from 'react'
import Array from './components/array.js'
import Buttons from './components/buttons.js'
import './style/app.scss'

const ARRAYLENGTH = 7;

function App() {

  const array = createRef();
  const [resizing, setResizing] = useState(false);

  useEffect(()=>{

    let timer;
    function SetResizingState() {
        if (timer) {
          clearTimeout(timer);
        }
        else {
          setResizing(true);
        }

        timer = setTimeout(() => {
            setResizing(false);
        }, 100);
    }

    window.addEventListener('resize', SetResizingState);

    // remove the event listener when component is unmounted
    return() =>  {
      window.removeEventListener('resize',SetResizingState);
    }
  },[])

  return (
    <>
      <header className='App-header'>
        <div className='visualization'>
          <Array ref={array} arraylength={ARRAYLENGTH}/>
          <Buttons resizing={resizing} aref={array} arraylength={ARRAYLENGTH}/>
        </div>
      </header>
    </>
  )
}

export default App