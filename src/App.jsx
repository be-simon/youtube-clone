import logo from './logo.svg';
import { StrictMode, useEffect, useState } from 'react';
import styles from './App.module.css';
import ContentList from './components/contentList/contentList';
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'

function App({youtube}) {
  const [contentList, setContentList] = useState([])
  
  useEffect(() => {
    youtube.getMostPopularVideos()
    .then(videos => setContentList(videos))
  }, [youtube])
  
  
  return (
    <div className={styles.App}>
      <Navbar/>
      <div className={styles.body}>
        <Sidebar/>
        <ContentList contentList={contentList}/>
      </div>
    </div>
  );
}

export default App;
