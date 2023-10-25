import React, { useContext, useState } from 'react'
import styles from "./PassRecovery.module.css";
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import EmailConfirmation from '../Confirmation/EmailConfirmation';
import { DataContext } from '../context/DataContext';

const PassRecovery = () => {
  const { email, setEmail } = useContext(DataContext);

  const [emailError, setEmailError] = useState("");
  const [accept, setAccept] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [valid, setValid] = useState(undefined);


  const handleSendMail = async (e) => {
    e.preventDefault();
    setAccept(true);

      try {
        const user = { email };
        const response = await fetch('/recovery', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        });

        if (response.ok) {
          console.log("Data sent successfully!");
          setValid(true)          
   
        } else {
          console.error("Failed to send data.");
          setEmailError(response.status);
          const serverResponse = await response.text();
          setErrorMessage(serverResponse);
        }
      } catch (err) {
        console.log(err);
      }
  };


  return (
      <>
       { valid ? <EmailConfirmation redirectToChange={true} /> 
       
       :

      <>
      <div className={styles.boxPassRecovery}>
       <div className={styles.card}>
       <div className={styles.cardHeader}>
       <div className={styles.textHeader}>Forgot Password</div>
       </div>
 
       <div className={styles.cardBody}>
         <form onSubmit={handleSendMail}>
         <div className={styles.formGroup}>
           <label htmlFor="email">Email</label>
           <input type="text" id="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" required />
           {emailError === 400 && accept && <p className={styles.error}>{errorMessage}</p>}
         </div>
 
         <button className={styles.btn} type="submit">Send Email</button>
       </form>
 
       </div>
 
       <p className={styles.boxLink}>
         Don't have an account?
         <Link to="/signup" className={`${styles.boxLink} ${styles.link}`} > Sign up now</Link>
       </p>
     </div>
     </div>
    </> 

    }
    </>
  )
}

export default PassRecovery