import { Request, Response, NextFunction } from 'express';
import fetchData from '../../lib/fetchData';
import { ImagesResponse } from 'openai/resources';

const AiImage = async (
  req: Request<{}, {}, { text: string }>,
  res: Response<{ response: string }>,
  next: NextFunction
) => {
  try {
    const { text } = req.body;

    const response = await fetchData<ImagesResponse>(
      process.env.OPENAI_API_URL + '/v1/images/generations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: text,
          n:1,
          model: 'dall-e-2',
           
        }),
      }
    );


    if (!response.data || !response.data[0].url) {
      throw new Error('No response from OpenAI');
    }

 
    res.json({ response: response.data[0].url });
  } catch (error) {

    next(error);
  }
};

export { AiImage };
