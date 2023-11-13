import './voice.css';
import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import { socket } from '../../../../components/Socket/SocketManager';
import { FaMicrophone } from 'react-icons/fa';
import {FaMicrophoneSlash} from 'react-icons/fa';

const Voice = () => {
  const [stream, setStream] = useState();
  const [incomingStream, setIncomingStream] = useState();
  const audioRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
      setStream(stream);

      socket.on('call-broadcast', (data) => {
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream
        });

        peer.signal(data.signal);

        peer.on('stream', (incomingStream) => {
          setIncomingStream(incomingStream);      
        });
      });
    });
  }, []);

  useEffect(() => {
    if (audioRef.current && incomingStream) {
      audioRef.current.srcObject = incomingStream;
      audioRef.current.play().catch(e => console.error("Error al reproducir el audio:", e));
    }
  }, [incomingStream]);

  const callAll = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    });

    peer.on('signal', (data) => {
      socket.emit('call', { signalData: data });
    });

    peer.on('stream', (incomingStream) => {
      setIncomingStream(incomingStream);
    });
  };

  return (
    <div className='button-speak'>
      <button onClick={callAll}>
        <FaMicrophone className='icon-speak' style={{ fontSize: '20px', color: 'white' }} />
      </button>
      <audio ref={audioRef} autoPlay playsInline/>
    </div>
  );
};

export default Voice;
