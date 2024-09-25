import Joi, { ObjectSchema, StringSchema } from 'joi';

export class ValidationHelpers {
  /**
   * Helper to get the environment variable. Defaults to 'development'.
   */
  static getEnvironment: StringSchema = Joi.string()
    .valid('development', 'test', 'production')
    .default('development');

  /**
   * Requires an environment variable ONLY if the environment is not 'test'
   */
  static requiredIfNotInTest: StringSchema = Joi.string().when('NODE_ENV', {
    not: 'test',
    then: Joi.required(),
  });
}

/**
 * This is how we enforce rules on environment variables on app start using
 * joi schema validation.
 *
 * https://joi.dev/api/?v=17.4.0#example
 */

export const validationSchema: ObjectSchema = Joi.object({
  // This is needed for the `requiredIfNotInTest` helper
  NODE_ENV: ValidationHelpers.getEnvironment,

  // --- Add env vars you want to enforce rules on here --- //
  REPLACE_APPLICATION_NAME_AUTH0_AUDIENCE:
    ValidationHelpers.requiredIfNotInTest,
  REPLACE_APPLICATION_NAME_AUTH0_CLIENT_ID:
    ValidationHelpers.requiredIfNotInTest,
  REPLACE_APPLICATION_NAME_AUTH0_CLIENT_SECRET:
    ValidationHelpers.requiredIfNotInTest,
  REPLACE_APPLICATION_NAME_AUTH0_DOMAIN: ValidationHelpers.requiredIfNotInTest,
  REPLACE_APPLICATION_NAME_AUTH0_ISSUER: ValidationHelpers.requiredIfNotInTest,

  // -------------- Env var rule enforcement -------------- //
});
