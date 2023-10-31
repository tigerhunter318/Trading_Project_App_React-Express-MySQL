import styles from "./LogIn.module.css"
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "js-cookie";


const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [accept, setAccept] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccept(true);

      try {
        const user = { email, password };
        const response = await fetch('/login', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        });

        if (response.ok) {
          console.log("Data sent successfully!");
          // استخراج النص من الاستجابة
          const responseText = await response.text();
          // تحويل النص إلى كائن JSON
          const responseData = JSON.parse(responseText);

          const FirstName = responseData.FirstName;
          const FatherName = responseData.FatherName;
          const UserID = responseData.userID;
  
          Cookies.set('firstName', FirstName);
          Cookies.set('fatherName', FatherName);
          Cookies.set('userID', UserID);

          history.push('/homepage');

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
    <div className={styles.boxLogin}>
      <div className={styles.card}>
  <div className={styles.cardHeader}>
    <div className={styles.textHeader}>Login</div>
  </div>

  <div className={styles.cardBody}>
    <form onSubmit={handleSubmit}>
      
      <div className={styles.formGroup} >
        <label htmlFor="email">Email:</label>
        <input required value={email} onChange={(event) => setEmail(event.target.value)} id='email' type="email" placeholder='Email' />
      </div>

      <div className={styles.formGroup} >
        <label htmlFor="password">Password:</label>
        <input required value={password} onChange={(event) => setPassword(event.target.value)} id="password" type="password" placeholder='Password' />
      </div>

      {errorMessage && emailError === 400 && accept && <p className={styles.error}>{errorMessage}</p>}

     <input type="submit" className={styles.btn} value="Login" />    
     </form>
      <p className={styles.boxLink}>
        <Link to="/recovery" className={`${styles.boxLink} ${styles.link}`} >Forgot password?</Link>
      </p>
      <p className={styles.boxLink}>
        Don't have an account?
        <Link to="/signup" className={`${styles.boxLink} ${styles.link}`} > Sign up now</Link>
      </p>
  </div>

</div>
    </div>
  )
}

export default LogIn