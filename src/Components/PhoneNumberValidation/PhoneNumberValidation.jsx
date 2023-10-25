import styles from "./PhoneNumberValidation.module.css";
import { useContext } from 'react';
import { DataContext } from "../../context/DataContext";

// npm install react-phone-input-2 --save
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';



const PhoneNumberValidation = () => {
    const { phoneNumber, setPhoneNumber, valid, setValid, acceptSend, checkbox1Checked } = useContext(DataContext);
  
    const handleChange = (value) => {
      setPhoneNumber(value);
      setValid(validatePhoneNumber(value));
    };
  
    const validatePhoneNumber = (phoneNumber) => {
      const phoneNumberPattern = /^\+?[1-9]\d{8,14}$/;
      return phoneNumberPattern.test(phoneNumber);
    };

    
    return (
        <div className={styles.formGroup}>
          <label> Phone Number:
            <PhoneInput
              className={styles.input}
              country={'dz'}
              value={phoneNumber}
              onChange={handleChange}
              disabled={checkbox1Checked === "true"}
              inputProps={{
                required: true,
              }}
            />
            </label>
          {!valid && acceptSend && (
            <p className={styles.error}>Please enter a valid phone number.</p>
          )}
        </div>
      );
    };
    
    export default PhoneNumberValidation;