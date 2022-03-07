import supertest from "supertest";
import { expect } from "chai";

//code to create a supertest object
const request = supertest("https://gorest.co.in/public-api/");
// Api token
const TOKEN =
  "6227ab015bae139c4b7e9d1fb1ffc4738094990fe2e1dd65e8a177ccde0080df";
// Test to check if the api returns users
describe("Users", () => {
  it("GET/users", () => {
    return request.get(`users?access-token=${TOKEN}`).then((res) => {
      expect(res.body.data).to.not.be.empty;
    });
  });
  // Test to check for single user id
  it("GET/users/:id", () => {
    return request.get(`users/1?access-token=${TOKEN}`).then((res) => {
      expect(res.body.data.id).to.be.eq(1);
    });
  });
  //Test using params
  it("GET/users using query params", () => {
    const url = `users/1?access-token=${TOKEN}&page=5&gender=male&status=active`;
    return request.get(url).then((res) => {
      expect(res.body.data).to.not.be.empty;
      res.body.data.forEach((data) => {
        expect(data.gender).to.eq("Male");
        expect(data.status).to.eq("Active");
      });
    });
  });
});
