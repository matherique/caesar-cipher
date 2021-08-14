export const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const lower = "abcdefghijklmnopqrstuvwxyz";

export function caesar(text: string, shift: number): string {
  let newText = "";
  for (let i = 0; i < text.length; i++) {
    const letter = text[i];

    const re = new RegExp(letter, "gi");
    const match = upper.match(re) || [];

    if (match.length === 0) {
      newText += letter;
      continue;
    }

    let alphabet = lower;

    if (upper.includes(letter)) {
      alphabet = upper;
    }

    const current_position = alphabet.indexOf(letter);
    let position = (current_position + shift) % 26;

    newText += alphabet.charAt(position);
  }

  return newText;
}

export type Freq = { [key: string]: number };

export function frenquency_analysis(text: string): Freq {
  const letters = upper.split("");
  const resp: Freq = {};

  for (let i = 0; i < letters.length; i++) {
    const re = new RegExp(letters[i], "gi");
    const match = text.match(re) || [];

    resp[letters[i]] = match.length;
  }

  return resp;
}
