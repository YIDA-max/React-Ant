/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-04-30 10:48:33
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-05-17 14:52:32
 * @FilePath: /React-Ant/src/api/Fiction/FictionList.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import { request } from '@/utils/request';

/**
 * 获取推荐小说列表的数据
 */
export const getBookList = (current: number, keyword?: string) => {
  return request(`/fiction/books/${current}`, {
    method: 'get',
    params: {
      keyword,
    },
  });
};

export const searchBook = (keyword: string) => {
  return request(`/fiction/search`, {
    method: 'get',
    params: {
      keyword,
    },
  });
};
