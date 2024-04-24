# Schedule Ease App

A mobile app for scheduling meetings. Users can pick dates and times, add recipient emails and notes.

## Commands

Run the following command :

Install lib and packages

```sh
### node > 16 is required
npm install
```

Build shared package

```sh
cd packages/shared && npm run build
```

Start postgres database

```sh
docker-compose up -d
```

Push migrations to postgres database

```sh
cd apps/api && npm run migrate:push --workspace=api
```

go to root folder and run all apps

```sh
cd ../.. && npm run dev
```

After running apps update BASE_URL in this "apps/native/config/index.ts" with ip address provided by expo client

