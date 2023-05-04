/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-05-04 10:55:07
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-05-04 14:53:27
 * @FilePath: /React-Ant/src/pages/Pixiv/PixivViewer/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { getIllustrationInfo } from '@/api/Pixiv';
import { useModel } from '@umijs/max';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useParams } from 'umi';
interface IndexProps {
  name: string;
  message: object;
  onClick: (a: number) => number;
}

const Index: React.FC<IndexProps> = () => {
  const { userInfo } = useModel('Pixiv');
  const { id } = useParams();

  useEffect(() => {
    const onMount = async () => {
      const data = await getIllustrationInfo(userInfo, id as unknown as number);
      console.log(' ', data);
    };
    onMount();
  });
  return <div>User id: {id}</div>;
};

Index.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.shape({
    subject: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Index;
