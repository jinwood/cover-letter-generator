import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

async function returnError(message: String) {
  return NextResponse.json(
    {
      error: message,
    },
    { status: 500 }
  );
}

export async function GET(req: Request) {
  console.log("hello");
}

export async function POST(req: NextApiRequest) {
  console.log(process.env.API_KEY);
  const { body } = req;
  const { apiKey: tempKey, cv, jobDescription } = body;

  const apiKey = process.env.API_KEY ?? tempKey;

  if (!apiKey) {
    await returnError("No API key provided");
  }

  const configuration = new Configuration({
    apiKey,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createCompletion({
      model: "gpt-4-32k-0314",
      prompt: generatePrompt(cv, jobDescription),
      temperature: 0.6,
    });

    return NextResponse.json({
      result: completion.data.choices[0].text,
      status: 200,
    });
  } catch {}

  function generatePrompt(cv: string, jobDescription: string) {
    return `You are a highly skilled job seeker who wants to create an effective cover
          letter tailored to a specific job description. You have your CV and the 
          job description at hand. Write a compelling cover letter that highlights 
          your relevant skills and experiences, and demonstrates your enthusiasm 
          for the position. Remember to address the hiring manager, showcase your 
          achievements, and explain how your qualifications align with the requirements 
          of the job. Use a professional and engaging tone throughout the letter.
          CV: 
          ${cv}
          Job Description:
          ${jobDescription}`;
  }
}
