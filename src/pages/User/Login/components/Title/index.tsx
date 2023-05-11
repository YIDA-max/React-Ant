/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-05-11 15:13:15
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-05-11 15:18:45
 * @FilePath: /React-Ant/src/pages/User/Login/components/Title/index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import styled, { keyframes } from 'styled-components';

// 创建一个颜色渐变的动画
const gradient = keyframes`
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
`;

// 创建一个使用动画的标题组件
const GradientHeader = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: white;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradient} 15s ease infinite;
  height: 66px;
  line-height: 66px;
`;

const CoolHeader = () => {
  return <GradientHeader>YIDA</GradientHeader>;
};

export default CoolHeader;
