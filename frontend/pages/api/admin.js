import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import styles from '../styles/admin.module.css'
//import useSWR, { mutate } from 'swr'
import Navbar from "../components/navbar";
import withAuth from "../components/withAuth";
import Link from 'next/link'


const URL = "http://localhost/api/shops";
const URL2 = "http://localhost/api/income";


const fetcher = url => axios.get(url).then(res => res.data)
const SWR1 = () => {
    const [shops, setshops] = useState({ list: [{ id: 1, name: "table", price:999, Deliverycost:"Ems"  ,Delivery:99 },] })
    const [shop, setshop] = useState({})
    const [id, setId] = useState(0)
    const [name, setname] = useState('')
    const [price, setPrice] = useState(0)
    const [Deliverycost,setDeliverycost] = useState(0)
    const [Delivery,setDelivery] = useState(0)
    const [imageurl,setimageurl] = useState('')
    const [income, setIncome] = useState(0)



    useEffect(() => {
        getshops();
        getIncome();
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
    const getIncome = async () => {
        let income = await axios.get(URL2)
        setIncome(income.data)
        //console.log('income:', income.data)
    }

    const getshop = async (id) => {
        let shop = await axios.get(`${URL}/${id}`)
        console.log('shop id: ', shop.data)
        setshop({ id: shop.data.id, name: shop.data.name, price: shop.data.price,  Deliverycost: shop.data.Deliverycost, Delivery: shop.data.Delivery, imageurl: shop.data.imageurl})
    }



    const printshops = () => {
        if (shops && shops.length)
            return shops.map((shop, index) =>
                <li className={styles.listItem} key={index}>
                     <div className={styles.box}>
                    <h6>Id:{(shop) ? shop.id : 0}</h6>
                    <img src={shop.imageurl} width="100" height="100"></img>
                    <h6>name:{(shop) ? shop.name : '-'}</h6>
                    Price:{(shop) ? shop.price : 0}
                    <h6>Deliverycost:{(shop) ? shop.Deliverycost : 0}</h6>
                    <h6>Delivery:{(shop) ? shop.Delivery : 0}</h6>
                    <button className={styles.byttondelet} onClick={() => deleteshop(shop.id)} >Delete</button>
                    <button className={styles.byttonget} onClick={() => getshop(shop.id)}>Get</button>
                    <button className={styles.byttonupdate} onClick={() => updateshop(shop.id)}>Update</button>

                    </div>
                </li>
            )
        else
            return <li> ไม่มีสินค้า </li>
    }

    const printIncome = () => {
        return income
    }


    const addshop = async ( name, price, Deliverycost, Delivery,imageurl) => {
        let shops = await axios.post(URL, {  name, price, Deliverycost, Delivery, imageurl })
        setshops(shops.data)
    }


    const deleteshop = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        getshops()
    }

    const updateshop = async (id) => {
        const result = await axios.put(`${URL}/${id}`, { id, name, price, Deliverycost, Delivery, imageurl })
        //console.log('student id update: ', result.data)
        getshops()
    }



    return (<div className={styles.container} >
          <Navbar />
        <h1>Admin</h1>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet"></link>
        <h2>Income:{printIncome()}</h2>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet"></link>
        <h2>Littelpig Shop</h2>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
<link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet"></link>


        <ul className={styles.list}  >{printshops()}</ul>
        selected order: {shop.name} {shop.price}  {shop.Deliverycost} {shop.Delivery} {shop.imageurl}
        <h2>Add Order</h2>
        <ul className={styles.formadd} >
           
            name:<input type="text" onChange={(e) => setname(e.target.value)} /> <br />
        price:<input type="number" onChange={(e) => setPrice(e.target.value)} /> <br />
        Deliverycost:<input type="text" onChange={(e) => setDeliverycost(e.target.value)} /> <br />
        Delivery:<input type="number" onChange={(e) => setDelivery(e.target.value)} /> <br />
        imageurl:<input type="Linkd" onChange={(e) => setimageurl(e.target.value)} /> <br />
            <button className={styles.byttonadd} onClick={() => addshop(name,  price, Deliverycost, Delivery, imageurl)}>Add new order</button>
            
            
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
