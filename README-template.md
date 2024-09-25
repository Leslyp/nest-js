# REPLACE APPLICATION NAME

[![CircleCI](https://circleci.com/gh/CreditCardsCom/credit-report-api.svg?style=shield&circle-token=b03ea1827342489661478f7d41e231a8f886ad5e)](https://circleci.com/gh/CreditCardsCom/credit-report-api)

A brief description of what the project does.

## Documentation

#### Standard

- [Architecture diagram](lucidchart)
- [Workflow diagram](lucidchart)
- [Developer docs](./docs/dev/README.md)
- [User guide](https://cards-rev.rvdocs.io/using-apis)
- [Runbook](https://redventures.atlassian.net/wiki/spaces/ENGINEER/pages/268109747/Runbook+Hub)
- [Shield page](https://shield.redventures.io/rv_atx/projects/)
- [ServiceNow SNOW-APP-ID](please-replace-me-or-i-suffer)

#### External services

- [Make (RV)](https://make.rvdocs.io/)

## Local Development

### Requirements

- [Node v18]()
- [GitHub Packages access](https://redventures.atlassian.net/wiki/spaces/CBE/pages/100214145179/Using+GitHub+Packages)

### Environment Variables

Copy `.env.example` to `.env`.

Fill in QA secrets from "REPLACE APPLICATION NAME" in Keeper

### Running

1. Install dependencies
   ```
   npm install
   ```
1. Start up related services
   ```
   docker compose up
   ```
1. Start the dev server
   ```
   npm run start:dev
   ```

### Testing

Run the unit tests:

```
npm run test
```

Run the E2E tests:

```
npm run test:e2e
```
