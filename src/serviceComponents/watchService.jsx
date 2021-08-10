import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import WatchView from '../components/watchView/watchView';

const WatchService = ({content, service}) => {
  const query = new URLSearchParams(useLocation().search)
  const cid = query.get("v")

  service(cid, content)
  
  return (cid ? <WatchView content={content}/> : <Redirect to="/"/> )
} 

export default WatchService;