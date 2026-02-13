const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: contents,
    config:{
      systemInstruction:`you are an expert in image captioning.
      you generate single line caption for the given image.
      your caption should be engaging and should grab the attention of the reader.
      caption should be short and concise.
      you use hashtag and emojis in your caption.`
    }
  });
  
  return response.text;
}

module.exports = generateCaption;