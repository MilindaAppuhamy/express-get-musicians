// install dependencies
const { execSync } = require("child_process");
execSync("npm run seed");

const request = require("supertest");
const app = require("./src/app");

describe("musicians endpoint", () => {
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

describe("bands endpoint", () => {
  it("should return all the bands", async () => {
    const res = await request(app).get("/bands");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(3);
  });

  it("should return a specific band when id is passed", async () => {
    const res = await request(app).get("/bands/2");
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toEqual(2);
  });

  it("should create a new band when POST method is called", async () => {
    const newBand = {
      name: "IDunno",
      genre: "Abc",
    };
    const res = await request(app).post("/bands").send(newBand);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(newBand.name);
    expect(res.body.genre).toEqual(newBand.genre);
  });

  it("should update a band when PUT method is called", async () => {
    const updatedBand = {
      name: "StillDunno",
      genre: "Abc",
    };
    const res = await request(app).put("/bands/4").send(updatedBand);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(updatedBand.name);
    expect(res.body.genre).toEqual(updatedBand.genre);
  });

  it("should delete a band when DELETE method is called", async () => {
    const res = await request(app).delete("/bands/4");
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual("StillDunno");
    expect(res.body.genre).toEqual("Abc");
  });
});
