export const maxContentIdLength = 100;
export const contentIdPattern = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;

export function isContentId(value: unknown): value is string {
  return typeof value === 'string' && value.length <= maxContentIdLength && contentIdPattern.test(value);
}
