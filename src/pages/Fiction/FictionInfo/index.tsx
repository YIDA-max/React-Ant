import { getBookText } from '@/api/Fiction/FictionList';
import { useParams } from '@umijs/max';
import { Card, message } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import InfoModal from '../components/InfoModal';
import CardInfo from './components/CardInfo';
const Index: React.FC = () => {
  const { url } = useParams();
  const [bookText, setBookText] = useState<{
    title: string;
    content: Array<string>;
    nextUrl: string;
    prevUrl: string;
    url: string;
  }>({
    title: '',
    content: [],
    nextUrl: '',
    prevUrl: '',
    url: '',
  });
  useEffect(() => {
    const onMount = async () => {
      // 如果url是空白就需要返回
      if (url !== 'undefined') {
        const { data } = await getBookText(url as string);
        setBookText(data);
      } else {
        message.error('章节错误');
        history.push('/fiction/FictionList');
      }
    };
    onMount();
  }, [url]);
  return (
    <div>
      <Card bodyStyle={{ display: 'flex' }}>
        <CardInfo {...bookText} />
        <InfoModal
          record={{
            id: 'Key',
            author: 'string',
            latestChapter: 'string',
            novelTitle: bookText.title,
            tag: 'string',
            url: bookText.url,
          }}
        />
      </Card>
    </div>
  );
};

Index.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.shape({
    subject: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Index;
