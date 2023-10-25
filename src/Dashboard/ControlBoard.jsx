import styles from "./ControlBoard.module.css";
import { useState } from 'react';
import Dashboard from "./Dashboard";



const ControlBoard = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [accept, setAccept] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openDashboard, setOpenDashboard] = useState(false);
    
    
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setAccept(true);

        try {
          const admin = { username, password };
          const response = await fetch('/admin-login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(admin)
          });
  
          if (response.ok) {
            console.log("Data sent successfully!");
            setOpenDashboard(true);
  
          } else {
            console.error("Failed to send data.");
            const serverResponse = await response.text();
            setErrorMessage(serverResponse);
          }
        } catch (err) {
          console.log(err);
        }
    };
  
    return (
        <>
            {
                openDashboard ? <Dashboard /> : 

                <div className={styles.boxLogin}>
        <div className={styles.card}>
    <div className={styles.cardHeader}>
      <div className={styles.textHeader}>Admin Login Page</div>
    </div>
  
    <div className={styles.cardBody}>
      <form onSubmit={handleSubmit}>
        
        <div className={styles.formGroup} >
          <label htmlFor="username">Username:</label>
          <input required value={username} onChange={(event) => setUsername(event.target.value)} id='username' type="text" placeholder='Username' />
        </div>
  
        <div className={styles.formGroup} >
          <label htmlFor="password">Password:</label>
          <input required value={password} onChange={(event) => setPassword(event.target.value)} id="password" type="password" placeholder='Password' />
        </div>
  
        {errorMessage && accept && <p className={styles.error}>{errorMessage}</p>}
  
       <input type="submit" className={styles.btn} value="Login" />    
       </form>
    </div>
  
  </div>
      </div>
            }
        </>
  )
}

export default ControlBoard