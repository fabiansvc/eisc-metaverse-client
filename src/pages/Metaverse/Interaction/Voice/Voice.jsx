import './voice.css';
import React, { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { FaMicrophoneSlash } from 'react-icons/fa';
import { init, disableOutgoingStream, enableOutgoingStream } from '../../../../voice/voice';

const Voice = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callPeers, setCallPeers] = useState(true);
  const speak = () => {
    setIsSpeaking(true);

    if(callPeers){
      setCallPeers(false)
      init()
    }else{
      enableOutgoingStream()
    }
    
  }
  const stop = () => {
    setIsSpeaking(false);
    disableOutgoingStream()
  }
  return (
    <div className='button-speak'>
      {!isSpeaking ?
        <button onClick={speak} >
          <FaMicrophoneSlash className='icon-speak' style={{ fontSize: '32px', color: 'black' }} />
        </button>
        :
        <button onClick={stop} >
          <FaMicrophone className='icon-speak' style={{ fontSize: '32px', color: 'black' }} />
        </button>
      }
    </div>
  );
};

export default Voice;
