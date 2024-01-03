"use strict";

import { createServer } from "node:http";
import { loginRoute } from "./login/login.routes.js";
import { isHeadersValid } from "./login/utils.js";
import { once } from "node:events";

/** @type {import("node:http").RequestListener} */
async function createProductRoute(request, response) {
  /** @type {{ description: string, price: string }}  */
  const { description, price } = JSON.parse(await once(request, "data"));

  const categories = {
    basic: {
      from: 0,
      to: 49,
    },
    regular: {
      from: 50,
      to: 99,
    },
    premium: {
      from: 100,
      to: 101,
    },
  };

  const category = Object.keys(categories).find((key) => {
    const category = categories[key];
    return price >= category.from && price <= category.to;
  });

  response.end(JSON.stringify({ category }));
}

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
