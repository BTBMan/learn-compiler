export enum TokenTypes {
  Paren = 'paren',
  Name = 'name',
  Number = 'number',
}

interface Token {
  type: TokenTypes;
  value: string;
}

export const tokenizer = (code: string) => {
  const tokens: Token[] = [];
  let current = 0;

  while (current < code.length) {
    let char = code[current];

    // space
    const spaceRE = /\s/;
    if (spaceRE.test(char)) {
      current++;
    }

    // left paren
    if (char === '(') {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });

      current++;
    }

    // right paren
    if (char === ')') {
      tokens.push({
        type: TokenTypes.Paren,
        value: char,
      });

      current++;
    }

    // name
    const letterRE = /[a-z]/i;
    if (letterRE.test(char)) {
      let value = '';
      while (letterRE.test(char) && current < code.length) {
        value += char;
        char = code[++current];
      }

      tokens.push({
        type: TokenTypes.Name,
        value,
      });
    }

    // number
    const numberRE = /[0-9]/;
    if (numberRE.test(char)) {
      let value = '';
      while (numberRE.test(char) && current < code.length) {
        value += char;
        char = code[++current];
      }

      tokens.push({
        type: TokenTypes.Number,
        value,
      });
    }
  }
  return tokens;
};
