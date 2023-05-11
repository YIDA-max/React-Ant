/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-05-11 10:51:55
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-05-11 14:37:56
 * @FilePath: /React-Ant/src/pages/User/Login/components/TabTypeChang/RegisterUser/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  return (
    <div>
      {' '}
      <>
        <ProFormText
          name="username"
          label="用户名"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined />,
            autoComplete: 'off',
          }}
          placeholder={'请输入用户名'}
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
          label="密码"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />,
            autoComplete: 'off',
          }}
          placeholder={'请输入密码'}
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
        <ProFormText.Password
          name="passwordCopy"
          label="再次输入密码"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />,
            autoComplete: 'off',
          }}
          placeholder={'请再次输入密码'}
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
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入不一致'));
              },
            }),
          ]}
        />
        <ProFormText
          name="email"
          label="电子邮箱"
          fieldProps={{
            size: 'large',
            prefix: <MailOutlined />,
            autoComplete: 'off',
          }}
          placeholder={'请输入邮箱'}
          rules={[
            {
              type: 'email',
              message: '请输入有效的邮箱地址',
            },
            {
              required: true,
              message: '请输入邮箱',
            },
          ]}
        />
        <ProFormText
          name="phone"
          label="电话号码"
          fieldProps={{
            size: 'large',
            prefix: <PhoneOutlined />,
            autoComplete: 'off',
          }}
          placeholder={'请输入电话号码'}
          rules={[
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '请输入有效的电话号码',
            },
            {
              required: true,
              message: '请输入电话号码',
            },
          ]}
        />
      </>
    </div>
  );
};

Index.propTypes = {};

export default Index;
