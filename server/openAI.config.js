const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

exports.GPTFunction = async (text) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    temperature: 0.6,
    max_tokens: 250,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });
  return response.data.choices[0].text;
};
