import { useContext, useEffect, useState } from "react"
import Logo from "../Logo/Logo"
import Menu from "../Menu/Menu"
import Nav from "../Nav/Nav"
import styles from "./PaymentPreview.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { DataContext } from "../../context/DataContext"
import Table from "./Table";
import Cookies from "js-cookie"



const PaymentPreviewWihdraw = () => {
    const [accept, setAccept] = useState(false);
    const { setModalOpen, bank, amount, setAmount, userId, setUserId, setFirstName, setFatherName } = useContext(DataContext);
    const [error, setError] = useState("");


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

    const history = useHistory();

    useEffect(() => {
        const savedUserID = Cookies.get('userID');
        if (savedUserID) {
          setUserId(savedUserID);
        }
      }, [userId]);

      const handleWithdraw = async (e) => {
        e.preventDefault();
        setAccept(true);
        
          try {
            const response = await fetch('/withdraw', {
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
              const message = await response.text();
              setError(message);
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
            <h2>View the amount</h2>
            <hr />

            <div className={styles.tableContainer}>
                <Table />
            </div>

            <hr />
            <div className={styles.boxApply}>
            <button onClick={handleWithdraw} >Apply by {bank}</button>
            </div>
          </div>

          {
            error !== "" && <div className={styles.boxError}>
                {error !== "" && accept && <p className={styles.error}>{ error }</p>}
            </div>
          }

        </div>
      </div>
    </div>
    </div>
  )
}

export default PaymentPreviewWihdraw