import { Radio, Checkbox } from 'antd';
import { useState } from 'react';
import { Empty } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { getFileName } from '../../utils';
import useContextHandler from '../useContextHandler';

type FilesBoxProps = {
  files: Array<TFile>;
  source: Array<any>;
  type: TEleType;
};

const FilesBox = ({ files, source, type }: FilesBoxProps) => {
  const [selected, setSelected] = useState('1');
  const fileKeys = files.map((file) => file.id);
  let { handleEleSelectChange } = useContextHandler();

  const realSource = source.filter((item) => item.type === type);
  const onChangeCheck = (values: CheckboxValueType[]) => {
    let files = [];
    realSource.forEach((file) => {
      if (values.includes(file.id)) {
        files.push(file);
      }
    });
    handleEleSelectChange('files', files);
  };

  return (
    <div className="MediaLayout-ElePropPanel-FilesBox">
      <div className="MediaLayout-ElePropPanel-FilesBox__Header">
        <Radio.Group
          value={selected}
          style={{ width: '100%' }}
          onChange={(e) => {
            setSelected(e.target.value);
          }}
        >
          <Radio.Button value="1" key="1">
            文件列表
          </Radio.Button>
          <Radio.Button value="2" key="2">
            选择文件
          </Radio.Button>
        </Radio.Group>
      </div>

      {selected === '1' ? (
        <div className="MediaLayout-ElePropPanel-FilesBox__List">
          {files.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="请选择文件"
            />
          ) : (
            files.map((item) => <li key={item.id}>{getFileName(item.path)}</li>)
          )}
        </div>
      ) : (
        <div className="MediaLayout-ElePropPanel-FilesBox__List">
          <Checkbox.Group onChange={onChangeCheck} value={fileKeys}>
            {realSource.map((item) => (
              <li>
                <Checkbox value={item.id} key={item.id}>
                  {getFileName(item.path)}
                </Checkbox>
              </li>
            ))}
          </Checkbox.Group>
        </div>
      )}
    </div>
  );
};

export default FilesBox;
