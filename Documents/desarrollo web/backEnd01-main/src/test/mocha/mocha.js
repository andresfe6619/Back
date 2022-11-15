import { expect } from "chai";
import supertest from "supertest";

let id;
let request;
let createdProd;
let updatedProd;
describe("test API", () => {
  before(() => {
    request = supertest("http://localhost:8080");
  });

  describe("-GET /productos/Listado", () => {
    it("should return 200", async () => {
      const response = await request.get("/api/productos/Listado");
      expect(response.status).to.eql(200);
    });
  });
  describe("-POST /productos/agregar", () => {
    const proof = {
      title: "varita magica",
      price: 1000,
      thumbnail: "https://",
      descrip: "con ella podras ser un poderoso hechicero",
      stock: 1,
      codigo: "900",
    };

    it("should return 200", async () => {
      const response = await request.post("/api/productos/agregar").send(proof);

      createdProd = response.body;

      expect(response.status).to.eql(200);

      id = createdProd._id;
    });
    it("it should be ok with the product model", () => {
      expect(createdProd).to.keys(
        "title",
        "price",
        "thumbnail",
        "descrip",
        "stock",
        "codigo",
        "_id",
        "__v"
      );
    });
    it("it should return created Prod", () => {
      expect(createdProd.title).to.eql(proof.title);
      expect(createdProd.price).to.eql(proof.price);
      expect(createdProd.thumbnail).to.eql(proof.thumbnail);
      expect(createdProd.descrip).to.eql(proof.descrip);
      expect(createdProd.stock).to.eql(proof.stock);
      expect(createdProd.codigo).to.eql(proof.codigo);
      expect(createdProd.id).to.eql(proof.id);
    });
    describe(`-PUT /api/productos/Listado/${id}`, () => {
      const proof = {
        title: "varita magica",
        price: 1000,
        thumbnail: "https://",
        descrip: "con ella podras ser un poderoso hechicero",
        stock: 1,
        codigo: "900",
      };

      it("Should return 200", async () => {
        const response = await request
          .put(`/api/productos/Listado/${id}`)
          .send(proof);

        updatedProd = response.body;
        expect(response.status).to.eql(200);
      });
      it("it should return the product updated", async () => {
        expect(updatedProd.title).to.eql(proof.title);
        expect(updatedProd.price).to.eql(proof.price);
        expect(updatedProd.thumbnail).to.eql(proof.thumbnail);
        expect(updatedProd.descrip).to.eql(proof.descrip);
        expect(updatedProd.stock).to.eql(proof.stock);
        expect(updatedProd.codigo).to.eql(proof.codigo);
        expect(updatedProd.id).to.eql(proof.id);
      });
    });
    describe(`-DELETE /api/productos/Listado/${id}`, async () => {
      it("it should return 200", async () => {
        const response = await request.delete(`/api/productos/Listado/${id}`);

        updatedProd = response.body;

        expect(response.status).to.eql(200);
      });
      it("it should return the deleted info", async () => {
        expect(id).to.eql(updatedProd._id);
      });
    });
  });
});
