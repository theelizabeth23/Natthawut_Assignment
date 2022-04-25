import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import styles from '../styles/admin.module.css'
//import useSWR, { mutate } from 'swr'
import Navbar from "../components/navbar";
import withAuth from "../components/withAuth";
import Link from 'next/link'


const URL = "http://localhost/api/shops";



const fetcher = url => axios.get(url).then(res => res.data)
const SWR1 = () => {
    const [shops, setshops] = useState({ list: [{ id: 1, name: "table", score:999 },] })
    const [shop, setshop] = useState({})
    const [id, setId] = useState(0)
    const [name, setname] = useState('')
    const [score , setscore] = useState(0)
    const [imageurl,setimageurl] = useState('')
    const [income, setIncome] = useState(0)



    useEffect(() => {
        getshops();
        profileUser();
      }, []);

    const profileUser = async () => {
        try {
          // console.log('token: ', token)
          const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // console.log('user: ', users.data)
          setUser(users.data);
        } catch (e) {
          console.log(e);
        }
      };
    
    const getshops = async () => {
        let shops = await axios.get(URL)
        setshops(shops.data)
        //console.log('shop:', shops.data)
    }

    const getshop = async (id) => {
        let shop = await axios.get(`${URL}/${id}`)
        console.log('shop id: ', shop.data)
        setshop({ id: shop.data.id, name: shop.data.name, score: shop.data.score, imageurl: shop.data.imageurl})
    }



    const printshops = () => {
        if (shops && shops.length)
            return shops.map((shop, index) =>
                <li className={styles.listItem} key={index}>
                     <div className={styles.box}>
                    <h6>Id:{(shop) ? shop.id : 0}</h6>
                    <img src={shop.imageurl} width="100" height="100"></img>
                    <h6>name:{(shop) ? shop.name : '-'}</h6>
                    score:{(shop) ? shop.score : 0}<br></br>
                    <button className={styles.byttondelet} onClick={() => deleteshop(shop.id)} >Delete</button>

                    </div>
                </li>
            )
        else
            return <li> ไม่มีหนังที่รีวิว </li>
    }



    const addshop = async ( name, score,imageurl) => {
        let shops = await axios.post(URL, {  name, score, imageurl })
        setshops(shops.data)
    }


    const deleteshop = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        getshops()
    }

    const updateshop = async (id) => {
        const result = await axios.put(`${URL}/${id}`, { id, name, score, imageurl })
        //console.log('student id update: ', result.data)
        getshops()
    }



    return (<div className={styles.container} >
          <Navbar />
        <h1>คะแนนรีวิว</h1>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet"></link>


        <ul className={styles.list}  >{printshops()}</ul>
        <h2>เพิ่มรีวิว</h2>
        <ul className={styles.formadd} >
           
            name:<input type="text" onChange={(e) => setname(e.target.value)} /> <br />
            score:<input type="number" onChange={(e) => setscore(e.target.value)} /> <br />
            imageurl:<input type="Linkd" onChange={(e) => setimageurl(e.target.value)} /> <br />
            <button className={styles.byttonadd} onClick={() => addshop(name,  score, imageurl)}>Add new review</button>
            
            
        </ul>
        <style jsx>{`
                h1,h2,ul{
                    font-family: 'Itim', cursive;

                    
                }
                
            `}</style>
    </div>
    
    )
}

export default withAuth(SWR1);

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
  }
