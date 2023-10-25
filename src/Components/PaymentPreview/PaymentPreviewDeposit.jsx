import { useContext, useEffect, useState } from "react"
import Logo from "../Logo/Logo"
import Menu from "../Menu/Menu"
import Nav from "../Nav/Nav"
import styles from "./PaymentPreview.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { DataContext } from "../../context/DataContext"
import Table from "./Table";
import Cookies from "js-cookie"


const PaymentPreviewDeposit = () => {
    const { setModalOpen, bank, amount, setAmount, userId, setUserId, setFirstName, setFatherName } = useContext(DataContext);

    const history = useHistory();


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
      const savedUserID = Cookies.get('userID');
      if (savedUserID) {
        setUserId(savedUserID);
      }
    }, [userId]);



    const handleDeposit = async (e) => {
      e.preventDefault();
      
        try {
          const response = await fetch('/deposit', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, bank, userId })
          });
        
          if (response.ok) {
            const message = await response.text();
            console.log(message);
            setAmount("");
            setModalOpen(false);
            history.push('/transactions');
            
          } else {
            console.error("Failed to send data.");
            const message = await response.text();
            console.log(message);
          }
        } catch (err) {
          console.log(err);
        }
    };




  return (
    <div>
        <div >
      <div className={styles.sideBarre}>
        <Logo />
        <Menu />
      </div>
      
      <div className={styles.mainContent}>
          <Nav />
        <div className={styles.boxcont}>
          
          <div className={styles.boxPaymentPreview}>
            <h2>Payment preview</h2>
            <hr />

            <div className={styles.tableContainer}>
                <Table />
            </div>

            <hr />
            <div className={styles.boxApply}>
            <button onClick={handleDeposit} >Apply by {bank}</button> 
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
  )
}

export default PaymentPreviewDeposit