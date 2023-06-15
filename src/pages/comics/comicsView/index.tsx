/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-05-18 16:43:05
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-06-15 16:23:43
 * @FilePath: /React-Ant/src/pages/comics/comicsView/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { getViewComicChapter, getViewComicsImg } from '@/api/comics/comicsView';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from '@umijs/max';
import { Card, Image, message, Pagination, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { IInfo } from './types';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const Index: React.FC = () => {
  const { url } = useParams();
  const [comicsInfo, setcomicsInfo] = useState<IInfo>({
    bid: 0,
    bname: '',
    bpic: '',
    cid: 0,
    cname: '',
    file: '',
    finished: false,
    len: 0,
    path: '',
    status: 0,
    block_cc: '',
    nextId: 0,
    prevId: 0,
    files: [],
    sl: {
      e: 0,
      m: '',
    },
  });
  const [page, setpage] = useState<number>();
  const [img, setimg] = useState<string>('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const onMount = async () => {
      setLoading(true);
      // 如果url是空白就需要返回
      if (url !== 'undefined') {
        const data = await getViewComicChapter({
          toUrl: url as string,
        });
        if (data.code === 200) {
          setcomicsInfo(data.data);
          setpage(1);
          setLoading(true);
        }
      } else {
        message.error('漫画章节错误');
        history.push('/comics/comicsShowInfo');
      }
    };
    onMount();
  }, [url]);
  useEffect(() => {
    const onMount = async () => {
      const img = await getViewComicsImg({
        sl: comicsInfo.sl,
        cid: comicsInfo.cid,
        path: comicsInfo.path,
        file: comicsInfo.files[0],
      });
      if (img.code === 200) {
        setimg(img.data);
        setLoading(false);
      }
    };
    onMount();
  }, [page]);
  // 页签改变获取数据
  const changePage = async (page: number) => {
    setLoading(true);
    const data = await getViewComicsImg({
      sl: comicsInfo.sl,
      cid: comicsInfo.cid,
      path: comicsInfo.path,
      file: comicsInfo.files[page - 1],
    });
    if (data.code === 200) {
      setpage(page);
      setimg(data.data);
      setLoading(false);
    }
  };
  return (
    <div>
      <Spin indicator={antIcon} spinning={loading}>
        <Card
          title={comicsInfo.bname}
          extra={
            <div
              onClick={() => {
                const encodedUrl = encodeURIComponent(
                  `http://www.manhuagui.com/comic/${comicsInfo.bid}/${comicsInfo.nextId}.html`,
                );
                history.push(`/comics/comicsView/${encodedUrl}`);
              }}
            >
              下一章
            </div>
          }
        >
          <div style={{ textAlign: 'center' }}>
            <Image src={img} alt="" preview={true} height={730} />
          </div>
        </Card>
        <Pagination
          pageSize={1}
          total={comicsInfo.files.length}
          current={page}
          showSizeChanger={false}
          showQuickJumper={true}
          hideOnSinglePage={true}
          onChange={(page) => {
            changePage(page);
          }}
        />
      </Spin>
    </div>
  );
};
export default Index;
