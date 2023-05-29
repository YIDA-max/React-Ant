/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-05-22 10:34:02
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-05-22 11:34:50
 * @FilePath: /React-Ant/src/pages/Fiction/MyFiction/components/upData.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { upData } from '@/api/Fiction/upData';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import React from 'react';

interface IndexProps {
  callBack: () => void;
}
const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: async (file) => {
    console.log(file);
    await upData(file);
    return '';
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
const Index: React.FC<IndexProps> = () => {
  return (
    <div>
      {' '}
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
        <p className="ant-upload-hint">支持单个或批量上传。严禁上传公司数据或 其他被禁文件。</p>
      </Dragger>
    </div>
  );
};

export default Index;
