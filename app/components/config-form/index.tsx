"use client";
import styles from "./index.module.css";
import ConfigContext from "@/app/store/config-context";
import { ChangeEvent, useContext } from "react";
import Button from "../button";

export default function ConfigForm() {
  const configCtx = useContext(ConfigContext);

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

  function generate() {
    configCtx.generateCoverLetter();
  }

  console.log(styles);
  return (
    <div className={styles["form--container"]}>
      <div>
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
      <div>
        <label htmlFor="CV">Your CV: </label>
        <textarea
          id="CV"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
            onCvChange(e.target.value)
          }
        />
      </div>

      <div>
        <label htmlFor="JobDescription">Job Description: </label>
        <textarea
          id="JobDescription"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
            onJobDescriptionChange(e.target.value)
          }
        />
      </div>
      <Button action={generate} text="Generate" color="white" />

      {configCtx.coverLetter && (
        <div>
          <p>{configCtx.coverLetter}</p>
        </div>
      )}
    </div>
  );
}
