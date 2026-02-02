import { Transform } from 'class-transformer';

export function ToArray() {
  return Transform(({ value }) => {
    if (!value) return null;

    if (Array.isArray(value)) return value;

    if (typeof value === 'string') {
      return value
        .split(',')
        .map(v => v.trim())
        .filter(v => v !== '');
    }

    return [value];
  });
}
