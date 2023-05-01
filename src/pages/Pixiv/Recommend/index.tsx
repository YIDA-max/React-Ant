/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-04-30 11:11:47
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-04-30 14:41:28
 * @FilePath: /React-Ant/src/pages/Pixiv/Recommend/index.tsx
 * @Description:获取推荐信息模块
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Recommend } from '@/api/Pixiv';
import { SearchOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Select } from 'antd';
import React from 'react';
import ListDataInfo from './listDataInfo';
interface Illustration {
  id: number;
  title: string;
  type: 'illust' | 'manga' | 'ugoira' | 'novel';
  caption: string;
  restrict: 0 | 1 | 2;
  user: {
    uid: number;
    name: string;
    account: string;
  };
  tags: {
    name: string;
    translated_name: string | null;
  }[];
  create_date: string;
  page_count: number;
  sanity_level: 1 | 2 | 3 | 4 | 5 | 6;
  x_restrict: 0 | 1;
  is_bookmarked: boolean;
  total_bookmarks: number;
  total_view: number;
  image_urls: {
    square_medium: string;
    medium: string;
    large: string;
  };
  meta_single_page: {
    original_image_url: string;
  };
  meta_pages: never[];
}
const options = [
  {
    label: '图片',
    value: 'ILLUSTRATION',
  },
  {
    label: '漫画',
    value: 'MANGA',
  },
  {
    label: '动图',
    value: 'UGOIRA',
  },
  {
    label: '小说',
    value: 'NOVEL',
  },
];
const Index: React.FC = () => {
  const [optionValue, setoptionValue] = React.useState<
    'ILLUSTRATION' | 'MANGA' | 'UGOIRA' | 'NOVEL'
  >('ILLUSTRATION');
  const [list, setlist] = React.useState<Array<Illustration>>([]);
  const { userInfo } = useModel('Pixiv');
  return (
    <div>
      <div>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={async () => {
            const { data } = await Recommend(
              { ...userInfo, expire_time: 3600 },
              {
                contentType: optionValue,
                includeRankingIllustration: 'true',
                includeRankingLabel: 'true',
              },
            );
            setlist(data);
          }}
        >
          查询推荐列表
        </Button>
        <Select
          options={options}
          value={optionValue}
          style={{ width: 120, margin: '0px 10px' }}
          defaultValue="ILLUSTRATION"
          onChange={(value) => {
            setoptionValue(value as 'ILLUSTRATION' | 'MANGA' | 'UGOIRA' | 'NOVEL');
          }}
        />
      </div>
      <div>
        <ListDataInfo list={list} optionValue={optionValue} />
      </div>
    </div>
  );
};
export default Index;
