import { Col, Row } from 'antd';
import { useState, useMemo, useRef } from 'react';
import LayoutContext from './Context';
import BaseInfo from './BaseInfo';
import EleList from './EleList';
import ElePropPanel from './ElePropPanel';
import EleSource from './EleSource';
import EleCanvas from './EleCanvas';
import { useSize } from 'ahooks';
import { useRatioSize } from '../hooks';
import { generateEleList } from './helper';

const fileList = [
  {
    id: '1',
    type: 'image',
    path: 'files/111.jpg',
  },
  {
    id: '2',
    type: 'image',
    path: 'files/222.jpg',
  },
  {
    id: '3',
    type: 'image',
    path: 'files/333.jpg',
  },
  {
    id: '4',
    type: 'audio',
    path: 'files/444.mp3',
  },
  {
    id: '5',
    type: 'video',
    path: 'files/555.mp4',
  },
  {
    id: '6',
    type: 'video',
    path: 'files/666.mp4',
  },
];

const initData = {
  program_name: '节目名称',
  program_width: 1920,
  program_height: 1080,
  eles: [
    {
      type: 'audio',
      files: [
        // {
        //   id: '1',
        //   path: 'public/111.mp4',
        // },s
      ],
    },
    // {
    //   type: 'image',
    //   x: 100,
    //   y: 100,
    //   width: 400,
    //   height: 300,
    //   files: [
    //     // {
    //     //   id: '1',
    //     //   path: 'files/111.jpg',
    //     // },
    //     // {
    //     //   id: '2',
    //     //   path: 'files/222.jpg',
    //     // },
    //     // {
    //     //   id: '3',
    //     //   path: 'files/333.jpg',
    //     // },
    //   ],
    // },
    // {
    //   type: 'date',
    //   x: 200,
    //   y: 0,
    //   width: 300,
    //   height: 80,
    //   color: '#fff',
    //   fontSize: 42,
    // },
    // {
    //   type: 'time',
    //   x: 800,
    //   y: 0,
    //   width: 300,
    //   height: 80,
    //   color: '#fff',
    //   fontSize: 42,
    // },
    // {
    //   type: 'week',
    //   x: 1200,
    //   y: 0,
    //   width: 300,
    //   height: 80,
    //   color: '#fff',
    //   fontSize: 42,
    // },
    // {
    //   type: 'video',
    //   x: 600,
    //   y: 200,
    //   width: 400,
    //   height: 300,
    //   files: [
    //     // {
    //     //   id: '5',
    //     //   path: 'files/555.mp4',
    //     // },
    //     // {
    //     //   id: '6',
    //     //   path: 'files/666.mp4',
    //     // },
    //   ],
    // },
    // {
    //   type: 'caption',
    //   x: 0,
    //   y: 300,
    //   fontSize: 42,
    //   color: '#fff',
    //   direction: 0,
    //   speed: 50,
    //   content: '字幕内容111',
    // },
  ],
};


const MediaLayout = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const size = useSize(canvasRef);
  const [selectedEleKey, setSelectedEleKey] = useState('');
  const [baseInfo, setBaseInfo] = useState<TBaseInfo>({
    program_name: initData.program_name,
    program_width: initData.program_width,
    program_height: initData.program_height,
  });
  const [eleList, setEleList] = useState<TEleList>(
    generateEleList(initData.eles, baseInfo)
  );

  const [widthRatio, heightRatio, viewSize] = useRatioSize(
    [size ? size.width : 0, size ? size.height : 0],
    [baseInfo.program_width, baseInfo.program_height]
  );

  return (
    <LayoutContext.Provider
      value={{
        selectedEleKey,
        setSelectedEleKey,
        eleList,
        setEleList,
        fileList,
        baseInfo,
        setBaseInfo,
        widthRatio,
        heightRatio,
        viewSize,
      }}
    >
      <Row style={{ minHeight: '600px' }}>
        <Col span={20}>
          <Row>
            <BaseInfo />
          </Row>
          <Row style={{ height: 'calc(100% - 45px)' }}>
            <Col span={6} style={{ height: '100%' }}>
              <EleList />
            </Col>
            <Col span={18}>
              <Row style={{ height: '64px' }}>
                <EleSource />
              </Row>
              <Row style={{ height: 'calc(100% - 64px)' }}>
                <EleCanvas ref={canvasRef} />
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={4}>
          <ElePropPanel key={selectedEleKey} />
        </Col>
      </Row>
    </LayoutContext.Provider>
  );
};

export default MediaLayout;
