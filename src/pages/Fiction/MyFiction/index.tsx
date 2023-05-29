/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-05-22 10:06:45
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-05-29 11:17:57
 * @FilePath: /React-Ant/src/pages/Fiction/MyFiction/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { getMyFictionList } from '@/api/Fiction/upData';
import React from 'react';
import { ReactReader } from 'react-reader';
import UpData from './components/upData';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const [FictionList, setFictionList] = React.useState([]); // 小说列表
  const [FictionItemName, setFictionItemName] = React.useState('黎明之剑 (远瞳) .epub'); // 小说列表
  React.useEffect(() => {
    const onMount = async () => {
      const resList = await getMyFictionList();
      setFictionList(resList.data);
    };
    onMount();
  }, []);
  return (
    <div>
      <div>
        {FictionList.map((item) => {
          return (
            <div
              key={item}
              onClick={() => {
                let safeUrl = encodeURIComponent(item);
                setFictionItemName(safeUrl);
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div style={{ height: '100vh' }}>
        <ReactReader
          url={`http://localhost:8000/api/fiction/myFictionItem?name=${FictionItemName}`}
        />
      </div>
      <br />
      <div>
        <UpData
          callBack={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
    </div>
  );
};

export default Index;
