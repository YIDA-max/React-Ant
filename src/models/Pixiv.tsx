import { useState } from 'react';

export default () => {
  const [userInfo, setuserInfo] = useState({});
  return { userInfo, setuserInfo };
};
