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

      console.log(req.body);

      res.json({
        message: "Request successful!",
        data: {},
      });
    }
  );
};
