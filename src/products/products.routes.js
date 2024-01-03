import { once } from "node:events";

/** @type {import("node:http").RequestListener} */
export async function createProductRoute(request, response) {
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

  response.end(JSON.stringify({ description, price, category }));
}
