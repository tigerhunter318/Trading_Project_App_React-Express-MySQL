import styles from "./Banks.module.css";
import { banks } from "./data";
import Modal from '../Modal/Modal';
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"
import { DataContext } from "../../context/DataContext";


const Banks = ({ changing }) => {
    const { isModalOpen, setModalOpen, amount, setAmount, toSwitch, setToSwitch, checkbox2Checked, setCheckbox2Checked, checkbox3Checked, setCheckbox3Checked } = useContext(DataContext);
    const [accept, setAccept] = useState(false);
    const [error, setError] = useState("");
    const [shouldReload, setShouldReload] = useState(false);

    const history = useHistory();

    useEffect(() => {
      if (shouldReload) {
        // إعادة تحميل الصفحة فقط إذا كانت shouldReload تساوي true
        window.location.reload();
      }
    }, [shouldReload]);

    useEffect(() => {
      const savedCheck2 = Cookies.get('check2');
      if (savedCheck2) {
        setCheckbox2Checked(savedCheck2 === "true");
      }
    }, [checkbox2Checked]);



      const openModal = (e) => {
        Cookies.set('bank', e.target.value);
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setAccept(false);
        setModalOpen(false);
      };

      const previewDeposit = () => {
        setAccept(true);
        if(amount === ''){
          setModalOpen(true);
        }else {
          setModalOpen(false);
          setShouldReload(true);
          history.push('/payment-preview-deposit');
        }
      };

      const previewWithdraw = () => {
        setAccept(true);
        if(amount === ''){
          setModalOpen(true);
        }else {
          setModalOpen(false);
          setToSwitch(true);
          history.push('/payment-preview-wihdraw');
        }
      };

      const handleInputChange = (e) => {
        const inputValue = e.target.value;
    
        // التحقق من أن الإدخال يحتوي على أرقام فقط
        if (/^\d*$/.test(inputValue)) {
          setAmount(inputValue);
          Cookies.set('amount', inputValue);
        }
      };



  return (
    <>
        { changing ?
            banks.map(bank => 
                <div className={styles.BoxPaymentMethod} key={bank.id}>
                  <img src={bank.img} width={"181px"} alt={bank.title} />
                  <h4>{bank.title}</h4>
                  <button disabled={checkbox3Checked} onClick={openModal} value={bank.title} >Pay now</button>
            </div>
            )
            : 
            banks.map(bank => 
              <div className={styles.BoxPaymentMethod} key={bank.id}>
                <img src={bank.img} width={"181px"} alt={bank.title} />
                <h4>{bank.title}</h4>
                <button disabled={checkbox2Checked} onClick={openModal} value={bank.title} >Pay now</button>
          </div>
          )
        }

        { changing ?
                  <Modal className={styles.modal} isOpen={isModalOpen} onClose={closeModal}>
                      <h2>Withdraw amount</h2>
                      <hr />
                      <div className={styles.formGroup}>
                        <label htmlFor="amount">Amount:</label>
                        <input required value={amount} onChange={handleInputChange} id='amount' type="tel" placeholder='Enter amount' />
                        {amount === '' && accept && <p className={styles.error}>Please enter the deposit amount.</p>}
                      </div>
                      <hr />
                      <div className={styles.boxBtn}>
                      <button className={styles.btnClose} onClick={closeModal}>Close</button>
                      <button className={styles.btnDeposit} onClick={previewWithdraw}>Withdraw now</button>
                      </div>
                  </Modal> 
                  :
                  <Modal className={styles.modal} isOpen={isModalOpen} onClose={closeModal}>
                      <h2>Deposit amount</h2>
                      <hr />
                      <div className={styles.formGroup}>
                        <label htmlFor="amount">Amount:</label>
                        <input required value={amount} onChange={handleInputChange} id='amount' type="tel" placeholder='Enter amount' />
                        {amount === '' && accept && <p className={styles.error}>Please enter the deposit amount.</p>}
                      </div>
                      <hr />
                      <div className={styles.boxBtn}>
                      <button className={styles.btnClose} onClick={closeModal}>Close</button>
                      <button className={styles.btnDeposit} onClick={previewDeposit}>Deposit now</button>
                      </div>
                  </Modal>
        }
    </>
  )
}

export default Banks

