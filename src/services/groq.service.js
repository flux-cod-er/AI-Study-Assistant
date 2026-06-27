import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateSummary = async (text) => {
  try {
    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an expert study assistant. Summarize study material in simple language and bullet points.",
          },
          {
            role: "user",
            content: `
Summarize the following study material in 5-7 bullet points:

${text}
            `,
          },
        ],

        model: "llama-3.3-70b-versatile",
      });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error("Groq Error:", error);
    throw error;
  }
};


//new function to generate detailed notes
export const generateDetailedNotes =
async (text) => {

  const completion =
    await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert study assistant.",
        },
        {
          role: "user",
          content: `
Create detailed study notes from the following content.

Rules:
- Use headings
- Use bullet points
- Explain important concepts
- Keep notes exam-oriented
- Make notes easy to revise

Content:

${text}
`,
        },
      ],

      model: "llama-3.3-70b-versatile",
    });

  return completion.choices[0].message.content;
};

//generate quiz function

export const generateQuiz =
async (text) => {

  const completion =
    await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert exam creator.",
        },
        {
          role: "user",
          content: `
Generate 2 multiple choice questions.

Rules:
- Each question must have 4 options
- Mention correct answer
- Questions should be exam-oriented
- Cover important concepts

Content:

${text}
`,
        },
      ],

      model: "llama-3.3-70b-versatile",
    });

  return completion.choices[0].message.content;
};


//new function to generate interview questions

export const generateInterviewQuestions =
async (text) => {

  const completion =
    await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a senior technical interviewer.",
        },
        {
          role: "user",
          content: `
Generate interview questions from the study material.

Requirements:


- 1 Advanced Questions

Focus on:
- Conceptual understanding
- Real interview questions
- Practical scenarios

Content:

${text}
`,
        },
      ],

      model: "llama-3.3-70b-versatile",
    });

  return completion.choices[0].message.content;
};

//new function to generate flashcards

export const generateFlashcards =
async (text) => {

  const completion =
    await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert study assistant.",
        },
        {
          role: "user",
          content: `
Create 1 flashcards.

Format:

Q: Question
A: Answer

Rules:
- Cover important concepts
- Keep answers concise
- Make them useful for revision

Content:

${text}
`,
        },
      ],

      model: "llama-3.3-70b-versatile",
    });

  return completion.choices[0].message.content;
};



