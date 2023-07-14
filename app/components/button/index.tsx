"use client";
import styles from "./index.module.css";

export interface Props {
  color: "white" | "blue";
  text: string;
  action: any;
}

export default function Button(props: Props) {
  const { text, action } = props;
  return (
    <>
      <button onClick={action} className={styles.btn}>
        {text}
      </button>
    </>
  );
}
