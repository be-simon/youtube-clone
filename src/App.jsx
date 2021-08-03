import logo from './logo.svg';
import { StrictMode, useEffect, useState } from 'react';
import styles from './App.module.css';

function App({youtube}) {
  const [videos, setVideos] = useState([])
  
  useEffect(() => {
    youtube.getMostPopularVideos()
    .then(items => setVideos(items))
  }, [youtube])
  
  
  return (
    <div className={styles.App}>
      <h1>Hello World</h1>
      <ul>
        {
          videos.map(v => {
            return (
              <li>
                <h1>{v.snippet.title}</h1>
                <p>{v.snippet.description}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;
