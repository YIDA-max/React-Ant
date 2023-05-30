/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-04-29 19:36:05
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-05-30 15:35:54
 * @FilePath: /React-Ant/src/utils/localStorage.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { RefreshToken } from '@/api/Pixiv';
// 这个文件里面的方法是为了方便存储localStorage的
export const setPixivLocalStorage = (
  key: string,
  value: any,
  expiration = Date.now() + 3600 * 1000,
) => {
  // 存储数据
  const item = { data: { ...value, expiration } };
  localStorage.setItem(key, JSON.stringify(item));
};
// 获取到pixiv的token过期数据
export const getPixivLocalStorage = async (key: string) => {
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
    setPixivLocalStorage('pixivInfo', data, Date.now() + 3600 * 1000);
  }
  return data;
};
export const getLocalStorage = async (key: string) => {
  // 获取数据
  const item = localStorage.getItem(key);
  if (!item) return null;
  const { data } = JSON.parse(item);
  const currentTime = new Date().getTime();

  // 检查数据是否已经过期
  if (currentTime > data.expiry) {
    // 如果已经过期，删除数据并返回 null
    localStorage.removeItem(key);
    return null;
  }
  return data;
};
// 这个文件里面的方法是为了方便存储localStorage的
export const setLocalStorage = (
  key: string,
  value: object,
  ttl: number = 1000 * 60 * 60 * 24 * 365,
) => {
  // 存储数据
  const item = { data: { ...value, expiry: new Date().getTime() + ttl } };
  localStorage.setItem(key, JSON.stringify(item));
};
export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
