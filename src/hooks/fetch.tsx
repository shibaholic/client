import {useEffect, useState } from "react"

import { api_url } from '../scripts/api'

export const useFetch = (url:string) => {
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<unknown>(null)
    const [loading, setLoading] = useState<boolean>(true)

    //const full_url = api_url + url;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(url, {
                    method: "GET",
                    credentials: "include"
                });
                const json = await res.json();

                setData(json);
                setLoading(false);
            } catch(e:unknown) {
                setError(e);
                setLoading(false);
            }
        }

        fetchData();
    }, [url])
    
    return { loading, error, data }
}

export type fetchResult = {
    loading:boolean;
    error:unknown;
    data:any;
}