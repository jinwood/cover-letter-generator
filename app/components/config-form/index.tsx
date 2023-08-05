"use client";
import styles from "./index.module.css";
import ConfigContext from "@/app/store/config-context";
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import Button from "../button";
import Keywords from "../keywords";

interface FormElements extends HTMLFormControlsCollection {
  apiKey: HTMLInputElement;
  cv: HTMLInputElement;
  jobDescription: HTMLInputElement;
}

interface ConfigForm extends HTMLFormElement {
  readonly elements: FormElements;
}

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

  const handleSubmit = (event: FormEvent<ConfigForm>) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form.cv.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["form--container"]}>
      <div className={styles["form--input-group"]}>
        <label htmlFor="api-key">Api Key: </label>
        <input type="text" id="api-key" placeholder="Your api key" />
      </div>
      <div className={styles["form--input-group"]}>
        <label htmlFor="cv">Your CV: </label>
        <textarea id="cv" />
      </div>

      <div className={styles["form--input-group"]}>
        <label htmlFor="job-description">Job Description: </label>
        <textarea id="job-description" />
      </div>
      <Keywords />
      <button type="submit">Submit</button>

      {configCtx.coverLetter && (
        <div>
          <p>{configCtx.coverLetter}</p>
        </div>
      )}
    </form>
  );
}
