import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, token = '') => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

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

        const { data } = await axios.get(url, {
          ...config,
          cancelToken: source.token,
        });

        setData(data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message;

          setError(message);
          setIsLoading(false);

          console.error(message);
        }
      }
    })();

    return () =>
      source.cancel('Navigating to other page before fetching finished');
  }, [url, token]);

  return { data, error, isLoading };
};

export default useFetch;
