/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-04-29 19:36:05
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-05-01 10:00:49
 * @FilePath: /React-Ant/src/utils/localStorage.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { RefreshToken } from '@/api/Pixiv';
// 这个文件里面的方法是为了方便存储localStorage的
export const setLocalStorage = (key: string, value: any, expiration = Date.now() + 3600 * 1000) => {
  // 存储数据
  const item = { data: { ...value, expiration } };
  localStorage.setItem(key, JSON.stringify(item));
};
export const getLocalStorage = async (key: string) => {
  // 获取数据
  const item = localStorage.getItem(key);
  if (!item) return null;
  const { data } = JSON.parse(item);
  if (Date.now() > data.expiration) {
    // 如果到期了,那就进行更新token
    const { data: newData } = await RefreshToken(data.refresh_token);
    data.access_token = newData.access_token;
    data.refresh_token = newData.refresh_token;
    data.response.access_token = newData.access_token;
    data.response.refresh_token = newData.refresh_token;
    setLocalStorage('pixivInfo', data, Date.now() + 3600 * 1000);
  }
  return data;
};
