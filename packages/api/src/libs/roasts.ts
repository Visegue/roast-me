import OpenAI from "openai";

const openai = new OpenAI({
  // TODO: use constructed env instead
  apiKey: process.env.OPENAI_CLIENT_TOKEN ?? "",
});
  
export type RoastLevel  = 'Nice' | 'Borderline' | 'Ruthless';

const prompts: { [key in RoastLevel]: string } = {
  Nice: "Deliver a one-sentence roast for the individual in the provided image, focusing primarily on one characteristic at a time without positive reinforcement. Let the sarcasm flow freely.",
  Borderline:
    "Generate a one-sentence roast with an edge for the person in the provided image, focusing primarily on one characteristic at a time without positive reinforcement. Keep it within respectful limits.",
  Ruthless:
    "Unleash a one-sentence, no-holds-barred roast for the individual in the provided image, going all out with ruthless humor, focusing primarily on one characteristic at a time. Make it scorching, pitiless, and merciless.",
};

export const getRoast = async (level: RoastLevel = "Nice", imageData: string) => {
  const result = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompts[level] },
          {
            type: "image_url",
            image_url: {
              url: `${imageData}`,
            },
          },
        ],
      },
    ],
  });

  console.log('Roast usage cost', result.usage)

  return result.choices[0]?.message.content;
};
