// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const seedMusician = require("./seedData");

describe("./musicians endpoint", () => {
  it("should return all the musicians", async () => {
    const res = await request(app).get("/musicians");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(3);
  });

  it("should return a specific musician when id is passed", async () => {
    const res = await request(app).get("/musicians/2");
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toEqual(2);
  });
});
