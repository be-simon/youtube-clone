import React from 'react';
import Content from '../content/content';
import styles from './contentList.module.css'

const ContentList = ({contentList, onChange, layout}) => {
  let layoutStyle = styles.grid
  switch (layout) {
    case 'grid':
      layoutStyle = styles.grid
      break
    case 'watch':
      layoutStyle = styles.watch
      break
    case 'search':
      layoutStyle = styles.search
      break
    default:
      console.log('there is no such layout')
      break
  }
  
  
  
  return (
      <ul className={`${styles.contents_container} ${layoutStyle}`}>
      {
        contentList && contentList.map(c => {
          return <Content key={c.id} content={c} onChange={onChange} layout={layout}/>
        })
      }
    </ul>
  )
}


export default ContentList;