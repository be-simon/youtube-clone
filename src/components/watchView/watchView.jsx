import React from 'react';
import styles from './watchView.module.css'

const WatchView = ({content}) => {
  return ( 
    <div className={styles.watch_container}>

      <iframe className={styles.video} 
        type="text/html" 
        src={`https://www.youtube.com/embed/${content ? content.id : ''}`}
        allowFullScreen autoplay="1"/>
      {content &&
        <div>  
          <div>
            <h1>title</h1>
            <p>meta</p>
          </div>

          <div>
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
      }
    </div>
  )
}

export default WatchView;