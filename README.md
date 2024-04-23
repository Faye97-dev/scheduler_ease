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

Start postgres databse

```sh
docker-compose up -d
```

Push migrations to postgres databse

```sh
cd apps/api && npm run migrate:push --workspace=api
```

Run apps

```sh
npm run dev
```

After running apps update BASE_URL in this apps/native/config/index.ts with Ip address provided by expo client

