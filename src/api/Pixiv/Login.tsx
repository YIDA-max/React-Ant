import enums from '@/pages/Pixiv/utils/constants/enums';
import axios from 'axios';
import qs from 'qs';
export default (AUTH_CODE: string, code_verifier: string) => {
  return axios(enums.AUTH_URL, {
    method: 'POST',
    data: qs.stringify({
      client_id: enums.CLIENT_ID,
      client_secret: enums.CLIENT_SECRET,
      code: AUTH_CODE,
      code_verifier: code_verifier,
      grant_type: 'authorization_code',
      include_policy: true,
      redirect_uri: `${enums.API_BASE_URL}/web/v1/users/auth/pixiv/callback`,
    }),
    headers: {
      'User-Agent': 'PixivAndroidApp/5.0.234 (Android 11; Pixel 5)',
    },
  });
};
