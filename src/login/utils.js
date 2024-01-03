"use strict";

import JWT from "jsonwebtoken";

export const DEFAULT_USER = {
  user: "eduardofernandes",
  password: "123",
};

export const JWT_KEY = "abc123";

/** @param {import("node:http").IncomingHttpHeaders} headers */
export function isHeadersValid(headers) {
  try {
    const auth = headers.authorization.replace(/bearer\s/gi, "");
    JWT.verify(auth, JWT_KEY);

    return true;
  } catch (error) {
    return false;
  }
}
