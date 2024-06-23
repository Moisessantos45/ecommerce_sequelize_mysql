import request from "supertest";
import app from "../../../server";

describe("POST /api/1.0/auth/login", () => {
  it("returns 200 ok when request is valid", async () => {
    const response = await request(app).post("/api/1.0/auth/login").send({
      correo: "moy@gmail.com",
      password: "moy123",
    });

    expect(response.status).toBe(200);
    expect(response.status).not.toBe(400);
    expect(response.body).toHaveProperty("idCliente");
  });
});

// describe("POST /api/1.0/auth/admin", () => {
//   it("returns 200 ok when request is valid", async () => {
//     const response = await request(app).post("/api/1.0/auth/logout");

//     expect(response.status).toBe(200);
//     expect(response.status).not.toBe(400);
//   });
// });
