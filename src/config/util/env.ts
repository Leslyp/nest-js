/**
 * This is a helper method that will pull environment variables
 * from `process.env` and can define a default value, if needed.
 */
export default (paramName: string, defaultValue?: string): string => {
  const paramValue = process.env[paramName];

  if (typeof paramValue === 'undefined' || paramValue === '') {
    return defaultValue ?? '';
  }

  return paramValue;
};
