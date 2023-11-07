import React from 'react'
import styles from '../styles/TextBox.module.css'

const TextBox = ({timeStamp, dateStamp, data}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.stamp}>
        <span>{timeStamp}</span>
        <span>{dateStamp}</span>
        <br />
        <br />
      </div>
      <p>{data}</p>
    </div>
  )
}

export default TextBox