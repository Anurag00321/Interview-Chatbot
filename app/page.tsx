'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat();
  return (
    <div className="flex flex-col w-full mx-auto stretch">
      {messages.length > 0
        ? messages.map(m => (
            <div key={m.id} className={`whitespace-pre-wrap border border-black ${m.role === 'user' ? 'bg-gray-400' : 'bg-gray-200'} p-3`}>
              {m.role === 'user' ? 'User: ' : 'AI: '}
              {m.content}
            </div>
          ))
        : null}

      <form onSubmit={handleSubmit}>
        <input
          className="w-full fixed bottom-0 p-2 my-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
