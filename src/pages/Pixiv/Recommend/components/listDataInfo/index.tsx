/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-04-30 11:58:20
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-05-01 21:47:15
 * @FilePath: /React-Ant/src/pages/Pixiv/Recommend/components/listDataInfo./listDataInfo.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Recommend } from '@/api/Pixiv';
import { getLocalStorage } from '@/utils/localStorage';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space } from 'antd';
import React, { useRef } from 'react';
import { expandedRowRender, handleExpand } from './expandedRowRender';
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
const columns: ProColumns<Illustration>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '作品ID',
    dataIndex: 'id',
    width: 100,
  },

  {
    disable: true,
    title: '作者ID',
    dataIndex: 'uid',
    copyable: true,
    search: false,
    render: (_, record) => (
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <Space wrap={true}>
          作者id: {record.user.uid}
          作者名字: {record.user.name}
        </Space>
      </div>
    ),
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'create_date',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const Index: React.FC = () => {
  const actionRef = useRef<ActionType>();

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
      onClick={() => {}}
    >
      <ProTable<Illustration>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async () => {
          const userInfo = await getLocalStorage('pixivInfo');
          const { data } = await Recommend(
            { ...userInfo, expire_time: 3600 },
            {
              contentType: 'ILLUSTRATION',
              includeRankingIllustration: 'true',
              includeRankingLabel: 'true',
            },
          );
          return { data };
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange() {},
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        expandable={{ expandedRowRender, onExpand: handleExpand }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="推荐内容"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              actionRef.current?.reload();
            }}
            type="primary"
          >
            查看详情
          </Button>,
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: '1st item',
                  key: '1',
                },
                {
                  label: '2nd item',
                  key: '1',
                },
                {
                  label: '3rd item',
                  key: '1',
                },
              ],
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
    </div>
  );
};

export default Index;