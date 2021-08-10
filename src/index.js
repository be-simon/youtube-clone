import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Youtube from './youtubeService/youtube'
import {BrowserRouter} from 'react-router-dom'

const youtubeService = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App youtube={youtubeService}/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
