import ConfigForm from "./components/config-form";
import styles from "./page.module.css";
import { ConfigContextProvider } from "./store/config-context";

export default function Home() {
  return (
    <ConfigContextProvider>
      <main className={styles.main}>
        <div>
          <h1>Generate a cover letter</h1>
          <ConfigForm />
        </div>
      </main>
    </ConfigContextProvider>
  );
}
