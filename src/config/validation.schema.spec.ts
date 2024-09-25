import Joi, { ObjectSchema, ValidationError } from 'joi';

import { ValidationHelpers } from './validation.schema';

describe('ValidationHelpers', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getEnvironment', () => {
    it('allows valid values', () => {
      const mockValue = 'production';

      const { error, value } =
        ValidationHelpers.getEnvironment.validate(mockValue);

      expect(error).toBeUndefined();
      expect(value).toEqual(mockValue);
    });

    it('throws an error on invalid values', () => {
      const mockValue = 'something';

      const { error, value } =
        ValidationHelpers.getEnvironment.validate(mockValue);

      expect(error).toBeInstanceOf(ValidationError);
      expect(error?.message).toEqual(
        '"value" must be one of [development, test, production]',
      );
      expect(value).toEqual(mockValue);
    });
  });

  describe('requiredIfNotInTest', () => {
    it('requires a value if not in test', () => {
      const mockSchema: ObjectSchema = Joi.object({
        NODE_ENV: Joi.string(),
        SOMETHING: ValidationHelpers.requiredIfNotInTest,
      });
      const mockEnvironmentVariables = {
        NODE_ENV: 'not-test',
      };

      const { error, value } = mockSchema.validate(mockEnvironmentVariables);

      expect(error).toBeInstanceOf(ValidationError);
      expect(error?.message).toEqual('"SOMETHING" is required');
      expect(value).toEqual(mockEnvironmentVariables);
    });

    it('does not require a value if in test', () => {
      const mockSchema: ObjectSchema = Joi.object({
        NODE_ENV: Joi.string(),
        SOMETHING: ValidationHelpers.requiredIfNotInTest,
      });
      const mockEnvironmentVariables = {
        NODE_ENV: 'test',
      };

      const { error, value } = mockSchema.validate(mockEnvironmentVariables);

      expect(error).toBeUndefined();
      expect(value).toEqual(mockEnvironmentVariables);
    });
  });
});
