import request from "supertest";
import app from "../../../server";

describe("POST /api/1.0/users/register", () => {
  it("returns 200 ok when request is valid", async () => {
    const response = await request(app).post("/api/1.0/users/register").send({
      typeUser: "vendedor",
      correo: "moy45@gmail.com",
      nameUser: "moy45",
      password: "moy123",
      avatar: "565yasgasjdyewtywef",
    });

    expect(response.status).toBe(200);
    expect(response.status).not.toBe(400);
  });
});

// describe("PUT /api/1.0/users/update/:idCliente", () => {
//   it("returns 200 ok when request is valid", async () => {
//     const response = await request(app).put("/api/1.0/users/update/1").send({
//       name: "user1",
//       email: "",
//     });
//     expect(response.status).toBe(200);
//     expect(response.status).not.toBe(400);
//   });
// });

// describe("DELETE /api/1.0/users/delete/:idCliente", () => {
//   it("returns 200 ok when request is valid", async () => {
//     const response = await request(app).delete("/api/1.0/users/delete/1");
//     expect(response.status).toBe(200);
//     expect(response.status).not.toBe(400);
//   });
// });
