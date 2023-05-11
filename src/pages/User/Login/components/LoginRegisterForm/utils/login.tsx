/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-05-11 16:10:48
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-05-11 17:29:26
 * @FilePath: /React-Ant/src/pages/User/Login/components/LoginRegisterForm/utils/login.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import { login } from '@/services/ant-design-pro/api';
import { history, useModel } from '@umijs/max';
import { message } from 'antd';
import { flushSync } from 'react-dom';

export const useLoginOrRegister = () => {
  // 添加权限的功能函数
  const { initialState, setInitialState } = useModel('@@initialState');
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (value: { username: string; password: string }) => {
    try {
      // 登录
      const msg = await login({ ...value });
      if (msg.status === 'ok') {
        message.success('登录成功！');
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      console.log(msg);
    } catch (error) {
      console.log(error);
      message.error('登录失败，请重试！');
    }
  };
  const handleRegister = async (value: {
    username: string;
    password: string;
    passwordCopy: string;
    email: string;
    phone: string;
  }) => {
    const { username, password, passwordCopy, email, phone } = value;
    console.log(' ', username, password, passwordCopy, email, phone);
  };
  return {
    handleSubmit,
    handleRegister,
  };
};
