import styles from "./Deposit.module.css";
import Banks from '../Banks/Banks'
import Logo from "../Logo/Logo"
import Menu from "../Menu/Menu"
import Nav from "../Nav/Nav"
import { useContext, useEffect } from "react";
import Cookies from "js-cookie"
import { DataContext } from "../../context/DataContext";



const Deposit = () => {
  const { checkbox2Checked, setCheckbox2Checked, setFirstName, setFatherName } = useContext(DataContext);


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
    const savedCheck2 = Cookies.get('check2');
    if (savedCheck2) {
      setCheckbox2Checked(savedCheck2 === "true");
    }
  }, [checkbox2Checked]);

  return (
    <div >
      <div className={styles.sideBarre}>
        <Logo />
        <Menu />
      </div>
      
      <div className={styles.mainContent}>
          <Nav />
        <div className={styles.boxdad}>
          <Banks />
          {checkbox2Checked && <div className={styles.boxError}>⚠️ The deposit has been frozen by the supervisor until further notice !</div>}
        </div>
      </div>
    </div>
  )
}

export default Deposit