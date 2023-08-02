"use client";
import React, { createContext, ReactNode, useState } from "react";

const ConfigContext = createContext({
  apiKey: "",
  cv: "",
  jobDescription: "",
  coverLetter: "",
  setApiKey: function (apiKey: string) {},
  setCv: function (cv: string) {},
  setJobDescription: function (jobDescription: string) {},
  generateCoverLetter: () => Promise<any>,
});

interface Props {
  children: ReactNode;
}

export function ConfigContextProvider({ children }: Props) {
  const [apiKey, setApiKey] = useState("");
  const [cv, setCv] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  async function generateCoverLetter() {
    const response = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        apiKey,
        cv,
        jobDescription,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("done in generate");

    if (!response.ok) {
      throw new Error(
        `Server responded with ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    const { result } = data;
    const { content } = result;
    setCoverLetter(content);
  }

  const context = {
    apiKey,
    cv,
    jobDescription,
    setApiKey,
    setCv,
    setJobDescription,
    generateCoverLetter,
    coverLetter,
  };

  console.log(context);
  return (
    <ConfigContext.Provider value={context}>{children}</ConfigContext.Provider>
  );
}

export default ConfigContext;
