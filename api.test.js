import { IncomingMessage, ServerResponse, Server } from "node:http";
import { describe, before, after, it } from "node:test";
import assert from "node:assert";

const BASE_URL = "http://localhost:3000";

describe("Login API", () => {
  /** @type {Server<typeof IncomingMessage, typeof ServerResponse>} */
  let _server = {};

  // Antes de rodar os testes, inicializar o servidor.
  // Neste caso está sendo utilizado dynamic import.
  // Os testes só conseguirão rodar depois da API estar rodando (listening).
  before(async () => {
    _server = (await import("./api.js")).app;
    await new Promise((resolve) => _server.once("listening", resolve));
  });

  // Por causa do live reloading, temos que derrubar o servidor para subí-lo
  // novamente com as novas alterações.
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
});
