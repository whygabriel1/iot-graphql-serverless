# IoT GraphQL Serverless API

A minimal, production-ready **GraphQL API** for IoT device monitoring, built with:

- 🟦 **TypeScript** — end-to-end type safety
- 🚀 **Apollo Server v4** — modern GraphQL server
- 📐 **SOLID principles** — clean, extensible architecture

---

## Project Structure

```
iot-graphql-serverless/
├── src/
│   ├── server.ts                      # Entry point — bootstraps Apollo Server
│   ├── schema.ts                      # GraphQL SDL (type definitions)
│   ├── resolvers.ts                   # Query resolvers
│   ├── repositories/
│   │   └── device.repository.ts      # Data access layer (mock / swappable)
│   └── types/
│       └── device.types.ts           # Shared TypeScript domain types
├── package.json
├── tsconfig.json
└── README.md
```

---

## SOLID Architecture

| Principle | Where applied |
|-----------|--------------|
| **S**ingle Responsibility | Each file has one job: schema = SDL only, resolvers = mapping only, repository = data only |
| **O**pen/Closed | Add new queries without modifying existing resolvers |
| **L**iskov Substitution | Repository functions can be replaced with a DB implementation without touching resolvers |
| **I**nterface Segregation | `DeviceFilter` is a focused input type; not all fields are required |
| **D**ependency Inversion | `server.ts` depends on schema/resolver abstractions, not on data directly |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Static
- npm ≥ 9

### Install dependencies

```bash
npm install
```

### Run in development mode

```bash
npm run dev
```

The server will start at **http://localhost:4000** with Apollo Sandbox enabled.

### Build for production

```bash
npm run build
npm start
```

### Usando Docker (Recomendado)

Si tienes Docker instalado, puedes levantar el proyecto sin instalar dependencias localmente:

```bash
docker-compose up --build
```

El servidor estará disponible en **http://localhost:4000**.

---

## Example Queries

### List all devices

```graphql
query {
  devices {
    id
    name
    status
    temperature
    lastUpdated
  }
}
```

### Filter by status

```graphql
query {
  devices(filter: { status: ONLINE }) {
    id
    name
    temperature
  }
}
```

### Get a single device

```graphql
query {
  device(id: "2") {
    id
    name
    status
    temperature
    lastUpdated
  }
}
```

### Mutaciones (Control de Dispositivo)

```graphql
mutation {
  updateDevice(id: "1", status: WARNING, temperature: 45.5) {
    id
    name
    status
    temperature
    lastUpdated
  }
}
```

---

## Extending the API

To add a real database, create a new implementation of the repository interface in `src/repositories/` and update the import in `resolvers.ts`. No other files need to change.

---

## License

MIT
