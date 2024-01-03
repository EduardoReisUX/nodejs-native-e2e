# Testes e2e com Node (sem frameworks)

Testes end to end em uma Web API feita em JavaScript puro sem necessidade de qualquer framework ou biblioteca.

## Ferramentas

**Node@20.9.0**

## Como rodar

- `npm run dev`: sobe o servidor.
- `npm run test` ou `npm t`: sobe o servidor e roda os testes e2e.
- `npm run test:dev`: sobe o servidor e roda os testes e2e em watch mode.

## Aprendizagens

### npm e node cli

- `npm init -y`: inicializa um novo projeto
- `npm t`: roda os testes
- `node --watch [arquivo]`: roda o projeto e observa o arquivo se for modificado para atualzar.
- `node --test --watch [arquivo]`: roda os testes e observa se o arquivo for modificado para atualizar.

### curl

- `curl localhost:3000`: faz uma requisição direto do terminal

### node

- `createServer(handler)`: função nativa que cria um servidor com request e response. Todo o back end pode ser feito a partir do pacote `http` do próprio node.
- A função `fetch()` pode ser usada para fazer requisições no ambiente de testes e substituir a biblioteca `supertest`.
- A função `node:event.once()` é um listener que aguarda por um evento ser emitido. No exemplo `await once(request, "data")` diz o programa para esperar até que o evento "data" seja emitido pelo request. É equivalente a `request.on("data", (chunk) => { ... }`

### eslint

O javascript nativamente não possui uma análise de código, então é utilizado o pacote eslint para isso:

- `npx eslint .`: Faz a análise de todo o código do projeto, indicando erros e avisos (`no-unused-vars`, `no-undef`, ...).

## Erros corrigidos

### Tipagem de funções do tipo RequestListener

Ao fazer a tipagem de uma função (uma rota por exemplo) como `ResquestListener`: 

```javascript
import { createServer, RequestListener } from "node:http";

/** @type {RequestListener} */
async function handler(request, response) { 
    // ...
}
```

E subir o servidor, ocorre este erro:

```bash
import { createServer, RequestListener } from "node:http";
                         ^^^^^^^^^^^^^^^
SyntaxError: The requested module 'node:http' does not provide an export named 'RequestListener'
```

Para corrigi-lo, retire o `RequestListener` dos import: 

```javascript
import { createServer } from "node:http";

/** @type {import("node:http").RequestListener} */
async function handler(request, response) { 
    // ...
}
```

## Fontes: 

- [Como criar testes E2E em Node.js sem frameworks || passo a passo! || Erick Wendel](https://www.youtube.com/watch?v=xSDJnj-pgxU)
- [Ninguém deveria precisar de Postman/Insomnia pra testar um endpoint || Erick Wendel](https://www.youtube.com/watch?v=SrpIo_V-ZCg)
- [Node.js - events.once()](https://nodejs.org/api/events.html#eventsonceemitter-name-options)
- [Node.js - Anatomy of an HTTP Transaction](https://nodejs.org/en/guides/anatomy-of-an-http-transaction)