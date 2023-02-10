import request from "supertest";
import path from "path";

import { dbConnect, dbDisconnect } from "../src/services/mongo.js";
import app from "../src/app.js";
import { blog, blogId } from "../src/data/blog.data.js";
import { generateToken } from "../src/services/passport.js";

jest.setTimeout(60000);

const token = generateToken({
  name: "Ally",
  email: "Ally LEANDRE",
  _id: 123445,
});
let uploadedPost;

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

  test("It should create Blog with valid data", async () => {
    const { body } = await request(app)
      .post("/api/v1/blogs")
      .set("Authorization", `Bearer ${token}`)
      .field("blogTitle", blog.valid.blogTitle)
      .field("blogContent", blog.valid.blogContent)
      .attach("picture", path.resolve(__dirname, "../src/data/image.jpg"))
      .expect(201);

    uploadedPost = body.posts._id;
  });

  test("It should list Blogs.", async () => {
    const { body } = await request(app)
      .get("/api/v1/blogs")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  test("It should list single blog with valid blog_ID.", async () => {
    const { body } = await request(app)
      .get(`/api/v1/blogs/${blogId.validId}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  test("It should Not  list single blog with Invalid blog_ID.", async () => {
    const { body } = await request(app)
      .get(`/api/v1/blogs/${blogId.invalId}`)
      .expect("Content-Type", /json/)
      .expect(404);
    expect(body.message).toStrictEqual("Something went wrong..!");
  });
  test("It should Not delete blog with Invalid ID.", async () => {
    const { body } = await request(app)
      .delete(`/api/v1/blogs/${blogId.invalId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(404);
    expect(body.message).toStrictEqual("Post doesn't exist!");
  });
  test("It should delete blog with valid ID.", async () => {
    const { body } = await request(app)
      .delete(`/api/v1/blogs/${uploadedPost}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(body.message).toStrictEqual("blog deleted");
  });
});
