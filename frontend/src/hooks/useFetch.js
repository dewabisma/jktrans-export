import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, token = '') => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        let config = {};

        if (token) {
          config = {
            headers: {
              authorization: `Bearer ${token}`,
            },
          };
        }

        const { data } = await axios.get(url, config);

        setData(data);
        setIsLoading(false);
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        setError(message);
        setIsLoading(false);

        console.error(message);
      }
    })();
  }, [url, token]);

  return { data, error, isLoading };
};

export default useFetch;
