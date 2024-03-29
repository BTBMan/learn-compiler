import { expect, test } from 'vitest';
import { type Token, tokenizer, TokenTypes } from '../src/tokenizer';

test('tokenizer', () => {
  const code = `(add 2 (subtract 4 2))`;
  const token: Token[] = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'subtract' },
    { type: TokenTypes.Number, value: '4' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: ')' },
    { type: TokenTypes.Paren, value: ')' },
  ];

  expect(tokenizer(code)).toEqual(token);
});

test('left paren', () => {
  const code = `(`;
  const token = [{ type: TokenTypes.Paren, value: '(' }];

  expect(tokenizer(code)).toEqual(token);
});

test('right paren', () => {
  const code = `)`;
  const token = [{ type: TokenTypes.Paren, value: ')' }];

  expect(tokenizer(code)).toEqual(token);
});

test('add', () => {
  const code = `add`;
  const token = [{ type: TokenTypes.Name, value: 'add' }];

  expect(tokenizer(code)).toEqual(token);
});

test('number', () => {
  const code = `22`;
  const token = [{ type: TokenTypes.Number, value: '22' }];

  expect(tokenizer(code)).toEqual(token);
});

test('(add 1 2)', () => {
  const code = `(add 1 2)`;
  const token: Token[] = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '1' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: ')' },
  ];

  expect(tokenizer(code)).toEqual(token);
});
