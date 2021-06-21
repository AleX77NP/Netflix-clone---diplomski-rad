import React, { useEffect, useState } from 'react'
import styles from '../../styles/Play.module.css'
import {getVideoUrl} from '../../api/movieVideo'
import { useRouter } from 'next/router'
import Loading from '../../components/Loading/Loading'

const Play = () => {

    const router = useRouter();
    const { movie } = router.query

    const [movieData, setMovieData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!router.isReady) return;

        const url = getVideoUrl(movie)
        console.log(url)
        fetch(url).then(res => res.json()).then(item =>{
            if(item.results.length < 1) {
                setError("Could not fetch this movie.")
            } else {
            setMovieData(item)
            }
            console.log(item)
        }).catch((e) => {
            setError('Could not fetch this movie.')
            console.log(e)
        }).finally(() => {
            setLoading(false);
        })
    },[router.isReady])

    const returnEmbedUrl = (movieKey) => {
        let final = "https://www.youtube.com/embed/" + movieKey
        return final;
    }

    return loading ? <Loading /> : error ? <div style={{backgroundColor: 'black', minHeight: '100vh'}}>
        <p style={{ fontSize: '28px', color:'white', display: 'block', margin: '0', paddingTop: '200px', textAlign: 'center'}}>{error}</p>
        <div onClick={() => router.back()} style={{width: '65px',margin: 'auto', marginTop: '65px', cursor: 'pointer'}}>
            <img src="/images/back.png" alt="back-img" style={{width: '90%', display: 'block', margin: 'auto'}} />
            <p style={{fontWeight: 'bold', color: 'white', 'marginTop': '5px'}}>Go Back</p>
        </div>
        </div> : (
        <div className={styles.container}>
            <iframe 
            className={styles.video}
            src={movieData?.results.length === 0 ? "https://www.youtube.com/embed/sY2djp46FeY" : returnEmbedUrl(movieData.results[0]?.key)}
            >
            </iframe>
        </div>
    )
}

export default Play