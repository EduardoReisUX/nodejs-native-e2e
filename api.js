import { once } from "node:events";
import { createServer } from "node:http";

const DEFAULT_USER = {
  user: "eduardofernandes",
  password: "123",
};

/** @type {import("node:http").RequestListener} */
async function loginRoute(request, response) {
  const { user, password } = JSON.parse(await once(request, "data"));

  if (user !== DEFAULT_USER.user || password !== DEFAULT_USER.password) {
    response.writeHead(401);
    response.end(JSON.stringify({ error: "user invalid" }));
    return;
  }

  response.end("OK");
}

/** @type {RequestListener} */
async function handler(request, response) {
  if (request.url === "/login" && request.method === "POST") {
    return loginRoute(request, response);
  }

  response.end("hello world!");
}

export const app = createServer(handler).listen(3000, () =>
  console.log("listening at 3000")
);
