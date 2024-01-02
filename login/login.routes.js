"use strict";

import { once } from "node:events";
import JWT from "jsonwebtoken";
import { DEFAULT_USER, JWT_KEY } from "./utils.js";

/** @type {import("node:http").RequestListener} */
export async function loginRoute(request, response) {
  const { user, password } = JSON.parse(await once(request, "data"));

  if (user !== DEFAULT_USER.user || password !== DEFAULT_USER.password) {
    response.writeHead(401);
    response.end(JSON.stringify({ error: "user invalid" }));
    return;
  }

  const token = JWT.sign({ user, message: "hey duuude!" }, JWT_KEY);

  response.end(JSON.stringify({ token }));
}
