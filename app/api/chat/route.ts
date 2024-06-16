// ./app/api/chat/route.ts
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';


// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  
  const {  messages} = await req.json();

  
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [{ role: "system", content: `you are a professional interviewer. Ask the interviewee which subject he/she wants to interview for and also difficulty level.Then you will ask one question, user will answer it, judge it and give review of each answer by user and the total number of questions is 5, at the end of interview review the entire thing. It will be technical interview.` },
              { role: "assistant", content:"Are you ready"},
              {role:"user", content:"Hello"}, ...messages],
});
  
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
