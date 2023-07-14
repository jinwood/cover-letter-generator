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
  generateCoverLetter: function () {},
});

interface Props {
  children: ReactNode;
}

export function ConfigContextProvider({ children }: Props) {
  const [apiKey, setApiKey] = useState("");
  const [cv, setCv] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  function generateCoverLetter() {
    console.log("ctx");
    console.log(apiKey, cv, jobDescription);

    fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        apiKey,
        cv,
        jobDescription,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setCoverLetter(data));
  }

  const context = {
    apiKey,
    cv,
    jobDescription,
    setApiKey,
    setCv,
    setJobDescription,
    generateCoverLetter,
  };

  console.log(context);
  return (
    <ConfigContext.Provider value={context}>{children}</ConfigContext.Provider>
  );
}

export default ConfigContext;
