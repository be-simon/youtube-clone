import React from 'react';
import styles from './content.module.css'

const Content = ({content:{snippet}}) => {
  const {title, description, thumbnails, channelTitle, channelThumbnails} = snippet

  return (
    <li className={styles.content}>
      <img className={styles.thumbnail} src={thumbnails.default.url} alt="thumbnail" />
      <div className={styles.detail}>
        <img className={styles.channelThumbnails} src={channelThumbnails.default.url} alt="channelThumbnail" />
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.channel}>{channelTitle}</p>
        </div>
      </div>
    </li>
  )
}

export default Content;