# Clarim Diário

Aplicação React para o jornal Clarim Diário.

## Rodando em desenvolvimento

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

## Docker

Este projeto já está preparado para ser empacotado em container com Vite + Nginx.

### Build local da imagem do frontend

```bash
docker build -t clarim-diario-front .
```

### Rodar apenas o frontend

```bash
docker run --rm -p 5173:80 clarim-diario-front
```

A aplicação fica disponível em http://localhost:5173.

### Docker Compose do frontend isolado

```bash
docker compose up --build
```

### Docker Compose (frontend + backend)

No mesmo diretório do frontend, existe também o arquivo [docker-compose.full.yml](./docker-compose.full.yml). Ele sobe:

- backend Spring em http://localhost:8081 (o 8080 foi deixado livre para evitar conflitos locais)
- usa o PostgreSQL já instalado no Windows, o mesmo acessado pelo pgAdmin, em localhost:5432
- frontend em http://localhost:5173

```bash
docker compose -f docker-compose.full.yml up --build
```

O Compose usa `host.docker.internal` para a API alcançar o PostgreSQL do Windows. As credenciais são lidas do arquivo `.env` do backend, configurado em `docker-compose.full.yml`. O serviço PostgreSQL precisa estar ligado; o IntelliJ pode ficar fechado.

Para derrubar tudo:

```bash
docker compose -f docker-compose.full.yml down
```

## API

A API do backend já está dockerizada em outro repositório e é chamada pelo frontend em `http://localhost:8081`.
