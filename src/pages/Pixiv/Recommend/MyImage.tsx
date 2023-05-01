import { Referer } from '@/api/Pixiv';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
interface IndexProps {
  src: string;
}

const Index: React.FC<IndexProps> = ({ src }) => {
  const [image, setImage] = useState('');
  useEffect(() => {
    const info = async () => {
      const fileType = src.split('.').pop(); // 获取图片名称，与原代码类似
      const { base64 } = await Referer(src);
      setImage(`data:image/${fileType};base64,${base64}`);
    };
    info();
  });
  return <div>{image ? <img src={image} alt="image" /> : <div>加载中</div>}</div>;
};
Index.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Index;
