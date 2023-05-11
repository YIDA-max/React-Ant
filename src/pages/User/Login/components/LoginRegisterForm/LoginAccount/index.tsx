/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-05-11 10:51:55
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-05-11 11:29:19
 * @FilePath: /React-Ant/src/pages/User/Login/components/LoginAccount/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const intl = useIntl();
  return (
    <div>
      {' '}
      <>
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined />,
          }}
          placeholder={intl.formatMessage({
            id: 'pages.login.username.placeholder',
            defaultMessage: '用户名: admin or user',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.login.username.required"
                  defaultMessage="请输入用户名!"
                />
              ),
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />,
          }}
          placeholder={intl.formatMessage({
            id: 'pages.login.password.placeholder',
            defaultMessage: '密码: ant.design',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.login.password.required"
                  defaultMessage="请输入密码！"
                />
              ),
            },
          ]}
        />
      </>
    </div>
  );
};

Index.propTypes = {};

export default Index;
