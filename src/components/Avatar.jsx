import React from "react";
import brandlogo from "..//resources/brandlogo.png";
import lockicon from "..//resources/lockicon.png";
import styles from "../styles/Avatar.module.css";

const Avatar = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.contentWrapper}>
        <img src={brandlogo} alt="" />
        <p className={styles.header}>Pocket Notes</p>
        <br />
        <p className={styles.overview}>
          Send and receive messages without keeping your phone online. Use
          Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
        <footer className={styles.footer}>
          <img src={lockicon} alt="" />
          <span>end-to-end encrypted</span>
        </footer>
      </section>
    </div>
  );
};

export default Avatar;
