const { GPTFunction } = require("./openAI.config");

let database = [];

module.exports = (app, upload) => {
  app.post(
    "/resume/create",
    upload.single("headshotImage"),
    async (req, res) => {
      const {
        firtsName,
        lastName,
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory,
      } = req.body;

      const workArray = JSON.parse(workHistory); //an array

      //👇🏻 group the values into an object
      const newEntry = {
        id:
          new Date().getTime().toString(36) +
          Math.random().toString(36).slice(2),
        firtsName,
        lastName,
        image_url: `http://localhost:4000/uploads/${req.file.filename}`,
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory: workArray,
      };

      //👇🏻 loops through the items in the workArray and converts them to a string
      const remainderText = () => {
        let stringText = "";
        for (let i = 0; i < workArray.length; i++) {
          stringText += ` ${workArray[i].name} as a ${workArray[i].position}.`;
        }
        return stringText;
      };
      //👇🏻 The job description prompt
      const prompt1 = `I am writing a resume, my details are \n name: ${
        firtsName + " " + lastName
      } \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write a 100 words description for the top of the resume(first person writing)?`;
      //👇🏻 The job responsibilities prompt
      const prompt2 = `I am writing a resume, my details are \n name: ${
        firtsName + " " + lastName
      } \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write 10 points for a resume on what I am good at?`;
      //👇🏻 The job achievements prompt
      const prompt3 = `I am writing a resume, my details are \n name: ${
        firtsName + " " + lastName
      } \n role: ${currentPosition} (${currentLength} years). \n During my years I worked at ${
        workArray.length
      } companies. ${remainderText()} \n Can you write me 50 words for each company seperated in numbers of my succession in the company (in first person)?`;

      //👇🏻 generate a GPT-3 result
      const objective = await GPTFunction(prompt1);
      const keypoints = await GPTFunction(prompt2);
      const jobResponsibilities = await GPTFunction(prompt3);
      //👇🏻 put them into an object
      const chatgptData = { objective, keypoints, jobResponsibilities };
      //👇🏻log the result
      const data = { ...newEntry, ...chatgptData };
      database.push(data);

      res.json({
        message: "Request successful!",
        data,
      });
    }
  );
};
