import React from 'react';
import styles from './searchbar.module.css'

const Searchbar = (props) => {

  return (
    <form className={styles.form} action="">
      <input className={styles.input_box} type="search" placeholder="검색"/>
      <button className={styles.submit_btn}>
        <img className={styles.submit_img} src="img/loupe.png" alt="loupe" />
      </button>
    </form>
  )
}

export default Searchbar;