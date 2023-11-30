import useContextHandler from '../useContextHandler';
import { Empty, Form } from 'antd';
import { getComponentByKey } from '../helper';

const ElePropPanel = () => {
  let { eleInfo, handleEleInputChange, handleEleSelectChange, fileList } =
    useContextHandler();

  if (eleInfo === undefined) {
    return (
      <div className="MediaLayout-ElePropPanel">
        <div className="MediaLayout-ElePropPanel__Title">元素属性</div>
        <div className="MediaLayout-ElePropPanel__Conetnt">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="请选择元素"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="MediaLayout-ElePropPanel">
      <div className="MediaLayout-ElePropPanel__Title">元素属性</div>
      <div className="MediaLayout-ElePropPanel__Conetnt">
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} size="small">
          {Object.keys(eleInfo).map((key) =>
            getComponentByKey({
              key,
              value: eleInfo[key],
              handleInputChange: handleEleInputChange,
              handleSelectChange: handleEleSelectChange,
              fileList,
              type: eleInfo.type,
            })
          )}
        </Form>
      </div>
    </div>
  );
};
export default ElePropPanel;
