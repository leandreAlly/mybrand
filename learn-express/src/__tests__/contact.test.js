import request from "supertest";

import { dbConnect, dbDisconnect } from "../services/mongo.js";
import app from "../app";
import { queries } from "../data/contact.data.js";
import { generateToken } from "../services/passport.js";

jest.setTimeout(10000);

const token = generateToken({
  name: "Ally",
  email: "Ally LEANDRE",
  _id: 123445,
});
describe("Contact Message API Test", () => {
  beforeAll(async () => {
    await dbConnect();
  });

  afterAll(async () => {
    await dbDisconnect();
  });

  test("It should not list queries without token.", async () => {
    const { body } = await request(app).get("/api/v1/contact").expect(401);
  });

  test("It should not create Query with no data", async () => {
    const { body } = await request(app)
      .post("/api/v1/contact")
      .send(queries.invalid)
      .expect("Content-Type", /json/)
      .expect(400);
    // expect(body.message).toStrictEqual("");
  });

  test("It should create Query with valid data", async () => {
    const { body } = await request(app)
      .post("/api/v1/contact")
      .send(queries.valid)
      .expect("Content-Type", /json/)
      .expect(201);
    // expect(body.message).toStrictEqual("");
  });

  test("It should list queries when token provided.", async () => {
    const { body } = await request(app)
      .get("/api/v1/contact")
      .set("Authorization", "Bearer " + token)
      .expect("Content-Type", /json/)
      .expect(200);
    // expect(body.message).toStrictEqual("");
  });
});
