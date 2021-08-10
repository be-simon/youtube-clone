import logo from './logo.svg';
import { useEffect, useState, Fragment } from 'react';
import styles from './App.module.css';
import ContentList from './components/contentList/contentList';
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'
import WatchService from './serviceComponents/watchService';
import { Switch, Route } from 'react-router-dom'

function App({youtube}) {
  const [contentList, setContentList] = useState([])
  const [content, setContent] = useState()
  const [listLayout, setListLayout] = useState('grid')

  useEffect(() => {
    youtube.getMostPopularVideos()
    .then(videos => setContentList(videos))
  }, [youtube])

  const handleClick = (c) => {
    setContent(c)
  }

  const handleIndexPath = () => {
    setContent()
    setListLayout('grid')
  }

  const handleWatchPath = (cid, c) => {
    if (!cid)
      setContent({id:''})
    else if (!c || cid != c.id) {
      youtube.getVideoWithId(cid)
      .then(video => setContent(video))
    }

    setListLayout('list')
  }

  return (
    <Fragment>
      <Navbar onClickLogo={handleIndexPath}/>
      <div className={styles.body}>
        <Sidebar layout={listLayout}/>

        <Switch>
          <Route exact path='/'></Route>
          <Route exact path='/watch'>
            <WatchService content={content} service={handleWatchPath}/>
          </Route>
        </Switch>

        <ContentList contentList={contentList} onClick={handleClick} layout={listLayout}/>
      </div>

    </Fragment>
  );
}

export default App;
