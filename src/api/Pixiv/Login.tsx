/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-04-26 19:51:20
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-04-26 22:26:27
 * @FilePath: \React-Ant\src\api\Pixiv\Login.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import enums from '@/pages/Pixiv/utils/constants/enums';
import axios from 'axios';
import qs from 'qs';

//  通过发起请求获取到用户信息
export const LoginInfo = (AUTH_CODE: string, code_verifier: string) => {
  // 必须使用axios！！！！！！ 不知道为什么
  return axios(enums.AUTH_URL, {
    method: 'POST',
    data: qs.stringify({
      client_id: enums.CLIENT_ID,
      client_secret: enums.CLIENT_SECRET,
      code: AUTH_CODE,
      code_verifier: code_verifier,
      grant_type: 'authorization_code',
      include_policy: true,
      redirect_uri: `${enums.API_BASE_URL}/web/v1/users/auth/pixiv/callback`,
    }),
    headers: {
      'User-Agent': 'PixivAndroidApp/5.0.234 (Android 11; Pixel 5)',
    },
  });
};
