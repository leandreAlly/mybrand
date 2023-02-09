import request from "supertest";

import { dbConnect, dbDisconnect } from "../services/mongo.js";
import app from "../app";
import { blog } from "../data/blog.data.js";
import { generateToken } from "../services/passport.js";

jest.setTimeout(30000);

const token = generateToken({
  name: "Ally",
  email: "Ally LEANDRE",
  _id: 123445,
});
let blogId = "63e099ce1c0f7730d651bd04";
let invalidId = "63e07cffc653376c89c655";

describe("Blog API Test", () => {
  beforeAll(async () => {
    await dbConnect();
  });

  afterAll(async () => {
    await dbDisconnect();
  });
  describe("Test API entry point", () => {
    test("It should return 200 status and message", async () => {
      const { body } = await request(app)
        .get("/")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(body.message).toStrictEqual("My Blog Api");
    });
  });

  test("It should create Blog with valid data", async (done) => {
    const response = await request(app)
      .post("/api/v1/blogs")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/x-www-form-urlencoded")
      .field("blogTitle", blog.valid.blogTitle)
      .field("blogContent", blog.valid.blogContent)
      //   .attach("picture", "../data/image.jpg")
      .expect(201);

    // console.log(response.body);
  });
  test("It should list Blogs.", async () => {
    const { body } = await request(app)
      .get("/api/v1/blogs")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  test("It should list single blog with valid blog_ID.", async () => {
    const { body } = await request(app)
      .get(`/api/v1/blogs/${blogId}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  test("It should Not  list single blog with Invalid blog_ID.", async () => {
    const { body } = await request(app)
      .get(`/api/v1/blogs/${invalidId}`)
      .expect("Content-Type", /json/)
      .expect(404);
    expect(body.message).toStrictEqual("Something went wrong..!");
  });
  test("It should Not delete blog with Invalid ID.", async () => {
    const { body } = await request(app)
      .delete(`/api/v1/blogs/${invalidId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(404);
    expect(body.message).toStrictEqual("Post doesn't exist!");
  });
  test("It should delete blog with valid ID.", async () => {
    const { body } = await request(app)
      .delete(`/api/v1/blogs/${blogId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(body.message).toStrictEqual("blog deleted");
  });
});
