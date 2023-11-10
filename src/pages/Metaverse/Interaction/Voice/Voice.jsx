import Peer from 'simple-peer';
import { avatarsAtom, socket } from '../../../Components/Socket/SocketManager';
import { useRef, useEffect, useState } from 'react';
import './voice.css';
import { useAtom } from 'jotai';
import { FaMicrophone } from "react-icons/fa6";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { TbHeadphonesFilled } from "react-icons/tb";
import { TbHeadphonesOff } from "react-icons/tb";

const Voice = () => {
  const [avatars] = useAtom(avatarsAtom);
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    socket.on('hey', (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  function callPeer() {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data) => {
      socket.emit('callUser', { signalData: data });
    });

    peer.on('stream', (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("acceptCall", { signal: data, to: caller })
    })

    peer.on('stream', (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <audio playsInline ref={partnerVideo} autoPlay />
    );
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div className='button-listen'>
        <button onClick={acceptCall}>
          <TbHeadphonesFilled className='icon-listen' />
        </button>
      </div>
    )
  }

  return (
    <div>
      {PartnerVideo}
      <div className='button-speak'>
        <button onClick={() => callPeer()}>
          <FaMicrophone className='icon-speak' />
        </button>
      </div>
      {incomingCall}
    </div>
  );
};

export default Voice;