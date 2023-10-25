import { useContext, useEffect } from "react";
import Logo from "../Logo/Logo"
import Menu from "../Menu/Menu"
import Nav from "../Nav/Nav"
import styles from "./Transaction.module.css";
import TransactionTable from "./TransactionTable";
import { DataContext } from "../../context/DataContext";
import Cookies from "js-cookie";

const Transaction = () => {
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
    <div >
  <div className={styles.sideBarre}>
    <Logo />
    <Menu />
  </div>
  
  <div className={styles.mainContent}>
      <Nav />
  <div className={styles.boxdad}>

    <div className={styles.thirdRow}>
      <TransactionTable />
    </div>

    </div>
  </div>
</div>
</div>
  )
}

export default Transaction