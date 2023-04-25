/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-03-21 17:43:42
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-04-25 15:35:05
 * @FilePath: /React-Ant/src/pages/404.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Back Home 1
      </Button>
    }
  />
);

export default NoFoundPage;
