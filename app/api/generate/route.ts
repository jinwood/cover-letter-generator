import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";

async function returnError(message: String) {
  return NextResponse.json(
    {
      error: message,
    },
    { status: 500 }
  );
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
    console.log(`inside try ${apiKey}`);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: generateChatCompletionPrompt(cv, jobDescription),
      temperature: 0.6,
    });

    console.log(JSON.stringify(completion.data));
    console.log(completion.data.choices[0].message);

    return NextResponse.json({
      result: completion.data.choices[0].message,
      status: 200,
    });
  } catch (error: unknown) {
    console.error(`error occured ${error}`);
  }

  function generateCompletionPrompt(cv: string, jobDescription: string) {
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

  function generateChatCompletionPrompt(cv: string, jobDescription: string) {
    return [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: `You are a highly skilled cover letter author who wants to create an effective cover
          letters for users, tailored to a specific job description. The user will provide the  
          job description and CV in the following two messages. Write a compelling cover letter that highlights 
          their relevant skills and experiences, and demonstrates their enthusiasm 
          for the position. Remember to address the hiring manager, showcase their 
          achievements, and explain how their qualifications align with the requirements 
          of the job. Use a professional and engaging tone throughout the letter.`,
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `Job Description: ${jobDescription}`,
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `CV: ${cv}`,
      },
    ];
  }
}
