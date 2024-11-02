import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

export async function askOpenAI(prompt: string, systemPrompt?: string, isJson?: boolean): Promise<any> {
  try {
    const configService = new ConfigService();
    const openai = new OpenAI({
      apiKey: configService.get('OPENAI_API_KEY'),
    });

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt ?? "",
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-4o',
      //max_tokens: 300,
      ...(isJson && { response_format: { type: "json_object" } })
    });

    return completion.choices[0].message?.content;
  } catch (error) {
    console.log(error.message)
    throw new Error('Failed to get a response from OpenAI');
  }
}


export async function askOpenAI_Chunks(prompts: string[], isJson?: boolean): Promise<any> {
  try {
    const configService = new ConfigService();
    const openai = new OpenAI({
      apiKey: configService.get('OPENAI_API_KEY'),
    });

    const results = [];
    for (const prompt of prompts) {
      //const prompt = `Base64 decoded content chunk: ${chunk}`;
      
      // Call the OpenAI API for each chunk
      // const response = await this.openai.createCompletion({
      //   model: 'gpt-4',
      //   prompt: prompt,
      //   max_tokens: 500,  // Adjust the max tokens based on the chunk size
      // });

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'gpt-4o',
        //max_tokens: 300,
        ...(isJson && { response_format: { type: "json_object" } })
      });

      // Collect responses from each chunk
      results.push(completion.choices[0].message?.content);
    }

    return results;

  } catch (error) {
    console.log(error.message)
    throw new Error('Failed to get a response from OpenAI');
  }
}

/**
 * for calling openAI ; import askOpenAI method and provide a prompt e.g:
 *  const aiResponse = await askOpenAI(
        'list all common http status codes for API response. Response should be list-wise without introductory or closing sentences.',
      );
 */
