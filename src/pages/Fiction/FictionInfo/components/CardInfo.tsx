/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-05-18 16:43:05
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-05-19 17:46:47
 * @FilePath: /React-Ant/src/pages/Fiction/FictionInfo/components/CardInfo.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { Button, Card, Typography } from 'antd';
import { useRef } from 'react';
import { history } from 'umi';
import InfoModal from '../../components/InfoModal';
interface IBookText {
  title: string;
  content: Array<string>;
  nextUrl: string;
  prevUrl: string;
  url: string;
}
const Index: React.FC<IBookText> = (bookText) => {
  const cardContentRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    const element = cardContentRef.current;
    if (!element) return;

    const step = () => {
      element.scrollTop = element.scrollTop - 50; // 可以调整这个数值来控制滚动速度
      if (element.scrollTop > 0) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };
  return (
    <div>
      <Card
        title={bookText.title}
        hoverable={true}
        ref={cardContentRef}
        style={{
          width: '600px',
          height: '600px',
          overflow: 'auto',
        }}
        extra={[
          <InfoModal
            key={'info'}
            record={{
              id: 'Key',
              author: 'string',
              latestChapter: 'string',
              novelTitle: bookText.title,
              tag: 'string',
              url: bookText.url,
            }}
          />,
        ]}
        actions={[
          <Button
            onClick={() => {
              const encodedUrl = encodeURIComponent(bookText.prevUrl);
              scrollToTop();
              history.push(`/fiction/FictionInfo/${encodedUrl}`);
            }}
            key={bookText.prevUrl}
          >
            上一章
          </Button>,
          <Button onClick={() => history.push('/fiction/FictionList')} key={'目录'}>
            返回目录
          </Button>,
          <Button
            onClick={() => {
              const encodedUrl = encodeURIComponent(bookText.nextUrl);
              scrollToTop();
              history.push(`/fiction/FictionInfo/${encodedUrl}`);
            }}
            key={bookText.nextUrl}
          >
            下一章
          </Button>,
        ]}
      >
        {bookText.content.map((item, index) => {
          return (
            <div key={item + index}>
              <Typography.Text>{item}</Typography.Text>
            </div>
          );
        })}
      </Card>
    </div>
  );
};
export default Index;
