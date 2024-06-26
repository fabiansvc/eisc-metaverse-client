import "./styles-voice.css";
import React, { useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { init } from '../../../../services/socket-voice.js';

/**
 * Component for controlling voice input/output.
 * @returns {JSX.Element} The JSX.Element containing the voice control button.
 */
const Voice = () => {
  const [isSpeaking, setIsSpeaking] = useState(false); // State to track if the user is speaking
  const [callPeers, setCallPeers] = useState(true); // State to track if peers should be called

  // Function to start speaking
  const speak = () => {
    setIsSpeaking(true);

    if (callPeers) {
      setCallPeers(false);
      init();
    }
  };

  // Function to stop speaking
  const stop = () => {
    setIsSpeaking(false);
  };

  return (
    <div className='button-speak'>
      {!isSpeaking ? (
        <button onClick={speak}>
          <FaMicrophoneSlash className='icon-speak' style={{ fontSize: '32px', color: 'black' }} />
        </button>
      ) : (
        <button onClick={stop}>
          <FaMicrophone className='icon-speak' style={{ fontSize: '32px', color: 'black' }} />
        </button>
      )}
    </div>
  );
};

export default Voice;
