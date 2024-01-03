import { describe, before, after, it } from "node:test";
import assert from "node:assert";

const BASE_URL = "http://localhost:3000";

describe("/login", () => {
  /** @type {import("node:http").Server} */
  let _server = {};
  let _globalToken = "";

  before(async () => {
    _server = (await import("./api.js")).app;
    await new Promise((resolve) => _server.once("listening", resolve));
  });

  after((done) => _server.close(done));

  it("should receive not authorized given wrong user and password", async () => {
    const data = {
      user: "eduardofernandes",
      password: "",
    };

    // fetch() ou biblioteca externa chamada supertest
    const request = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    assert.strictEqual(request.status, 401);

    const response = await request.json();

    assert.deepStrictEqual(response, { error: "user invalid" });
  });

  it("should login successfully given user and password", async () => {
    const data = {
      user: "eduardofernandes",
      password: "123",
    };

    const request = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    assert.strictEqual(request.status, 200);

    const response = await request.json();

    assert.ok(response.token, "JWT token should exist");
    _globalToken = response.token;
  });

  it("should not be allowed to access private data without a token", async () => {
    const request = await fetch(`${BASE_URL}/`, {
      method: "GET",
      headers: {
        authorization: "",
      },
    });

    assert.strictEqual(request.status, 400);

    const response = await request.json();

    assert.deepStrictEqual(response, { error: "invalid token!" });
  });

  it("should be allowed to access private data with a valid token", async () => {
    const request = await fetch(`${BASE_URL}/login`, {
      method: "GET",
      headers: { authorization: _globalToken },
    });

    assert.strictEqual(request.status, 200);

    const response = await request.json();

    assert.deepStrictEqual(response, { result: "Hey, Welcome!" });
  });

  it("should create a premium product", async () => {
    const input = {
      description: "pasta de dente",
      price: 101,
    };

    const request = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        authorization: _globalToken,
      },
    });

    assert.strictEqual(request.status, 200);

    const data = await request.json();

    assert.deepStrictEqual(data.category, "premium");
  });

  it("should create a regular product", async () => {
    const input = {
      description: "enxaguante bucal",
      price: 77,
    };

    const request = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        authorization: _globalToken,
      },
    });

    assert.strictEqual(request.status, 200);

    const data = await request.json();

    assert.deepStrictEqual(data.category, "regular");
  });

  it("should create a basic product", async () => {
    const input = {
      description: "escova de dente",
      price: 36,
    };

    const request = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        authorization: _globalToken,
      },
    });

    assert.strictEqual(request.status, 200);

    const data = await request.json();

    assert.deepStrictEqual(data.category, "basic");
  });
});
