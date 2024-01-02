"use strict";

import { createServer } from "node:http";
import { loginRoute } from "./login/login.routes.js";
import { isHeadersValid } from "./login/utils.js";

/** @type {import("node:http").RequestListener} */
async function handler(request, response) {
  if (request.url === "/login" && request.method === "POST") {
    return loginRoute(request, response);
  }

  if (!isHeadersValid(request.headers)) {
    response.writeHead(400);
    return response.end(JSON.stringify({ error: "invalid token!" }));
  }

  response.end(JSON.stringify({ result: "Hey, Welcome!" }));
}

export const app = createServer(handler).listen(3000, () =>
  console.log("listening at 3000")
);
