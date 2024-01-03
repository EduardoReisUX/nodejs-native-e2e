"use strict";

import { createServer } from "node:http";
import { loginRoute } from "./src/login/login.routes.js";
import { isHeadersValid } from "./src/login/utils.js";
import { createProductRoute } from "./src/products/products.routes.js";

/** @type {import("node:http").RequestListener} */
async function handler(request, response) {
  if (request.url === "/login" && request.method === "POST") {
    return loginRoute(request, response);
  }

  if (!isHeadersValid(request.headers)) {
    response.writeHead(400);
    return response.end(JSON.stringify({ error: "invalid token!" }));
  }

  if (request.url === "/products" && request.method === "POST") {
    return createProductRoute(request, response);
  }

  response.end(JSON.stringify({ result: "Hey, Welcome!" }));
}

export const app = createServer(handler).listen(3000, () =>
  console.log("listening at 3000")
);
