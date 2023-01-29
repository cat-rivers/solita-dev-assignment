import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

const runApp = () => {
  app.listen(port, () =>
    console.log(`app super running on port ${port} :)`)
  );
};
export default runApp;
