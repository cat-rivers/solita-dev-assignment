import supertest from "supertest";
import { app } from "../src/api";

const appFixture = supertest(app);

describe("api test", () => {
  it("GET /hello-world", async () => {
    const res = await appFixture.get("/hello-world");
    expect(res.text).toEqual("hello world");
  });
});
