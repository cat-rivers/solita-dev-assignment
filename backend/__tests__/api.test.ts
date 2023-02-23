import supertest from "supertest";
import { app } from "../src/api";

describe("api test", () => {
  const appFixture = supertest(app);
  it("GET /health", done => {
    appFixture.get("/health").expect("", done).end();
  });
});
afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.

  done();
});
