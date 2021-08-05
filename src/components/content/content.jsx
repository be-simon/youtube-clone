import React from 'react';

const Content = ({snippet}) => {
  const [title, description, thumbnails, channelTitle] = snippet
  
  const [url, width, height] = thumbnails.default

  return (
    <li>
      <img src={url} alt="thumbnail" />
      <div>
        <img src="" alt="channelLogo" />
        <div>
          <h1></h1>
          <p></p>
        </div>
      </div>
    </li>
  )
}

export default Content;