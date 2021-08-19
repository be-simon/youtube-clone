import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './searchbar.module.css'

const Searchbar = ({onSearch}) => {
  const inputRef = useRef()
  const history = useHistory()

  const handleSearch = () => {
    history.push(`/search?q=${inputRef.current.value}`)
  }

  const handleKeyPress = (e) => {
    if (e.key == 'Enter')
      history.push(`/search?q=${inputRef.current.value}`)
  }

  return (
    <div className={styles.searchbar}>
      <div className={styles.input_container}>
        <input className={styles.input_box} type="search" placeholder="검색" ref={inputRef} onKeyPress={handleKeyPress}/>
      </div>
      <button className={styles.submit_btn} onClick={handleSearch}>
        <img className={styles.submit_img} src="img/loupe.png" alt="loupe" />
      </button>
    </div>
  )
}

export default Searchbar;