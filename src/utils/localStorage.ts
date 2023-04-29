// 这个文件里面的方法是为了方便存储localStorage的
/**
 * @description: 获取localStorage
 * @param {string} key值
 * @param {any} value值
 * @param {string} expiration过期时间
 */
import { RefreshToken } from '@/api/Pixiv';
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
    const { access_token, refresh_token } = await RefreshToken(data.refresh_token);
    data.access_token = access_token;
    data.refresh_token = refresh_token;
    setLocalStorage('pixivInfo', { ...data });
    return data;
  }
  return data;
};
