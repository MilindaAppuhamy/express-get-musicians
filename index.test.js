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

  it("should create a new musician when POST method is called", async () => {
    const newMusician = {
      name: "Milo",
      instrument: "flute",
    };
    const res = await request(app).post("/musicians").send(newMusician);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(newMusician.name);
    expect(res.body.instrument).toEqual(newMusician.instrument);
  });

  it("should update a musician when PUT method is called", async () => {
    const newMusician = {
      name: "Harry",
      instrument: "flute",
    };
    const res = await request(app).put("/musicians/4").send(newMusician);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(newMusician.name);
    expect(res.body.instrument).toEqual(newMusician.instrument);
  });

  it("should delete a musician when DELETE method is called", async () => {
    const res = await request(app).delete("/musicians/4");
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual("Harry");
    expect(res.body.instrument).toEqual("flute");
  });
});
