# Pseudo-serverless

## Installing

### Requirements

Run `npm install -g eslint serverless`.

Also make sure you have:

- Node `v10.14.x`
- MongoDB `v.4.x`

## Running

Copy `.env.example` to `.env` replacing the informations with the correct ones.

Run `npm install` and then `npm start`.

_(Then make sure to create the `database` on `mongo`.)_

## Testing

Run `npm run test`

## Docs

Run `npm docs` (see `docs/index.html`)

## Env Vars

#### LOCAL_PORT

`WS` port. | `default: 3000`

#### TZ

The system's `timezone`. | `default: UTC`

#### NODE_ENV

Environment type. (i.e. `production`)

#### MONGODB_URL

`MondoDB` address. | `default: mongodb://localhost:27017/pseudo-serverless`

#### MONGODB_URL_TEST

`MondoDB` test address. | `default: mongodb://localhost:27017/pseudo-serverless-test`