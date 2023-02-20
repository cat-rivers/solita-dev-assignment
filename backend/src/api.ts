import express from "express";
import { getClient } from "./db";

export const app = express();
const port = 3000;

app.use(async (req, res, next) => {
  console.log("before");
  (req as any)["db"] = await getClient();
  next();
});

app.get("/dogis", async (req: any, res) => {
  const response = await req.db.query("select * from dogis;");
  console.log(response.rows); // Hello world!

  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(response.rows[0]));
});

app.get("/journeys", async (req: any, res) => {
  const pageSize = Number(req.query.pagesize) || 20;
  const page = Number(req.query.page) || 1;
  const offset = (page - 1) * pageSize;
  const response = await req.db.query(
    "select * from journeys limit $1 OFFSET $2;",
    [pageSize, offset]
  );

  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(response.rows));
});

const runApp = () => {
  app.listen(port, () => console.log(`app super running on port ${port} :)`));
};
export default runApp;
