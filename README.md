# Wildlife Trust of India Frontend

The frontend for Wildlife Trust of India database that tracks rescued animals.

## Requirements

- Node version 10

## Install and run the application

- Clone the repo into your required directory
- Navigate to the directory in a terminal
- You will need to generate certs for running locally.
  [Refer to this article](https://devcenter.heroku.com/articles/ssl-certificate-self).
  For now, we ship with a `cert` directory which has everything you need to get
  started.
- We ship a docker compose file for running mongodb. Simply from the repo root
  run `docker compose up -d`.
- Copy the `.env.sample` to `.env`.
- Run `npm install` in the terminal.
- Run `npm run devstart` from the terminal.
- The application will be running on port 4001. This can be changed in the .env
  (`BSPORT`) file.
- Default login is `admin@localhost.local` and password is `password`.

## Run the server independently without browsersync

- First build the assets by running `npm run build`.
- Now start the server `npm run start`.
- Make sure `HTTPS` is not set to `false` in `.env` and you have proper
  certificates installed.

## Creators

- **Joe Chapman** - [contemno82@gmail.com](mailto:contemno82@gmail.com)
- **Vibhuti Gupta** -
  [vibhutigupta@hotmail.com](mailto:vibhutigupta@hotmail.com)

## License

ISC
