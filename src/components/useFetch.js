import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchData = async () => {
      try {
        const response = await fetch(url, { 
          signal: abortController.signal 
        });
        
        if (!response.ok) throw new Error('Problème API');
        
        const json = await response.json();
        setData(json);
      
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          console.error("Erreur fetch :", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
    return () => abortController.abort();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
