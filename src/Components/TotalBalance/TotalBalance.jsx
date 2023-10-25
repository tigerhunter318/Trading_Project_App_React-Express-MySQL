import React from 'react'
import styles from "./TotalBalance.module.css";
import { ReactComponent as Minus } from "../../image/minus.svg";
import { ReactComponent as Plus } from "../../image/plus.svg";
import { ReactComponent as Rocket } from "../../image/rocket.svg";
import { useHistory } from "react-router-dom";




const TotalBalance = ({ data, loading }) => {
  const history = useHistory();

  const openDepositPage = () => {
    history.push('/deposit');
  }

  const openWithdrawPage = () => {
    history.push('/withdraw');
  }

  const openTransactionPage = () => {
    history.push('/transactions');
  }
  
  return (
    <section className={styles.boxTotalBalance}>

      <div className={styles.boxTotal}>

        <h3>Total balance</h3>
        <span className={styles.total}>
          {/* {loading && <div className={styles.dots1}></div> } */}
          { 
           loading ? <div className={styles.dots1}></div> : data ? `${data.TotalBalance} USD`: `00.00 USD`
          }
        </span>

        <div className={styles.btnBox}>
        <button className={styles.btnDeposit} onClick={openDepositPage} >
            <Plus className={styles.plusSvg} />
            Deposit
        </button>

        <button className={styles.btnWithdraw} onClick={openWithdrawPage} >
        <Minus className={styles.minusSvg} />
        Withdraw
        </button>
        </div>
        
      </div>

        <button className={styles.btnView} onClick={openTransactionPage}>
          <Rocket className={styles.rocketSvg} />
          View all transaction
          </button>
    </section>
  )
}

export default TotalBalance