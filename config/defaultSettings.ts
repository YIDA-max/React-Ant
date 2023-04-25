/*
 * @Author: YIDA-max 3136271519@qq.com
 * @Date: 2023-03-21 17:43:42
 * @LastEditors: YIDA-max 3136271519@qq.com
 * @LastEditTime: 2023-04-25 16:42:32
 * @FilePath: /React-Ant/config/defaultSettings.ts
 * @Description:这个文件是全局的静态的配置文件
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ProLayoutProps } from '@ant-design/pro-components';
/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'YIDA',
  pwa: true,
  logo: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
};

export default Settings;
