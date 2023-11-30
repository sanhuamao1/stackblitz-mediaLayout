import { Playlist } from 'reactjs-video-playlist-player';
import { useState, useRef } from 'react';

const VideoPlayer = ({ files }) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const vidRef = useRef(null);

  const videos = files.map((file) => ({
    thumbnail: '',
    url: `http://127.0.0.1:8000/${file.path}`,
    imgAlt: '',
  }));

  const params = {
    autoPlay: true,
    showQueue: true,
    playForward: true,
    videos,
    vidRef,
    currentVideo: currentVideo,
    setCurrentVideo,
  };
  return <Playlist playlistParams={params} />;
};

export default VideoPlayer;
