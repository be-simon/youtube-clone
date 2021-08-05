import logo from './logo.svg';
import { StrictMode, useEffect, useState } from 'react';
import styles from './App.module.css';
import ContentList from './components/contentList/contentList';
import Navbar from './components/navbar/navbar'

function App({youtube}) {
  const [contentList, setContentList] = useState([])
  
  useEffect(() => {
    youtube.getMostPopularVideos()
    .then(videos => setContentList(videos))
  }, [youtube])
  
  
  return (
    <div className={styles.App}>
      <Navbar/>
      <ContentList contentList={contentList}/>
    </div>
  );
}

export default App;
