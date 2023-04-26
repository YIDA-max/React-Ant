/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-04-25 16:45:39
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-04-26 10:07:50
 * @FilePath: /React-Ant/src/pages/Pixiv/index.tsx
 * @Description:pixiv页面的主文件
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';
import InfoCard from './InfoCard';
import Login from './Login';
const Pixiv: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <div>
      {' '}
      <PageContainer>
        <Card
          style={{
            borderRadius: 8,
          }}
          bodyStyle={{
            backgroundImage:
              initialState?.settings?.navTheme === 'realDark'
                ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
          }}
        >
          <div
            style={{
              backgroundPosition: '100% -30%',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '274px auto',
              backgroundImage:
                "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
            }}
          >
            <div
              style={{
                fontSize: '20px',
                color: token.colorTextHeading,
              }}
            >
              欢迎使用 Pixiv 页面
            </div>
            <p
              style={{
                fontSize: '14px',
                color: token.colorTextSecondary,
                lineHeight: '22px',
                marginTop: 16,
                marginBottom: 32,
                width: '65%',
              }}
            >
              该页面的功能都是基于用户的账号来进行登录的操作的,是不会提供默认账号的,所以在使用该功能的时候需要自己拥有Pixiv账号,如果有高级会员更佳
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: '100%',
                }}
              >
                <InfoCard
                  index={1}
                  href=""
                  title="第一步进行登录(!该功能是最核心的)"
                  content={Login}
                />
              </div>
              {/* <InfoCard
                index={2}
                title="了解 ant design"
                href=""
                desc="antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。"
              />
              <InfoCard
                index={3}
                title="了解 Pro Components"
                href=""
                desc="ProComponents 是一个基于 Ant Design 做了更高抽象的模板组件，以 一个组件就是一个页面为开发理念，为中后台开发带来更好的体验。"
              /> */}
            </div>
          </div>
        </Card>
      </PageContainer>
    </div>
  );
};
Pixiv.propTypes = {};

export default Pixiv;
