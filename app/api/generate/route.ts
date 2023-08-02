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
  const { body } = req;

  /*
  console.log("in");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("out");
  return NextResponse.json({ success: true });
    */

  const rawData = await readFromStream(body);
  const { apiKey: tempKey, jobDescription, cv } = JSON.parse(rawData);

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
    const prompt = generateChatCompletionPrompt(cv, jobDescription);
    console.log("prompt", prompt);
    const completion = await openai.createChatCompletion({
      messages: prompt,
      model: "gpt-3.5-turbo",
      temperature: 0.6,
    });

    console.log("data", JSON.stringify(completion.data));
    console.log("message", completion.data.choices[0].message);

    return NextResponse.json({
      result: completion.data.choices[0].message,
      status: 200,
    });
  } catch (error: unknown) {
    console.error(`error occured ${error}`);
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
          of the job. Use a professional and engaging tone throughout the letter.

Job Description: ${jobDescription}
CV: ${cv}
`,
      },
    ];
  }
}

function readFromStream(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  return reader.read().then(function processText({ done, value }): any {
    if (done) {
      return Buffer.concat(chunks).toString("utf8");
    }

    if (value) {
      chunks.push(value);
    }

    return reader.read().then(processText);
  });
}
