import request from "supertest";

import { dbConnect, dbDisconnect } from "../src/services/mongo.js";
import app from "../src/app";
import { comment, blogId } from "../src/data/comment.data.js";
import Comment from "../src/models/Comment.js";

describe("Comment API Test", () => {
  beforeAll(async () => {
    await dbConnect();
  });

  afterAll(async () => {
    await dbDisconnect();
  });

  test("It should post comment with Valid blog Id", async () => {
    const { body } = await request(app)
      .post(`/api/v1/blogs/${blogId.validId}/comments`)
      .send(comment.commentValid)
      .expect("Content-Type", /json/)
      .expect(201);
  });

  test("It should Not post comment with Invalid blog Id", async () => {
    const { body } = await request(app)
      .post(`/api/v1/blogs/${blogId.invalId}/comments`)
      .send(comment.commentValid)
      .expect(404);
  });
  test("It should Not post comment with Invalid blog data", async () => {
    const { body } = await request(app)
      .post(`/api/v1/blogs/${blogId.validId}/comments`)
      .send(comment.commentInvalid)
      .expect(400);
    // expect(body.message).toStrictEqual("Can't find blog with given Id");
  });
  test("It should return a 404 status code and 'Bad request' message when an error occurs when comment goes wrong", async () => {
    const mockQuerySave = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    Comment.prototype.save = mockQuerySave;

    const { body } = await request(app)
      .post(`/api/v1/blogs/${blogId.validId}/comments`)
      .send(comment.commentValid)
      .expect(404);
    expect(body.message).toStrictEqual("Bad request");
  });
});
