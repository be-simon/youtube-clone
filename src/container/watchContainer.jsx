import React, {useEffect} from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import WatchView from '../components/watchView/watchView';


const WatchContainer = ({youtube, content, onChange}) => {
  const query = new URLSearchParams(useLocation().search)
  const cid = query.get("v")

  useEffect(() => {
    if (!content || content.id !== cid)
      youtube.getVideoWithIds(cid)
      .then(items => {
        const video = items[0]
        const c = video ? video : {id: cid}
        onChange(c)
      })
  })

  if (cid) {
    if (content) return (<WatchView content={content}/>)
    else return (<></>)
  } else 
    return (<Redirect to='/'/>)
} 

export default WatchContainer;