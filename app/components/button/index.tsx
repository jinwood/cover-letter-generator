"use client";
import { useState } from "react";
import styles from "./index.module.css";

export interface Props {
  color: "white" | "blue";
  text: string;
  action: () => Promise<any>;
}

export default function Button({ text, action }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    setIsLoading(true);
    try {
      await action();
    } catch (error: unknown) {
      console.error("error occurred while executing action", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <button
        onClick={handleAction}
        className={styles.btn}
        disabled={isLoading}
      >
        {!isLoading && text}
        {isLoading && `Please wait`}
      </button>
    </>
  );
}
