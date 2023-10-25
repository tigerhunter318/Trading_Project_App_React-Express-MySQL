import PhoneNumberValidation from '../Components/PhoneNumberValidation/PhoneNumberValidation';
import styles from './SignUp.module.css';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { DataContext } from '../context/DataContext';
import Cookies from "js-cookie";


const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [lastName, setLastName] = useState("");
  const { phoneNumber, valid, setAcceptSend, checkbox1Checked, setCheckbox1Checked } = useContext(DataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [accept, setAccept] = useState(false);

  const history = useHistory();


  useEffect(() => {
    const savedCheck1 = Cookies.get('check1');
    if (savedCheck1) {
      setCheckbox1Checked(savedCheck1);
    }
  }, [checkbox1Checked]);


  const validatePassword = (inputPassword) => {
    const regex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return regex.test(inputPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccept(true);
    setAcceptSend(true); // Send Number Phone
  
    const isPasswordValid = validatePassword(password) && confirmPassword === password;
  
    if (isPasswordValid && valid) {
      try {
        const user = { firstName, fatherName, lastName, phoneNumber, email, password, confirmPassword };
        const response = await fetch('/register', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        });
  
        if (response.ok) {
          console.log("Data sent successfully!");
          history.push('/confirmation');

        } else {
          console.error("Failed to send data.");
          setEmailError(response.status);
        }
        
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Invalid data, not sending.");
    }
  };


  return (
    <div className={styles.boxRegister}>
      {checkbox1Checked === "true" && <div className={styles.boxError}>⚠️ Registration has been closed by the supervisor until further notice!</div>}
      <div className={styles.card}>
  <div className={styles.cardHeader}>
    <div className={styles.textHeader}>Register</div>
  </div>

  <div className={styles.cardBody}>
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="firstName">First Name:</label>
        <input disabled={checkbox1Checked === "true"} required value={firstName} onChange={(event) => setFirstName(event.target.value)} id='firstName' type="text" placeholder='First Name' />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="fatherName">Father's Name:</label>
        <input disabled={checkbox1Checked === "true"} required value={fatherName} onChange={(event) => setFatherName(event.target.value)} id='fatherName' type="text" placeholder="Father's Name" />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="lastName">Last Name:</label>
        <input disabled={checkbox1Checked === "true"} value={lastName} onChange={(event) => setLastName(event.target.value)} id='lastName' type="text" placeholder='Last Name' />
      </div>

      <PhoneNumberValidation />
      
      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input disabled={checkbox1Checked === "true"} required value={email} onChange={(event) => setEmail(event.target.value)} id='email' type="email" placeholder='Email' />
        {emailError === 400 && accept && <p className={styles.error}>Wrong email or password!</p>}
      </div>

      <div className={styles.formGroup} >
        <label htmlFor="password">Password:</label>
        <input disabled={checkbox1Checked === "true"} required value={password} onChange={(event) => setPassword(event.target.value)} id="password" type="password" placeholder='Password' />
        {validatePassword(password) === false && accept && <p className={styles.error}> password must be more than 8 characters and include a capital letter and at least one symbol such as @#..</p>}
      </div>

      <div className={styles.formGroup} >
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input disabled={checkbox1Checked === "true"} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} id="confirm-password" type="password" placeholder='Confirm Password' />
        {confirmPassword !== password && accept && <p className={styles.error}>Password dose not match</p>}
      </div>

     <input disabled={checkbox1Checked === "true"} type="submit" className={styles.btn} value="Register" />    
     </form>
     <p className={styles.boxLink} >
       Have an account?
        <Link to="/login" className={`${styles.boxLink} ${styles.link}`} > Log in</Link>
      </p>
  </div>

</div>

    </div>
  )
}

export default SignUp;