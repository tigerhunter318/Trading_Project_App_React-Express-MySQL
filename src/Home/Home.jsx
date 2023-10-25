import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import styles from "./Home.module.css";
import HeroImage from "./hero.png";
import Rocket from "./rocket.svg";
import { useHistory } from "react-router-dom";


const Home = () => {

  const history = useHistory();


  return (
    <div className={styles.main}>
        <Navbar />
        <div className={styles.container}>

          <div className={styles.landing}>
          <div className={styles.content}>
            <h2 className={styles.title}>Discover The <br /> World of <br /> <span className={styles.span}>Forex Signal</span></h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. alias sit eius quia facere numquam 
              est harum cupiditate, repellat odit repudiandae voluptatem qui in sequi dicta magni quisquam
              neque fugit suscipit.
            </p>
            <button onClick={()=> history.push('/login')} className={styles.btnStart}>
              <img src={Rocket} alt="rocket icon" />Get started
            </button>
          </div>

          <div className={styles.boxImage}>
            <img className={styles.img} src={HeroImage} width={550} alt={"hero image"} />
          </div>
          </div>

        </div>
    </div>
  )
}

export default Home