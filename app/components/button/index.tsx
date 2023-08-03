"use client";
import { useState, useEffect } from "react";
import styles from "./index.module.css";

export interface Props {
  color: "white" | "blue";
  text: string;
  disabled: boolean;
  action: () => Promise<any>;
}

export default function Button({ text, action, disabled }: Props) {
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
        disabled={isLoading || disabled}
      >
        {!isLoading && text}
        {isLoading && `Please wait`}
      </button>
    </>
  );
}
