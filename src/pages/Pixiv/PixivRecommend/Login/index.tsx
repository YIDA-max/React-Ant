/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-04-25 18:03:06
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-05-16 15:20:47
 * @FilePath: /React-Ant/src/pages/Pixiv/PixivRecommend/Login/index.tsx
 * @Description:登录组件
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Recommend } from '@/api/Pixiv';
import KeyWord from '@/components/KeyWord';
import { getPixivLocalStorage } from '@/utils/localStorage';
import crypto from 'crypto';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useModel } from 'umi';
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
  const { userInfo, setuserInfo } = useModel('Pixiv');
  // 模拟生命周期
  useEffect(() => {
    const info = async () => {
      //在这里我们需要进行判断是否已经登录了,如果已经登录了,那么就不需要再次登录了,在localStorage中拿取到登录信息
      const data = await getPixivLocalStorage('pixivInfo');
      if (data) {
        // 如果存在,那么就直接设置到userInfo中
        setuserInfo(data);
      }
    };
    info();
    return () => {
      console.log('Component is unmounted.');
    };
  }, []);
  return (
    <div>
      <h2>
        {userInfo.refresh_token ? (
          <span
            style={{ color: 'green' }}
            onClick={async () => {
              await Recommend({ ...userInfo, expire_time: 3600 });
            }}
          >
            已登录
          </span>
        ) : (
          <span style={{ color: 'red' }}>未登录</span>
        )}
      </h2>
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
        <UrlPixivInput code_verifier={code_verifier} />
      </h4>
      <h4>5:如果输入正确,那么就会进行提示说登录成功</h4>
      <h4>6:你的账号名字:{userInfo?.user?.name}</h4>
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
