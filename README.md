# nkc-assignment
## Install
`yarn global add lerna`
`yarn install`
## Config
### Database
type: Postgres

host: localhost

username: postgres

password: postgres

database: postgres

or change database config in `packages/module-database/src/module-database.module.ts`

### Run
`yarn start:nkc`

backend: [http://localhost:8000/graphql]
frontend: [http://localhost:3000]
