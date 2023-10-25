import { useContext, useEffect, useState } from "react";
import useFetch from "../CustomHook/useFetch";
import styles from "./Dashboard.module.css";
import { DataContext } from "../context/DataContext";
import Cookies from "js-cookie";
import DeleteIcon from "./Delete.svg";

const Dashboard = () => {
  const { data: transactions, loading, error, noContent } = useFetch(`/transactions`);
  const {
          shouldReload, setShouldReload, 
          checkbox1Checked, setCheckbox1Checked, 
          checkbox2Checked, setCheckbox2Checked, 
          checkbox3Checked, setCheckbox3Checked, 
          checkbox4Checked, setCheckbox4Checked 
        } = useContext(DataContext);

  const [showOperations, setShowOperations] = useState(false);
  const [hiddenRows, setHiddenRows] = useState([]);



  const handleHideRow = (rowId) => {
    console.log(rowId);
    const updatedHiddenRows = [...hiddenRows, rowId];
    setHiddenRows(updatedHiddenRows);
    console.log(updatedHiddenRows);
  // حفظ الصفوف المخفية في ملف تعريف الارتباط
  Cookies.set("hiddenRows", updatedHiddenRows);
  };
  


  useEffect(() => {
    const savedCheck1 = Cookies.get('check1');
    if (savedCheck1) {
      // تحويل القيمة المسترجعة إلى نوع البيانات الصحيح (boolean)
      setCheckbox1Checked(savedCheck1 === "true");
    }

    const savedCheck2 = Cookies.get('check2');
    if (savedCheck2) {
      setCheckbox2Checked(savedCheck2 === "true");
    }

    const savedCheck3 = Cookies.get('check3');
    if (savedCheck3) {
      setCheckbox3Checked(savedCheck3 === "true");
    }

    const savedCheck4 = Cookies.get('check4');
    if (savedCheck4) {
      setCheckbox4Checked(savedCheck4 === "true");
    }

      // استرداد الصفوف المخفية من ملف تعريف الارتباط
      const savedHiddenRows = Cookies.get("hiddenRows");
      if (savedHiddenRows) {
        setHiddenRows(savedHiddenRows.split(",").map(Number));
      }

  }, [checkbox1Checked, checkbox2Checked, checkbox3Checked, checkbox4Checked]);
  

  const handleCheckbox1Change = () => {
    setCheckbox1Checked(!checkbox1Checked);
    Cookies.set("check1", !checkbox1Checked);
  };

  const handleCheckbox2Change = () => {
    setCheckbox2Checked(!checkbox2Checked);
    Cookies.set("check2", !checkbox2Checked);
  };

  const handleCheckbox3Change = () => {
    setCheckbox3Checked(!checkbox3Checked);
    Cookies.set("check3", !checkbox3Checked);
  };

  const handleCheckbox4Change = () => {
    setCheckbox4Checked(!checkbox4Checked);
    Cookies.set("check4", !checkbox4Checked);
  };




  const handleActionReject = async (e) => {
    const transactionId = e.target.value;
    const decision = 'Rejected';

    const response = await fetch(`/transaction-rejected`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId, decision })
    });
      if (response.ok) {
        console.log("The rejection process is successful");
        setShouldReload(!shouldReload);

      } else {
        console.error("Cancellation failed");
      }
  };

  const handleActionDeposit = async (e) => {
    const transactionId = e.target.value;
    const decision = 'Accepted';
    const transactionType = 'deposit';

    const response = await fetch(`/accept-withdrawal-deposit`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId, decision, transactionType })
    });
      if (response.ok) {
        console.log("The admission process is successful");
        setShouldReload(!shouldReload);

      } else {
        console.error("Acceptance failed");
      }
  };


  const handleActionWithdrawal = async (e) => {
    const transactionId = e.target.value;
    const decision = 'Accepted';
    const transactionType = 'withdrawal';

    const response = await fetch(`/accept-withdrawal-deposit`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId, decision, transactionType })
    });
      if (response.ok) {
        console.log("The withdrawal process was successful");
        setShouldReload(!shouldReload);

      } else {
        console.error("Withdrawal failed");
      }
  }




  return (
    <div className={styles.dashboard}>
      <h1 className={styles.h1}>Dashboard</h1>
        <div className={styles.container}>
            <h2 className={styles.h2}>Processing investor requests</h2>

            <div className={styles.adminContainer}>
            <table className={styles.adminTable}> 
              <thead>
                <tr>
                  <th className={styles.stickyHeader}>Investor Name</th>
                  <th className={styles.stickyHeader}>Amount</th>
                  <th className={styles.stickyHeader}>Request Type</th>
                  <th className={styles.stickyHeader}>Action</th>
                </tr>
              </thead>
              <tbody>
                { loading && <div className={styles.classic1} >Loading...</div> }
                { error && <div className={styles.error} >{ error }</div> }
                { !loading && noContent && <div>No transaction found</div> }
                { transactions && transactions.transactionsUsers.map((transaction) => {
                  
                  const user = transactions.usersNames.find((user) => user.UserID === transaction.UserID);
                  
                  return (
                    <tr key={transaction.TransactionID}>
                      { transaction.Status === "Accepted" || transaction.Status === "Rejected" ?
                      <>
                      <td hidden>{user ? `${user.FirstName} ${user.FatherName}` : "The investor is unknown" }</td>
                      <td hidden>${transaction.Amount}</td>
                      <td hidden>{transaction.TransactionType}</td>
                      <td hidden>
                        {
                          transaction.TransactionType === 'deposit' ? 
                            <button className={styles.acceptBtn} value={transaction.TransactionID} onClick={handleActionDeposit} >Accept</button> 
                            : 
                            <button className={styles.acceptBtn} value={transaction.TransactionID} onClick={handleActionWithdrawal} >Accept</button>
                        }

                        <button className={styles.rejectBtn} value={transaction.TransactionID} onClick={handleActionReject} >Reject</button>
                      </td>
                      </>
                      :
                      <>
                        <td>{user ? `${user.FirstName} ${user.FatherName}` : "The investor is unknown" }</td>
                        <td>${transaction.Amount}</td>
                        <td>{transaction.TransactionType}</td>
                        <td>
                        {
                          transaction.TransactionType === 'deposit' ? 
                            <button className={styles.acceptBtn}  value={transaction.TransactionID} onClick={handleActionDeposit} >Accept</button>
                            : 
                            <button className={styles.acceptBtn}  value={transaction.TransactionID} onClick={handleActionWithdrawal} >Accept</button>
                        }

                          <button className={styles.rejectBtn} value={transaction.TransactionID} onClick={handleActionReject} >Reject</button>
                        </td>
                      </>
                      }
                    </tr>
                  );
                })}
        </tbody>
            </table>
            </div>

            <hr className={styles.hr} />

            <h2 className={styles.h2} >Finished operations</h2>
            <button className={styles.btn} onClick={()=> setShowOperations(!showOperations) }><span>Show completed operations</span></button>

            { showOperations &&
              <div className={styles.adminContainer}>
            <table className={styles.adminTable}> 
              <thead>
                <tr>
                  <th className={styles.stickyHeader}>Deletion</th>
                  <th className={styles.stickyHeader}>Status</th>
                  <th className={styles.stickyHeader}>Amount</th>
                  <th className={styles.stickyHeader}>Request Type</th>
                  <th className={styles.stickyHeader}>Investor Name</th>
                </tr>
              </thead>
              <tbody>
              { loading && <div className={styles.classic1} >Loading...</div> }
                { error && <div className={styles.error} >{ error }</div> }
                { !loading && noContent && <div>No transaction found</div> }
                { transactions && transactions.transactionsUsers
                  .filter(transaction => !hiddenRows.includes(transaction.TransactionID)) // تصفية الصفوف بناءً على القائمة المخفية
                  .map((transaction) => {
                  
                  const user = transactions.usersNames.find((user) => user.UserID === transaction.UserID);


                  return (
                    <tr key={transaction.TransactionID} >
                      { transaction.Status === "processing" ? 
                      <>
                      <td hidden>
                        <button className={`${styles.tooltip} ${styles.button}`}  onClick={() => handleHideRow(transaction.TransactionID)}> 
                            <img src={DeleteIcon} alt="icon delete" />
                            <span className={styles.tooltiptext}>remove</span>
                        </button>
                      </td>
                      <td hidden>{transaction.Status}</td>
                      <td hidden>${transaction.Amount}</td>
                      <td hidden>{transaction.TransactionType}</td>
                      <td hidden>{user ? `${user.FirstName} ${user.FatherName}` : "The investor is unknown" }</td>
                      </>
                      :
                      <>
                        <td>
                        <button className={`${styles.tooltip} ${styles.button}`} onClick={() => handleHideRow(transaction.TransactionID)}>
                            <img src={DeleteIcon} alt="icon delete" />
                            <span className={styles.tooltiptext}>remove</span>
                        </button>
                        </td>
                        <td className={styles[transaction.Status]} >{transaction.Status}</td>
                        <td>${transaction.Amount}</td>
                        <td>{transaction.TransactionType}</td>
                        <td>{user ? `${user.FirstName} ${user.FatherName}` : "The investor is unknown" }</td>
                      </>
                      }
                    </tr>
                  );

                })}
              </tbody>
            </table>
              </div>
            }
            <hr className={styles.hr} />

            <h2 className={styles.h2}>Site control room</h2>

            <div className={styles.featuresBox}>
              <ul className={styles.ul}>
                <li>
                  <label htmlFor="1">Stop creating a new account</label>
                  <input className={styles.input} id="1" type="checkbox" checked={checkbox1Checked} onChange={handleCheckbox1Change} />
                </li>
                <li>
                  <label htmlFor="2">Stop depositing</label> 
                  <input className={styles.input} id="2" type="checkbox" checked={checkbox2Checked} onChange={handleCheckbox2Change} />
                </li>
                <li>
                  <label htmlFor="3">Stop dragging</label> 
                  <input className={styles.input} id="3" type="checkbox" checked={checkbox3Checked} onChange={handleCheckbox3Change} />
                </li>
                <li>
                  <label htmlFor="4">Allow cancellation of withdrawal</label> 
                  <input className={styles.input} id="4" type="checkbox" checked={checkbox4Checked} onChange={handleCheckbox4Change} />
                </li>
              </ul>
            </div>

        </div>
    </div>

  )
}

export default Dashboard