import { IncomingMessage, ServerResponse, createServer } from "node:http";

/**
 *
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */
async function handler(request, response) {
  response.end("hello world!");
}

export const app = createServer(handler).listen(3000, () =>
  console.log("listening at 3000")
);
