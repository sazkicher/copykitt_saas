import type { NextPage } from "next";
import CopyKitt from "../components/copykitt";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>

      <CopyKitt />
    </div>
    
  );
};

export default Home;