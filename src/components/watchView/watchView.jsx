import React from 'react';
import styles from './watchView.module.css'

const WatchView = ({content, content:{snippet, contentDetails, statistics}}) => {
  const {title, description, thumbnails, channelTitle, channelThumbnails, publishedAt} = snippet
  const {duration} = contentDetails
  const {viewCount} = statistics

  return ( 
    <div className={styles.watch_container}>
      <iframe className={styles.video} 
        type="text/html" 
        src={`https://www.youtube.com/embed/${content ? content.id : ''}`}
        allowFullScreen autoplay="1"/>
  
      <div className={styles.details}>  
        <div className={styles.meta}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.info_block}>
            <p className={styles.meta_line}><span className={styles.view_count}>{viewCount}</span>{publishedAt}</p>
            <div className={styles.menu}>

            </div>
          </div>
        </div>

        <div className={styles.description}>
          <div>
            <img src="" alt="" />
            <div>
              <h1>channel</h1>
              <p>channel info</p>
            </div>
            <button>subscribe</button>
          </div>
          <div>
            <p>description</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default WatchView;