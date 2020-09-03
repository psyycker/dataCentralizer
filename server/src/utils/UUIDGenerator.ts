const LENGTH = 30;
const CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-={}[]|/?.>,<';

export default function GenerateUUID(length: number = LENGTH): string {
  let value = '';
  for (let i = 0; i < length; i += 1) {
    const number = Math.floor(Math.random() * CHARACTERS.length);
    value += CHARACTERS[number];
  }
  return value;
}
