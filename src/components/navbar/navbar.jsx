import React from 'react';
import { useHistory } from 'react-router-dom';
import Searchbar from '../searchbar/searchbar';
import styles from './navbar.module.css'

const Navbar = ({onClickLogo}) => {
  const history = useHistory()

  const handleClick = () => {
    onClickLogo()
    history.push('/')
  }
  
  return(
    <nav  className={styles.navbar}>
      <div className={styles.left_menu}>
        <div className={styles.guide_menu}>
          <button className={styles.guide_menu_btn} onClick={handleClick}>
            <img className={styles.guide_menu_img} src="/img/menu.png" alt="menu" />
          </button>
        </div>
        <div className={styles.logo}>logo</div>
      </div>
      <Searchbar/>
      <div className={styles.right_menu}>
        <button>btn1</button>
        <button>btn2</button>
        <button>btn3</button>
        <button>btn4</button>
      </div>
    </nav>
  )
}

export default Navbar;