import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './content.module.css'


const Content = ({content, content:{snippet, contentDetails, statistics}, onChange, layout}) => {
  const {title, description, thumbnails, channelTitle, channelThumbnails, publishedAt} = snippet
  const {duration} = contentDetails
  const {viewCount} = statistics

  const history = useHistory()
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

  const handleClick = () => {
    onChange(content)
    history.push(`/watch?v=${content.id}`)
  }

  return (
    <li className={`${styles.content} ${layoutStyle}`} onClick={handleClick}>
      <div className={`${styles.img_container} ${layoutStyle}`}>
        <img className={`${styles.thumbnail} ${layoutStyle}`} src={thumbnails.high.url} alt="thumbnail" />
      </div>
      <div className={`${styles.details} ${layoutStyle}`}>
        {
          layout === 'grid' &&
          <img className={`${styles.channel_thumbnail} ${layoutStyle}`} src={channelThumbnails.high.url} alt="channelThumbnail" />
        }
        <div className={`${styles.meta} ${layoutStyle}`}>
          <h1 className={`${styles.title} ${layoutStyle}`}>{title}</h1>
            {
              (layout === 'grid' || layout === 'watch') && 
              <div className={styles.metadata}>
                <p className={`${styles.channel_name} ${layoutStyle}`}>{channelTitle}</p>
                <p className={`${styles.metadata_line} ${layoutStyle}`}><span className={styles.view_count}>{getViewCountString(viewCount)}</span> {getTimeIntervalString(publishedAt)}</p>
              </div>
            }
            {
              layout === 'search' && 
              <div className={styles.metadata}>
                <p className={`${styles.metadata_line} ${layoutStyle}`}><span className={styles.view_count}>{getViewCountString(viewCount)}</span> {getTimeIntervalString(publishedAt)}</p>
                <div className={`${styles.channel} ${layoutStyle}`}>
                  <img className={`${styles.channel_thumbnail} ${layoutStyle}`} src={channelThumbnails.high.url} alt="channelThumbnail" />
                  <p className={`${styles.channel_name} ${layoutStyle}`}>{channelTitle}</p>
                </div> 
              </div>
            }
        </div>
      </div>
    </li>
  )
}

const getViewCountString = (viewCount) => {
  let man = parseInt(viewCount / 10000)
  let thousand = parseInt((viewCount % 10000) / 1000)
  let hundred = parseInt((viewCount % 1000) / 100)
  let cntString = '????????? '
  
  if (man) {
    cntString += man.toString()
    if (man < 100 && thousand)
      cntString += `.${thousand}`
    cntString += '??????'
  } else if (thousand) {
    cntString += thousand.toString()
    if (hundred)
      cntString += `.${hundred}`
    cntString += '??????'
  } else {
    cntString += hundred.toString()
  }

  return cntString
}

const getTimeIntervalString = (publishedAt) => {
  const d1 = new Date(publishedAt)
  const d2 = new Date()
  
  const interval = d2.getTime() - d1.getTime()
  const sec = interval / 1000
  if (sec < 60)
    return '??????'
  const minute = parseInt(sec / 60)
  if (minute < 60)
    return `${minute}??? ???`
  const hour = parseInt(minute / 60)
  if (hour < 24)
    return `${hour}?????? ???`
  const day = parseInt(hour / 24)
  if (day < 7)
    return `${day}??? ???`
  const week = parseInt(day / 7)
  if (week < 5)
    return `${week}??? ???`
  const month = parseInt(week / 4)
  if (month < 12)
    return `${month}?????? ???`
  const year = parseInt(month / 12)
  return `${year}??? ???`
}

export default Content;