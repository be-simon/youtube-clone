import logo from './logo.svg';
import { useEffect, useState, Fragment } from 'react';
import styles from './App.module.css';
import ContentList from './components/contentList/contentList';
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'
import WatchContainer from './container/watchContainer';
import SearchContainer from './container/searchContainer';
import { Switch, Route, useLocation } from 'react-router-dom'


function App({youtube}) {
  const [contentList, setContentList] = useState([])
  const [content, setContent] = useState(null)
  const [searchList, setSearchList] = useState({query: '', list: []})
  const location = useLocation()

  useEffect(() => {
    youtube.getMostPopularVideos()
    .then(videos => setContentList(videos))
  }, [youtube])

  useEffect(() => {
    if (location.pathname === '/') {
      setContent(null)
    }
      
    window.scrollTo(0, 0)
  }, [location.key])

  function handleContentChange(c) {
    setContent(c)
  }

  function handleSearch(query) {
    youtube.search(query)
    .then(videos => setSearchList({query: query, list: videos}))
  }

  return (
    <Fragment>
      <Navbar onSearch={handleSearch}/>
      <div className={styles.body}>
        <Sidebar layout='grid'/>

        <Switch>
          <Route exact path='/'>
            <ContentList contentList={contentList} onChange={handleContentChange} layout='grid'/>
          </Route>
          <Route exact path='/watch'>
            <WatchContainer youtube={youtube} content={content} onChange={handleContentChange}/>
            <ContentList contentList={contentList} onChange={handleContentChange} layout='watch'/>
          </Route>
          <Route exact path='/search'>
            <SearchContainer searchList={searchList} onSearch={handleSearch}/>
            <ContentList contentList={searchList.list} onChange={handleContentChange} layout='search'/>
          </Route>

        </Switch>
      </div>

    </Fragment>
  );
}

export default App;
