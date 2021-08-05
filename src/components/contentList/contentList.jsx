import React from 'react';
import Content from '../components/content/content'
import styles from 'contentList.module.css'

const Contentlist = ({contentList}) => {
  <ul className={styles.grid}>
    {
      videos.map(c => {
        return <Content content={c}/>
      })
    }
  </ul>
}


export default Contentlist;