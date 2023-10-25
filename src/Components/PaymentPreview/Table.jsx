import { useContext, useEffect } from "react";
import styles from "./PaymentPreview.module.css";
import { DataContext } from "../../context/DataContext";
import Cookies from "js-cookie"

const Table = () => {
    const { bank, setBank, amount, setAmount } = useContext(DataContext);

    useEffect(() => {
        const savedBank = Cookies.get('bank');
        if (savedBank) {
          setBank(savedBank);
        }
  
        const savedAmount = Cookies.get('amount');
        if (savedAmount) {
          setAmount(savedAmount);
        }

      }, [bank, amount]);


  return (
            <table className={styles.customTable}>
            <tbody>
              <tr>
                <td>Gateway name:</td>
                <td>{bank}</td>
              </tr>
              <tr>
                <td>Amount:</td>
                <td>{amount}.00</td>
              </tr>
              <tr>
                <td>Conversion rate:</td>
                <td>1 USD = 1.00 USD</td>
              </tr>
              <tr>
                <td>Total amount:</td>
                <td>{amount}.00 USD</td>
              </tr>
             </tbody>
            </table>
  )
}

export default Table