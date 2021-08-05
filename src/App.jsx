import logo from './logo.svg';
import { StrictMode, useEffect, useState } from 'react';
import styles from './App.module.css';
import Videolist from './components/contentList/contentList';


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
