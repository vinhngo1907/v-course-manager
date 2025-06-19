# V Courses Manager

## Introduction

The "MERN stack" consists of:

- **Postgres** as the database
- **Prisma** as the type orm
- **Nestjs** to build the backend API
- **Nextjs** to build the Admin CMS
- **React** to build the web browser UI
- **Node.js** to run the web server in general
- **UI/UX** https://www.figma.com/community/file/978217394826446327/v-course-storage

In addition to the above tools, this project also uses

- [Material UI](www.mui.com "Visit MUI.com") React component library to obtain
  reasonable looking extensible visual components
- JSON Web Tokens for auth session handling
- React-Redux to manage application state

## Requirements

Node.js, Docker and Yarn should be installed.

## Quick start

The service can be locally set up with GNU Make

  - `make install` 
  - `make up -j2`: Sets up the application at `http:localhost:8000`. Note that
    we start two processes, one for the server and the client, respectively.
  - `make db-reset`: Clean up database. Useful when making changes.
  - `make clean`: Clean up development environment

## Installation step-by-step

### JavaScript packages

Install client and server JS packages (separately in the respective
`node_modules` folders) by running `yarn install` in `server/` vs `client/` and `cms/`,
respectively.

### Install Postgres in Docker

Install and run Postgresql in a Docker container:

``` shell
docker run -d --name postgres -p 54321:54321 postgres
```

Data will be stored in the container. Postgres image will be downloaded, and the
service will be running at `http://localhost:54321`. Start both servers with

``` shell
cd server && yarn server
cd client && yarn dev
cd cms && yarn start
```

Afterwards, the application should be accessible at `http://localhost:8000`. When
development is finished, you can remove the Postgres docker.
