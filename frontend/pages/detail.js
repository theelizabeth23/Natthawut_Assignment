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
            <h2>หนังใหม่ เข้าโรง</h2>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet"></link>
<br></br>
            จอมเวทย์มหากาฬ ในมัลติเวิร์สมหาภัย (04-05-2022)<br></br>
                <img  src="https://lh3.googleusercontent.com/8qldP3jObcN9bbpdAe0WYoqdML7YZB5mkZEGuhVdxSVELEYZdepbKfqr5bd8GApf0sSZH5FL1B_AC8vkV-cVCJ5kV5804yeUvw=w260"  width="250" height="350" ></img>  
                <br></br>
                ผจญภัยนครสาบสูญ (21-04-2022) <br></br>
                <img  src="https://lh3.googleusercontent.com/IpvTsd4hXMrWtVG59TAn7XpvU9YZed83qMcmh5s0iyxWUFvX837Qx4Kx5ke14YbeW3nXLZFZGthOAzNh6NdbkS_HpsYUKYJ9YA=w260"  width="250" height="350" ></img>  
                <br></br>
                กล้องติดตาย (21-04-2022) <br></br>
                <img  src="https://lh3.googleusercontent.com/13BkVpWSxKYpXBaNh163CPXAb4rUbWSB24KqUQi6ROgBxOvpYEDTdXf2KPw1hu40WKlqrwJOOpksobN9m9-VIyHGjPTDabk=w260"  width="250" height="350" ></img>  
                <br></br>
                The Godfather Coda: The Death of Michael Corleone (21-04-2022) <br></br>
                <img  src="https://lh3.googleusercontent.com/ro8ZPRziM9Nf0v9-WtrWEQlrBx7YfTNDccVMvvqP0LnSLCMM4Gi4nUP7Gz6NRdV1yu1EG2Ou1KfLfzb2YKnay0hZR4jovNHL=w260"  width="250" height="350" ></img>  
                <br></br>
                บักแตงโม (28-04-2022) <br></br>
                <img  src="https://lh3.googleusercontent.com/qrP1RAI-76-b_naW86NQCS4-G8WJ2QWu-mN-vfjb2fkhABIc_XktXa5KZ-i_1S64mKE63X1UT-K33znc9082d6ukZN3x7UTQSGc=w260"  width="250" height="350" ></img>  
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