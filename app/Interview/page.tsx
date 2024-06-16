'use client';
import { useEffect, useState, useRef } from "react";
import "regenerator-runtime/runtime";
import { useChat } from 'ai/react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
// ... (your existing imports)

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    data,
  } = useChat();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const textInputRef = useRef<HTMLInputElement>(null);

  const handleCopyClick = () => {
    if (textInputRef.current) {
      // Select the text inside the input field
      textInputRef.current.select();
      // Execute the copy command
      document.execCommand('copy');
      // Deselect the input field
      textInputRef.current.blur();
    
  };

    if (!browserSupportsSpeechRecognition) {
    return <span>Loading...</span>;
  }

  const Logout=()=> {
    localStorage.clear()
    window.location.reload()
  }

  const handleButtonClick = () => {
    SpeechRecognition.startListening();
  };

  return (
    <div className="flex flex-col mx-auto h-full stretch w-2/3 rounded-lg">
      {messages.length > 0 ? (
        messages.map((m) => (
          <div
            key={m.id}
            className={`whitespace-pre-wrap border  border-black ${
              m.role === 'user' ? 'bg-gray-400' : 'bg-gray-200'
            } p-3 font-semibold`}
          >
            {m.role === 'user' ? 'You: ' : 'AI: '}
            {m.content}
          </div>
        ))
      ) : null}

      <form onSubmit={handleSubmit} className="mb-12">
         
          <input
            className="w-full sticky  bottom-0 p-2 my-8 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        <div className="flex items-center justify-center gap-20">
          <p className="text-green-500">Microphone: {listening? "on":"off"}</p>
        
        <button onClick={handleButtonClick}><FontAwesomeIcon icon={faMicrophone} className="bg-green-400 p-2 rounded"/></button>
        <button onClick={SpeechRecognition.stopListening}><FontAwesomeIcon icon={faMicrophoneSlash} className="bg-green-400 rounded p-2"/></button>
        <button className="text-green-500" onClick={resetTranscript}>Reset</button>
        
        </div>
        {listening?(
          <div>
      <input className="text-black w-full border h-12 border-white my-6 rounded-lg" value={transcript} ref={textInputRef}/>
      <button className="flex mx-auto text-xl font-bold bg-green-500 rounded-lg px-6 py-2" onClick={handleCopyClick}>Copy</button>
      </div>)
      :null}</form>
      <div>
        <button className="bg-green-500 p-2 absolute top-4 right-4 rounded" onClick={Logout}>Logout</button></div>
    </div>
  );
}
}

