import Layout from '../components/layout'
import Head from 'next/head'
import config from '../config/config'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import Link from 'next/link'

const detail = () => {
    return (<Layout>

        <div className={styles.container}>
            <Navbar />
            <br></br>
            <br></br>
            <br></br>
            <h2>หนังที่รีวิวแล้ว</h2>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet"></link>
<br></br>
            Avenger infinity war <br></br>
                <img  src="https://s.isanook.com/mv/0/rp/r/w728/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL212LzAvdWQvMTcvODYyNDkvYXZlbmdlcnNpbmZpbml0eXdhci5qcGc=.jpg"  width="250" height="350" ></img>  
                <br></br>
            Avenger endgame <br></br>
                <img  src="https://s.isanook.com/mv/0/rp/r/w728/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL212LzAvdWQvMTcvODYyNDkvNTM3MzYzNzlfMTAxNTYyNzk0NjQ1MDYwOTRfNjIuanBn.jpg"  width="250" height="350" ></img>  
                <br></br>
            Avatar <br></br>
                <img  src="https://s.isanook.com/mv/0/rp/r/w728/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL212LzAvdWQvNC8yMDIwMy9hdmEtc3MuanBn.jpg"  width="250" height="350" ></img>  
                <br></br>
            Harry Potter <br></br>
                <img  src="https://cdn.majorcineplex.com/uploads/movie/3320/thumb_3320.jpg"  width="250" height="350" ></img>  
                <br></br>
            Resident Evil <br></br>
                <img  src="https://cdn.majorcineplex.com/uploads/movie/3205/thumb_3205.jpg?160220221003"  width="250" height="350" ></img>  
                <br></br>
         

        </div>
        <style jsx>{`
                h1,h2,ul{
                    font-family: 'Itim', cursive;
                }
                
            `}</style>

    </Layout>)
}

export default detail