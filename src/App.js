import React, { useEffect, useState } from 'react'
import { connectWebSocket } from './WebSocket'
import Main from './Components/Main';
import CircularProgress from '@mui/joy/CircularProgress';

const App = () => {
  const [socketData, setSocketData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  
  useEffect(()=>{
    const getConnected = () =>{
      connectWebSocket(setSocketData, setIsConnected);
    }
    return getConnected;
  },[])
  return (
    <>
    {
      isConnected ? (
        <div>
          <Main socketData={socketData}/>
        </div>
      ): (
        <div className='flex text-2xl font-thin text-center h-screen items-center justify-center flex-col'>
          <div className='m-10'>
            Please Wait while we connect to the server
            </div>
          <>
          <CircularProgress
  determinate={false}
  size="lg"
  value={25}
  variant="plain"
/>
          </>
        </div>

      )
    }
    </>
  )
}

export default App
