import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";

export default function Home() {
  const [text, setText] = React.useState<string>("");
  const [shift, setShift] = React.useState<number>(3);

  function caesarCipher(text: string, shift: number): string {
    let newText = "";
    for (let i = 0; i < text.length; i++) {
      const letter = text[i];

      if (!(upper + lower).includes(letter)) {
        newText += letter === "\n" ? "\n" : letter;
        continue;
      }

      let alphabet = lower;

      if (upper.includes(letter)) {
        alphabet = upper;
      }

      const current_position = alphabet.search(letter);
      let position = (current_position + shift) % 26;

      newText += alphabet.charAt(position);
    }

    return newText;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Caesar cipher</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <textarea
          value={text}
          placeholder="digite o texto para ser encriptado"
          onChange={(event) => setText(event.target.value)}
        />
        <p>
          {String(shift).padStart(2, "0")}
          <input
            type="range"
            min="1"
            max="26"
            value={shift}
            onChange={(e) => setShift(+e.target.value)}
          />
        </p>
        <div>{caesarCipher(text, shift)}</div>
      </main>
    </div>
  );
}
