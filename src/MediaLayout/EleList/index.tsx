import EleItem from './EleItem';
import useContextHandler from '../useContextHandler';
import { useState } from 'react';
import { FILE_PATH } from '../constant'

type AudioProps = {
  files: Array<TFile>;
  isPlaying: boolean;
};
const EleList = () => {
  let { eleList, selectedEleKey } = useContextHandler();
  const [audio, setAudio] = useState<AudioProps>({
    files: [],
    isPlaying: false,
  });
  const handlePlay = (item) => {
    setAudio({
      files: item.files,
      isPlaying: true,
    });
  };

  const handleStop = (item) => {
    setAudio({
      files: [],
      isPlaying: false,
    });
  };

  return (
    <div className="MediaLayout-EleList">
      {/* 下面的地址是我配置的apache地址， */}
      {audio.isPlaying && (
        <audio
          src={`${FILE_PATH}${audio.files[0].path}`}
          autoPlay
          style={{
            width: '100%',
            padding: '10px',
          }}
          controls
        />
      )}
      {eleList.map((item) => (
        <EleItem
          item={item}
          isSelected={item.uuid === selectedEleKey}
          key={item.uuid}
          onPlay={handlePlay.bind(null, item)}
          onStop={handleStop.bind(null, item)}
        />
      ))}
    </div>
  );
};

export default EleList;
