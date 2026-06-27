import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

try {

  console.log("Before Groq");

  const completion =
    await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "What is Node.js?",
        },
      ],

      model: "llama-3.3-70b-versatile",
    });

  console.log("After Groq");

  console.log(
    completion.choices[0].message.content
  );

} catch (error) {

  console.log("ERROR:");

  console.log(error);

}