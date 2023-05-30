import { getMyFictionItemContent, getMyFictionItemInfo } from '@/api/Fiction/upData';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { Affix, Button } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './styles.less';
interface IndexProps {
  FictionItemName: string;
  callback: (value: {
    data: string;
    title: string;
    nextTitle: string;
    prevTitle: string;
    nextId: string;
    prevId: string;
    filename: string;
    index?: number;
    FictionItemInfo?: any;
  }) => void;
}
interface IFictionItemInfo {
  toc: Array<{
    href: string;
    id: string;
    level: number;
    'media-type': string;
    order: number;
    title: string;
  }>;
  title: string;
  date: string;
  creator: string;
  filename: string;
}

const Index: React.FC<IndexProps> = ({ FictionItemName, callback }) => {
  const [FictionItemInfo, setsFictionItemInfo] = React.useState<IFictionItemInfo>({
    toc: [],
    title: '',
    date: '',
    creator: '',
    filename: '',
  }); // 小说目录详情
  const [ItemState, setItemState] = React.useState<{
    id: string;
  }>({
    id: '',
  }); // 小说确定章节的详情
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  // 一但FictionItemName变化,就重新查询
  React.useEffect(() => {
    if (FictionItemName) {
      getMyFictionItemInfo({
        name: FictionItemName,
      }).then((res) => {
        setsFictionItemInfo(res);
        setLocalStorage('BookTableOfContentsInfo', {
          info: res,
        });
      });
    }
  }, [FictionItemName]);
  // 一开始的时候执行一次查询,看看是否有保存的进度
  React.useEffect(() => {
    const onMount = async () => {
      const info = await getLocalStorage('BookTableOfContentsInfo');
      const state = await getLocalStorage('BookTableOfContentsItemState');
      if (info) {
        setsFictionItemInfo(info.info);
      }
      if (state) {
        setItemState(state.state);
      }
    };
    onMount();
  }, []);
  const onBookData = async (item: IFictionItemInfo['toc'][0], index: number) => {
    const { data } = await getMyFictionItemContent({
      id: item.id,
      name: FictionItemName ? FictionItemName : FictionItemInfo.filename,
    });
    callback({
      data,
      title: item.title,
      nextTitle: FictionItemInfo?.toc[index + 1]?.title,
      prevTitle: FictionItemInfo?.toc[index - 1]?.title,
      nextId: FictionItemInfo?.toc[index + 1]?.id,
      prevId: FictionItemInfo?.toc[index - 1]?.id,
      filename: FictionItemInfo.filename,
    });
    // 保存初始状态
    setItemState({
      id: item.id,
    });
    // 保存在localStorage中
    setLocalStorage('BookTableOfContentsItemState', {
      state: {
        id: item.id,
      },
    });
  };
  return (
    <div className={styles.TableOfContents} ref={setContainer}>
      <Affix target={() => container}>
        <Button type="primary" onClick={() => {}}>
          回到顶部
        </Button>
      </Affix>
      <div>目录:</div>
      {FictionItemInfo?.toc?.map((item, index) => {
        return (
          <div
            key={item.id}
            className={styles.TableOfContentsItem}
            style={{
              color: 'red',
            }}
          >
            <Button
              type={item.id === ItemState.id ? 'primary' : 'text'}
              onClick={async () => {
                onBookData(item, index);
              }}
            >
              {item.title}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

Index.propTypes = {
  FictionItemName: PropTypes.string.isRequired,
};

export default Index;
