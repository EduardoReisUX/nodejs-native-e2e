# Testes e2e com Node (sem frameworks)

Como fazer testes end to end em uma Web API feita em JavaScript sem necessidade de qualquer framework ou biblioteca.

## Ferramentas

Node@20.9.0

## Como rodar

`npm run test:dev`: sobe o servidor e roda os testes.

## Aprendizagens

### npm e node cli

- `npm init -y`: inicializa um novo projeto
- `npm t`: roda os testes
- `node --watch [arquivo]`: roda o projeto e observa o arquivo se for modificado para atualzar.
- `node --test --watch [arquivo]`: roda os testes e observa se o arquivo for modificado para atualizar.

### curl

- `curl localhost:3000`: faz uma requisição direto do terminal

### node

- `createServer(handler)`: função nativa que cria um servidor com request e response.
- A função `fetch()` pode ser usada substituindo a biblioteca `supertest`.