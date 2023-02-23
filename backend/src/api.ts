import express from "express";
import { getClient } from "./db";

export const app = express();
const port = 3001;

app.use(async (req, res, next) => {
  console.log("before");
  (req as any)["db"] = await getClient();
  next();
});

app.get("/health", (req, res) => {
  res.send("");
});

app.get("/dogis", async (req: any, res) => {
  const response = await req.db.query("select * from dogis;");
  console.log(response.rows); // Hello world!

  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(response.rows[0]));
});

app.get("/journeys", async (req: any, res) => {
  /** parse query parameters as numbers from the url
   *  for example http://localhost:3000/journeys?pagesize=5&mindistance=1500
   *  results in pagesize:Number=5, if no number use 20 default
   */
  const pageSize = Number(req.query.pagesize) || 20;
  const page = Number(req.query.page) || 1;
  const mindistance = Number(req.query.mindistance) || 10;
  const offset = (page - 1) * pageSize;

  const response = await req.db.query(
    "select * from journeys where covered_distance_meters::integer > $1  limit $2 OFFSET $3;",
    [mindistance, pageSize, offset]
  );

  res.setHeader("content-type", "application/json");

  res.send(JSON.stringify(response.rows));
});

const runApp = () => {
  app.listen(port, () => console.log(`app super running on port ${port} :)`));
};
export default runApp;
