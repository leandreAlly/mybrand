import request from "supertest";

import { dbConnect, dbDisconnect } from "../src/services/mongo.js";
import app from "../src/app.js";
import { admin } from "../src/data/admin.data";
import { generateToken } from "../src/services/passport.js";

jest.setTimeout(30000);
beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
});
describe("Admin API Test", () => {
  test("It should not login with invalid email", async () => {
    const { body } = await request(app)
      .post("/api/v1/auth/login")
      .send(admin.invalidEmail)
      .expect(404);
    expect(body.message).toStrictEqual("Wrong credintial");
  });
  test("It should not login with invalid password", async () => {
    const { body } = await request(app)
      .post("/api/v1/auth/login")
      .send(admin.invalidPassword)
      .expect(401);
    expect(body.message).toStrictEqual("Incorect password or email..!");
  });
  test("It should login with valid data", async () => {
    const { body } = await request(app)
      .post("/api/v1/auth/login")
      .send(admin.valid)
      .expect(200);
    expect(body.message).toStrictEqual("Access granted..ertyy!");
  });
});
