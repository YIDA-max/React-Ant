/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-04-30 11:58:20
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-05-17 16:24:28
 * @FilePath: /React-Ant/src/pages/Fiction/FictionList/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { getBookList, searchBook } from '@/api/Fiction/FictionList';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
interface Illustration {
  author: string;
  latestChapter: string;
  novelTitle: string;
  tag: string;
  url: string;
}
const columns: ProColumns<Illustration>[] = [
  {
    title: '关键字查询',
    dataIndex: 'keyword',
    width: 100,
    hideInTable: true,
  },
  {
    title: '作者',
    dataIndex: 'author',
    width: 100,
    hideInSearch: true,
  },
  {
    title: '作品',
    dataIndex: 'novelTitle',
    width: 100,
    hideInSearch: true,
  },
  {
    title: '最新章节',
    dataIndex: 'latestChapter',
    width: 100,
    hideInSearch: true,
  },
  {
    title: '地址',
    dataIndex: 'url',
    width: 100,
    copyable: true,
    hideInSearch: true,
  },
];

const Index: React.FC = () => {
  const actionRef = useRef<ActionType>();

  return (
    <div
      id="scrollableDiv"
      style={{
        overflow: 'auto',
        padding: '0 16px',
      }}
    >
      <ProTable<Illustration>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const { current, keyword } = params;
          if (keyword) {
            return await searchBook(keyword);
          } else {
            return await getBookList(current ? current : 1);
          }
        }}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageSize: 40,
        }}
        dateFormatter="string"
        headerTitle="小说列表"
      />
    </div>
  );
};

export default Index;
