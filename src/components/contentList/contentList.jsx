import React from 'react';
import Content from '../content/content';
import styles from './contentList.module.css'

const ContentList = ({contentList, onClick, layout}) => {
  const layoutStyle = layout === 'grid' ? styles.grid : styles.list
  
  return (
      <ul className={`${styles.contents_container} ${layoutStyle}`}>
      {
        contentList.map(c => {
          return <Content key={c.id} content={c} onClick={onClick} layout={layout}/>
        })
      }
    </ul>
  )
}


export default ContentList;