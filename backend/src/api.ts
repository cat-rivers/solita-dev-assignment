import express from "express";
export const app = express();
const port = 3000;

app.get("/hello-world", (req, res) => {
  res.send("hello world");
});

const runApp = () => {
  app.listen(port, () =>
    console.log(`app super running on port ${port} :)`)
  );
};
export default runApp;
