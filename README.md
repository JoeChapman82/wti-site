# Wildlife Trust of India Frontend

The frontend for Wildlife Trust of India database that tracks rescued animals.

## Requirements

- Node version 10

## Install and run the application

- Clone the repo into your required directory
- Navigate to the directory in a terminal
- You will need to generate certs for running locally. [Refer to this article](https://devcenter.heroku.com/articles/ssl-certificate-self). For now, we ship with a `cert` directory which has everything you need to get started.
- We ship a docker compose file for running mongodb. Simply from the repo root run `docker compose up -d`.
- Copy the `.env.sample` to `.env`.
- Run `npm install` in the terminal. See if it works. If it does, exit it (`Ctrl` + `c`).
- Run `npm run devstart` from the terminal.
- The application will be running on port 4000. This can be changed in the .env file.
- Default login is `swashata@localhost.local` and password is `password`.

## Creators

- **Joe Chapman** - [contemno82@gmail.com](mailto:contemno82@gmail.com)
- **Vibhuti Gupta** - [vibhutigupta@hotmail.com](mailto:vibhutigupta@hotmail.com)

## License

ISC
