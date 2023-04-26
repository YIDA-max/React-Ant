/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-04-25 18:03:06
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-04-26 17:42:22
 * @FilePath: /React-Ant/src/pages/Pixiv/Login/index.tsx
 * @Description:登录组件
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import KeyWord from '@/components/KeyWord';
import crypto from 'crypto';
import PropTypes from 'prop-types';
import React from 'react';
import { common } from '../utils/common';
import enums from '../utils/constants/enums';
import UrlPixivInput from './UrlPixivInput';
let code_verifier = common.tokenBase64(32);
let code_challenge = crypto
  .createHash('sha256')
  .update(code_verifier)
  .digest('base64')
  .split('/')
  .join('_')
  .split('+')
  .join('-')
  .split('=')
  .join('');
// 配置登录参数
let LOGIN_PARAMS = {
  code_challenge: code_challenge,
  code_challenge_method: 'S256',
  client: 'pixiv-android',
};
/**
 *
 * @returns 登录组件
 */
const Login: React.FC = () => {
  const [userInfo, setUserInfo] = React.useState<string>('');
  console.log(' ', userInfo);
  return (
    <div>
      <h4>由于Pixiv官网进行了登录限制,所以,需要自己手动的拿取到等需要的信息:</h4>
      <h4>
        1.请将下面的URL复制到浏览器，然后像往常一样继续登录 :
        <a
          href={`${enums.API_BASE_URL}/web/v1/login?${new URLSearchParams(
            LOGIN_PARAMS,
          ).toString()}`}
          target="_blank"
          rel="noreferrer"
        >
          点我去进行登录 {'>'}
        </a>
      </h4>
      <h4>
        3:打开
        <KeyWord keyWord="控制台" explain="按F12键可以打开浏览器的控制台" />
        进行登录之后拿取到pixiv://...的链接
      </h4>
      <h4>
        4:输入你拿到的链接,过程尽量要快
        <br />
        <UrlPixivInput
          code_verifier={code_verifier}
          getUserInfoFn={(value: string) => setUserInfo(value)}
        />
      </h4>
      <h4>5:如果输入正确,那么就应该会进行提示说登录成功</h4>
    </div>
  );
};

Login.propTypes = {
  name: PropTypes.string,
  message: PropTypes.shape({
    subject: PropTypes.string,
    body: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

export default Login;
