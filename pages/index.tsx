import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { caesar, frenquency_analysis, Freq } from "../lib/caesar";

const norm = (letter: string) =>
  letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export default function Home() {
  const [text, setText] = React.useState<string>("");
  const [shift, setShift] = React.useState<number>(3);
  const [result, setResult] = React.useState("");
  const [freq, setFreq] = React.useState<Freq>({});

  React.useEffect(() => {
    if (!text) return;
    const cipher = caesar(text, shift);
    setResult(cipher);
    setFreq(frenquency_analysis(cipher));
  }, [text, shift]);

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
          {Object.keys(freq).map((k) => (
            <div className={styles.frequenciasLetra} key={k}>
              <div style={{ height: `${freq[k] * 10}px` }}></div>
              <span>{k}</span>
              <small>{freq[k]}</small>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
