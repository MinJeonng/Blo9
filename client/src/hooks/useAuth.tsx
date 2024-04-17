import axios from 'axios';
import { useState } from 'react';

export default function useAuth() {
  const [userInfo, setUserInfo] = useState<any>([]);

  const confirmAuth = async () => {
    if (localStorage.getItem('token')) {
      try {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_HOST}/api/member/find`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserInfo(res.data.result);
      } catch (error) {
        localStorage.removeItem('token');
      }
    } else {
      setUserInfo({ userId: 0 });
    }
  };

  return [userInfo, confirmAuth];
}
