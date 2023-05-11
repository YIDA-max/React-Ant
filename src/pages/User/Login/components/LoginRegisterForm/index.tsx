/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-05-11 11:07:30
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-05-11 17:30:04
 * @FilePath: /React-Ant/src/pages/User/Login/components/LoginRegisterForm/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ProForm, ProFormCheckbox } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Card, Tabs } from 'antd';
import React, { useState } from 'react';
import LoginAccoubt from './LoginAccount/index';
import Register from './RegisterUser/index';
import { useLoginOrRegister } from './utils/login';
const Index: React.FC = () => {
  const intl = useIntl();
  const [type, setType] = useState<string>('account');
  const { handleSubmit, handleRegister } = useLoginOrRegister();
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Card
        style={{
          width: '80%',
          display: 'flex',
          justifyContent: 'center',
        }}
        bodyStyle={{
          width: '25%',
        }}
      >
        <ProForm
          submitter={{
            render: (props) => {
              return (
                <Button
                  type="primary"
                  onClick={() => props.form?.submit()}
                  style={{ width: '100%', height: '40px' }}
                >
                  {type === 'account' ? '登录' : '注册'}
                </Button>
              );
            },
          }}
          onFinish={async (values) => {
            switch (type) {
              case 'account':
                await handleSubmit(
                  values as {
                    username: string;
                    password: string;
                  },
                );
                break;
              case 'register':
                await handleRegister(
                  values as {
                    username: string;
                    password: string;
                    passwordCopy: string;
                    email: string;
                    phone: string;
                  },
                );
                break;
              default:
                break;
            }
          }}
        >
          {' '}
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码登录',
                }),
              },
              {
                key: 'register',
                label: intl.formatMessage({
                  id: 'pages.login.register.tab',
                  defaultMessage: '用户注册',
                }),
              },
            ]}
          />
          <div>
            {type === 'account' && <LoginAccoubt />}
            {type === 'register' && <Register />}
            <div
              style={{
                marginBottom: 24,
                display: type === 'register' ? 'none' : 'block',
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
              </a>
            </div>
          </div>
        </ProForm>
      </Card>
    </div>
  );
};

Index.propTypes = {};

export default Index;
