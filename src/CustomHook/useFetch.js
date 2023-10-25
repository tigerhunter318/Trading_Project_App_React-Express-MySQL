// Custom Hook - Fetch Data

import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noContent, setNoContent] = useState(null);

    const {shouldReload} = useContext(DataContext); // Rerender - Refresh Data


    useEffect(() => {
      const abortCont = new AbortController();

        setTimeout(()=>{
             fetch(url, { signal: abortCont.signal })
            .then(res => { 
                if (!res.ok) { // error coming back from server
                    throw Error('could not fetch the data for that resource');
                  } 
                return res.json();
             })
            .then(data => { 
              if (Object.keys(data).length === 0) {
                // الرد JSON فارغ
                setNoContent(true);
                setLoading(false);
            } else {
                // الرد JSON لديه محتوى
                setData(data);
                setLoading(false);
                setError(null);
            }

            })
            .catch(err => {
              if (err.name === 'AbortError') {
                console.log('fetch aborted')
              } else {
                // auto catches network / connection error
                setLoading(false);
                setError(err.message);
              }
            })
        }, 1000)

        // abort the fetch
        return () => abortCont.abort();
      }, [url, shouldReload])


    //   return { data, loading, error }; ===>  True :)
      return { data, loading, error, noContent };
}

export default useFetch;