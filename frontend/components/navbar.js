import Link from 'next/link'
import styles from '../styles/menu.module.css'
const Navbar = () => (
    <div >

<meta charset="utf-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous"></link>
    <div class="navbar navbar-expand-lg fixed-top  navbar-dark bg-dark ">
  <div class="container-fluid" >
        <ul class="navbar-nav">
        <li class="nav-item">
               <Link href="/"><a class="nav-link active"> หน้าหลัก </a></Link> 
            </li>
            <li class="nav-item">
               <Link href="/detail"><a class="nav-link active"> รีวิวหนัง </a></Link> 
            </li>
            <li class="nav-item">
               <Link href="/login"><a class="nav-link active"> Login </a></Link>
            </li>
            <li class="nav-item">
                <Link href="/register"><a class="nav-link active"> Register </a></Link>  
            </li>
            <li class="nav-item">
               <Link href="/logout"><a class="nav-link active"> Logout </a></Link> 
            </li>
     </ul>
    </div>




    </div>
    <br/>
    <br/>
    </div>
)

export default Navbar
