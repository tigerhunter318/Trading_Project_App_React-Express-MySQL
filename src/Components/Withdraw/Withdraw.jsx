import styles from "./Withdraw.module.css"
import Logo from '../Logo/Logo'
import Menu from '../Menu/Menu'
import Nav from '../Nav/Nav'
import Banks from "../Banks/Banks"
import { useContext, useEffect } from "react"
import { DataContext } from "../../context/DataContext"
import Cookies from "js-cookie"


const Withdraw = () => {
  const { checkbox3Checked, setCheckbox3Checked, setFirstName, setFatherName } = useContext(DataContext);


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

  useEffect(() => {
    const savedCheck3 = Cookies.get('check3');
    if (savedCheck3) {
      setCheckbox3Checked(savedCheck3 === "true");
    }
  }, [checkbox3Checked]);


  return (
    <div >
    <div className={styles.sideBarre}>
      <Logo />
      <Menu />
    </div>
    
    <div className={styles.mainContent}>
        <Nav />
      <div className={styles.boxdad}>
        <Banks changing={true} />
        { checkbox3Checked && <div className={styles.boxError}>⚠️ The withdrawal has been frozen by the administrator until further notice !</div> }
      </div>
    </div>
  </div>
  )
}

export default Withdraw