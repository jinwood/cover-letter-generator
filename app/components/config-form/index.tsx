"use client";
import styles from "./index.module.css";
import ConfigContext from "@/app/store/config-context";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import Button from "../button";
import Keywords from "../keywords";

export default function ConfigForm() {
  const configCtx = useContext(ConfigContext);
  const [isValid, setIsValid] = useState(false);

  const { cv, jobDescription } = configCtx;

  useEffect(() => {
    if (cv && jobDescription) {
      setIsValid(true);
    }
  }, [cv, jobDescription]);

  function onUserApiKeyChange(value: string) {
    console.log(value);
    configCtx.setApiKey(value);
  }

  function onCvChange(value: string) {
    configCtx.setCv(value);
  }

  function onJobDescriptionChange(value: string) {
    configCtx.setJobDescription(value);
  }

  async function generate() {
    await configCtx.generateCoverLetter();
  }

  console.log(styles);
  return (
    <div className={styles["form--container"]}>
      <div className={styles["form--input-group"]}>
        <label htmlFor="UserApiKey">Api Key: </label>
        <input
          type="text"
          id="UserApiKey"
          placeholder="Your api key"
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            onUserApiKeyChange(e.target.value)
          }
        />
      </div>
      <div className={styles["form--input-group"]}>
        <label htmlFor="CV">Your CV: </label>
        <textarea
          id="CV"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
            onCvChange(e.target.value)
          }
        />
      </div>

      <div className={styles["form--input-group"]}>
        {" "}
        <label htmlFor="JobDescription">Job Description: </label>
        <textarea
          id="JobDescription"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
            onJobDescriptionChange(e.target.value)
          }
        />
      </div>
      <Keywords />
      <Button
        action={generate}
        text="Generate"
        color="white"
        disabled={!isValid}
      />

      {configCtx.coverLetter && (
        <div>
          <p>{configCtx.coverLetter}</p>
        </div>
      )}
    </div>
  );
}
