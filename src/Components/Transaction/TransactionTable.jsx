import { useContext, useEffect, useState } from "react";
import useFetch from "../../CustomHook/useFetch";
import styles from "./TransactionTable.module.css";
import Cookies from "js-cookie";
import { DataContext } from "../../context/DataContext";





const TransactionTable = ({ hide }) => {
    const { setUserId, userId, shouldReload, setShouldReload, checkbox4Checked, setCheckbox4Checked } = useContext(DataContext);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState('processing');
    const { data: transactions, loading, error, noContent } = useFetch(`/transactions/${userId}`);
    
    
    useEffect(() => {
        const savedUserID = Cookies.get('userID');
        if (savedUserID) {
          setUserId(savedUserID);
        }

        const savedCheck4 = Cookies.get('check4');
        if (savedCheck4) {
          setCheckbox4Checked(savedCheck4 === "true");
        }

      }, [userId, checkbox4Checked]);



      const deleteTransaction = async (e) => {
        const id = e.target.value;

        const response = await fetch(`/transaction/${id}`, {
          method: 'DELETE',
        });
            if (response.ok) {
              console.log("The deletion process succeeded");
              setShouldReload(!shouldReload);
            } else {
              console.error("Delete failure.");
            }
      };
  
  
      const formatDate = (date) => {
        const transactionDate = new Date(date);
      
        const year = transactionDate.getFullYear(); // السنة
        const month = (transactionDate.getMonth() + 1).toString().padStart(2, "0"); // الشهر
        const day = transactionDate.getDate().toString().padStart(2, "0"); // اليوم
      
        return `${year}-${month}-${day}`;
      }


  return (
    <div className={styles.tableContainer}>
  <table className={styles.customTable}>
    <thead>
      <tr>
        {hide ? <th hidden >PROCEDURE</th> : <th className={styles.stickyHeader}>PROCEDURE</th>}
        {hide ? <th className={styles.stickyHeader} >ORDER STATUS</th> : <th className={styles.stickyHeader}>STATUS</th>}
        {hide ? <th  hidden >PAYMENT METHOD</th> : <th className={styles.stickyHeader}>PAYMENT METHOD</th>}
        {hide ? <th className={styles.stickyHeader}>VALUE</th> : <th className={styles.stickyHeader}>AMOUNT</th>}
        {hide ? <th className={styles.stickyHeader}>DETAILS</th> : <th className={styles.stickyHeader}>TYPE</th>}
        <th className={styles.stickyHeader} >DATE</th>
      </tr>
    </thead>
    <tbody>
        { loading && <div className={styles.loading} >Loading...</div> }
        { error && <div className={styles.error} >{ error }</div> }
        { !loading && noContent && <div className={styles.notFound} >No transaction found</div> }
        {transactions && transactions.map(transaction => (
                <tr key={transaction.TransactionID}>
                {hide ? <td hidden >{<button 
                                            disabled={disabled}
                                            onClick={deleteTransaction} 
                                            value={transaction.TransactionID} 
                                            >Cancel the operation</button>}
                                            </td> : <td>{transaction.Status === processing && <button 
                                                                className={styles.button}
                                                                disabled={checkbox4Checked} 
                                                                onClick={deleteTransaction} 
                                                                value={transaction.TransactionID} 
                                                                >Cancel</button>}</td>}
                <td><span  className={styles[transaction.Status]}>{transaction.Status}</span></td>
                {hide ? <td hidden >{transaction.PaymentMethod}</td> : <td>{transaction.PaymentMethod}</td>}
                <td>${transaction.Amount}</td>
                <td>{transaction.TransactionType}</td>
                <td>{formatDate(transaction.TransactionDate)}</td>
              </tr>
        ))}
    </tbody>
  </table>
</div>
  )
}

export default TransactionTable