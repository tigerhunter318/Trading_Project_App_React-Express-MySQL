import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import styles from "./ChangePassword.module.css";
import { DataContext } from "../context/DataContext";


const ChangePassword = () => {
    const { email } = useContext(DataContext);
    const [changePassword, setChangePassword] = useState("");
    const [accept, setAccept] = useState(false);

    const history = useHistory();

    const validatePassword = (inputPassword) => {
      const regex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
      return regex.test(inputPassword);
    };
   
    const HandleChange = async (e) => {
        e.preventDefault();
        setAccept(true);

        const isPasswordValid = validatePassword(changePassword);

        if (isPasswordValid) {
    
          try {
            const user = { changePassword, email };
            const response = await fetch('/changePassword', {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(user)
            });
    
            if (response.ok) {
              console.log("Data sent successfully!");
              history.push('/login');
              
            } else {
              console.error("Failed to send data.");
            }
          } catch (err) {
            console.log(err);
          }

        } else {
          console.log("Invalid data, not sending.");
        }
      };


  return (
    <div className={styles.boxChangePass}>
      <div className={styles.card}>
      <div className={styles.cardHeader}>
      <div className={styles.textHeader}>Forgot Password</div>
      </div>

      <div className={styles.cardBody}>
         <form onSubmit={HandleChange}>
         <div className={styles.formGroup}>
           <label htmlFor="password">Change Password</label>
           <input type="password" id="password" value={changePassword} onChange={(event) => setChangePassword(event.target.value)} placeholder="Enter new Password" required />
           {validatePassword(changePassword) === false && accept && <p className={styles.error}> password must be more than 8 characters and include a capital letter and at least one symbol such as @#..</p>}
         </div>
 
         <button className={styles.btn} type="submit">Change</button>
         </form> 
      </div>

     <p className={styles.boxLink}>
       Have an account?
        <Link to="/login" className={`${styles.boxLink} ${styles.link}`} > Log in</Link>
      </p>
    </div>
    </div>
  )
}

export default ChangePassword