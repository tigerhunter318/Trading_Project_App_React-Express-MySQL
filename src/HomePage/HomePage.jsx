
import styles from "./HomePage.module.css";
import Menu from "../Components/Menu/Menu";
import Logo from "../Components/Logo/Logo";
import Main from "../Components/Main/Main";
import Nav from "../Components/Nav/Nav";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { DataContext } from "../context/DataContext";


const HomePage = () => {
  const { setFirstName, setFatherName } = useContext(DataContext);


  useEffect(() => {
    const savedFirstName = Cookies.get('firstName');
    if (savedFirstName) {
      setFirstName(savedFirstName);
    }

    const savedFatherName = Cookies.get('fatherName');
    if (savedFatherName) {
      setFatherName(savedFatherName);
    }

  }, []);


  return (
  <div>
  <div className={styles.sideBarre}>
    <Logo />
    <Menu />
  </div>

  <div className={styles.mainContent}>
    <Nav />
   <Main /> 
  </div>
</div>
  )
}

export default HomePage