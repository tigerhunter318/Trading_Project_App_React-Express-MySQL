import styles from "./Main.module.css";
import Card from '../Card/Card';
import TotalBalance from '../TotalBalance/TotalBalance';
import TransactionTable from "../Transaction/TransactionTable";
import useFetch from "../../CustomHook/useFetch";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";


const Main = () => {
  const { setUserId, userId } = useContext(DataContext);
  const { data: totalBalance, loading, error, noContent } = useFetch(`/total/${userId}`);

  return (
    <div className={styles.boxContent}>

    <div className={styles.secondRow}>
         <Card />
        <div className={styles.cardCharty}>
        <TotalBalance data={totalBalance && totalBalance} loading={loading} />
        </div>
    </div>

    <div className={styles.thirdRow}>

    <TransactionTable hide={true} />
    
    </div>
</div>
  )
}

export default Main