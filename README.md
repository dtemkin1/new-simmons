# Simmons 2.0

![Simmons Hall Logo](http://simmons.mit.edu/img/logo.png)

A new frontend for Simmons Hall at MIT, created in Svelte.

## Tech Stack

**Client:** Svelte, SvelteKit, Skeleton UI, TailwindCSS

**Server:** PostgreSQL, Apache

## Run Locally

Clone the project

```bash
  git clone https://github.com/dtemkin1/new-simmons
```

Go to the project directory

```bash
  cd new-simmons
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Deployment

To create the production version of the app

```bash
  npm run build
```

Preview the production build

```bash
  npm run preview
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`POSTGRES_DB`

`POSTGRES_USERNAME`

`POSTGRESS_PASSWORD`

`POSTGRES_HOST`

`POSTGRES_PORT`

`AUTH_SECRET`

`AUTH_TRUST_HOST`

`AUTH_REDIRECT_PROXY_URL`

`CLIENT_ID`

`CLIENT_SECRET`

`PEOPLE_API_ID`

`PEOPLE_API_SECRET`

## Acknowledgements

- `dramage`, 2002; with `bonawitz`, `dheera`, `psaindon` for the creation of the original Simmons DB
- `advay`, 2006 for the creation of the GovTracker system
- `simmons-tech` for all the work done on the site

## Support

For support, please email <simmons-tech@mit.edu>.
