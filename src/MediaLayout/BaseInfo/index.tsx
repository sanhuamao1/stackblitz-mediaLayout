// @ts-nocheck
import { Form, Input, InputNumber } from 'antd';
import { memo } from 'react';
import useContextHandler from '../useContextHandler';

const BaseInfo = () => {
  const { baseInfo, handleBaseInputChange, handleBaseSelectChange } =
    useContextHandler();
  return (
    <div className="MediaLayout-BaseInfo">
      <Form
        size="small"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        layout="inline"
      >
        <Form.Item label="节目名称" required>
          <Input
            style={{ width: '120px' }}
            name="program_name"
            value={baseInfo.program_name}
            onChange={handleBaseInputChange}
          />
        </Form.Item>
        <Form.Item label="分辨率" required>
          <div style={{ display: 'flex' }}>
            <InputNumber
              min={1}
              style={{ width: '60px' }}
              value={baseInfo.program_width}
              onChange={handleBaseSelectChange.bind(null, 'program_width')}
            />
            <span style={{ padding: '0 4px' }}> x </span>
            <InputNumber
              min={1}
              style={{ width: '60px' }}
              value={baseInfo.program_height}
              onChange={handleBaseSelectChange.bind(null, 'program_height')}
            />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default memo(BaseInfo);
