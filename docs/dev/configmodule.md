# ConfigModule

## Usage

The Config Module serves as a wrapper around the ConfigService, adding a typed schema and environment variable validation.
The module exports both the typed [`AppConfigService`](../..//src/config/config.service.ts) along with the NestJS [`ConfigService`][config-service].
It's recommended to use the [`AppConfigService`](../..//src/config/config.service.ts) when possible with the ConfigService to be used with downstream dependencies that rely on it.

Application config can be referenced using the [`AppConfigService`](../..//src/config/config.service.ts) or the [`ConfigService`][config-service]. Variables are parsed in from the `.env` file and can be referenced with the following syntax:

```ts
/// AppConfigService
const makeEventsEnabled = this.appConfigService.config.dataPipeline.enabled;

/// NestJS ConfigService
const url = this.configService.get<string>('CREDIT_REPORT_URL');
```

## Validation and Enforcement

We use [Joi][joi] to validate the config and enforce required variables, if needed. The validation schema can be found in `./src/config/validtion.schema.ts` and utilizes the syntax as defined in the Joi documentation.

In the example below, we define that the `NODE_ENV` variable can only be 'development', 'test', or 'production', and it defaults to 'development'. Then, we require `TEST_URL` _unless_ the `NODE_ENV` is 'test'.

```ts
export const validationSchema: ObjectSchema = Joi.object({
  // This is needed for the `requiredIfNotInTest` helper
  NODE_ENV: ValidationHelpers.getEnvironment,

  // --- Add env vars you want to enforce rules on here --- //
  TEST_URL: ValidationHelpers.requiredIfNotInTest,
});
```

> **NOTE**: The validation for `TEST_URL` in the example above has been extracted to `requiredIfNotTest` in our actual implementation to reduce duplication.

If `TEST_URL` is not a string or is undefined, it will throw an error (unless we're running tests).

```bash
(snip)

Error: Config validation error: "TEST_URL" is required

(snip)
```

[config-service]: https://docs.nestjs.com/techniques/configuration
[joi]: https://joi.dev
