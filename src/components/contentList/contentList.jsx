import React from 'react';
import Content from '../content/content';
import styles from './contentList.module.css'

const ContentList = ({contentList}) => {
  return (
      <ul className={styles.grid}>
      {
        contentList.map(c => {
          return <Content content={c}/>
        })
      }
    </ul>
  )
}


export default ContentList;