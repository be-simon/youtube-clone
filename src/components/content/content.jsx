import React from 'react';
import styles from './content.module.css'

const Content = ({content:{snippet}}) => {
  const {title, description, thumbnails, channelTitle, channelThumbnails} = snippet

  return (
    <li className={styles.content}>
      <div className={styles.img_container}>
        <img className={styles.thumbnail} src={thumbnails.high.url} alt="thumbnail" />
      </div>
      <div className={styles.detail}>
        <img className={styles.channel_thumbnail} src={channelThumbnails.high.url} alt="channelThumbnail" />
        <div className={styles.meta}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.channel}>{channelTitle}</p>
        </div>
      </div>
    </li>
  )
}

export default Content;