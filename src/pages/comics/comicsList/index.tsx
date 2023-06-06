/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-06-05 16:50:15
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-06-05 17:08:40
 * @FilePath: /React-Ant/src/pages/comics/comicsList/index.tsx
 * @Description: 漫画柜列表的index
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React from 'react';
import ComicsList from './components/comicsList';
import style from './styles.less';
const Index: React.FC = () => {
  return (
    <div className={style.ComicsMain}>
      <div className={style.ComicsList}>
        <ComicsList />
      </div>
      <div className={style.ComicsInfo}></div>
    </div>
  );
};
export default Index;
