import React, { useState, useEffect } from 'react'
import featureApi from '../api/featureApi';


export const useFeaturesListApi = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const resp = await featureApi.getAllFeatures();
            // if (!resp.ok) {
            //     throw new Error('Something went wrong!');
            // }
            console.log(resp)
            setData(resp.data?.data);
            setLoading(false)
        } catch (err) {
            setError(err.err?.message)
        }

    }
    return { data, error, loading }
}

