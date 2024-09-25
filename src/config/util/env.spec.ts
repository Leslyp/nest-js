import env from './env';

describe('process env parser util', () => {
  it('returns empty string if no value is defined', () => {
    expect(env('')).toBe('');
  });

  it('returns an environment variable if it exists and has a value', () => {
    process.env.SET_PARAM = 'something-valid';

    expect(env('SET_PARAM')).toEqual('something-valid');
  });

  describe('handles if an environment variable does not exist', () => {
    it('by returning empty string', () => {
      expect(env('UNSET_PARAM')).toBe('');
    });

    it('and it has a default value by returning the default value', () => {
      const defaultValue = 'the-default';

      expect(env('UNSET_PARAM_WITH_DEFAULT', defaultValue)).toEqual(
        defaultValue,
      );
    });
  });
});
