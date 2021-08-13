import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";

const norm = (letter: string) =>
  letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export default function Home() {
  const [text, setText] = React.useState<string>("");
  const [shift, setShift] = React.useState<number>(3);
  const [result, setResult] = React.useState("");

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

  React.useEffect(() => {
    if (!text) return;
    setResult(caesarCipher(text, shift));
  }, [text, shift]);

  function getFrequency(letter: string) {
    let re = new RegExp(letter, "gi");
    return (result.match(re) || []).length;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Caesar cipher</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.forms}>
          <textarea
            value={text}
            placeholder="digite o texto para ser encriptado"
            onChange={(event) => setText(norm(event.target.value))}
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
        </div>
        <div className={styles.result}>{result}</div>
        <div className={styles.frequencias}>
          {upper.split("").map((l) => (
            <div className={styles.frequenciasLetra} key={l}>
              <div style={{ height: `${getFrequency(l) * 10}px` }}></div>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
