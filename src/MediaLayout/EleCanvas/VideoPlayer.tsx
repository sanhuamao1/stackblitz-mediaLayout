import { Playlist } from 'reactjs-video-playlist-player';
import { useState, useRef } from 'react';
import { FILE_PATH } from '../constant'

const VideoPlayer = ({ files }) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const vidRef = useRef(null);

  const videos = files.map((file) => ({
    thumbnail: '',
    url: `${FILE_PATH}${file.path}`,
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
