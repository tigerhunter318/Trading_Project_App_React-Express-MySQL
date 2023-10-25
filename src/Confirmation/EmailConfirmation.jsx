import styles from "./EmailConfirmation.module.css";
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import ChangePassword from "../ChangePassword/ChangePassword";


const EmailConfirmation = ({ redirectToChange }) => {
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [ shouldRedirect, setShouldRedirect] = useState(undefined);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [inputValues, setInputValues] = useState(['', '', '', '']);
  const [acceptOne, setAcceptOne] = useState(false);
  const [acceptTwo, setAcceptTwo] = useState(false);

  const [changePass, setChangePass] = useState(undefined);

  const history = useHistory();

  const handleBack = () => {
    history.go(-1);
  }

  useEffect(()=>{
    setShouldRedirect(redirectToChange);
  }, [redirectToChange])



  const HandleMailConfirmation = async (e) => {
    e.preventDefault();
    setAcceptOne(true)
    setInputValues([value1, value2, value3, value4]);
  };
  
  useEffect(() => {
    const valid = inputValues.length > 0 && inputValues.every(item => item !== "");
  
    if (acceptOne && valid) {
      (async () => {
        try {
          const response = await fetch(`/confirmation`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputValues })
          });
  
          if (response.ok) {
            setConfirmationMessage('Your email has been confirmed successfully!');
            console.log('Your email has been confirmed successfully!');
            history.push('/login');
          } else {
            setConfirmationMessage('Confirmation failed. The code is invalid or has already been used.');
            console.log('Confirmation failed. The code is invalid or has already been used.');
          }
        } catch (error) {
          console.error('Error occurred: ', error);
          setConfirmationMessage('An error occurred during confirmation.');
          console.log('An error occurred during confirmation.');
        }
      })();
    } else if(acceptOne) {
      setConfirmationMessage('Please enter a valid number.');
      console.log('Please enter a valid number.');
    }
  }, [inputValues, history]);




  const HandleConfirmOwnership = async (e) => {
    e.preventDefault();
    setAcceptTwo(true);
    setInputValues([value1, value2, value3, value4]);
    console.log(acceptTwo);
  };

  useEffect(() => {
    const valid = inputValues.length > 0 && inputValues.some(item => item !== "");
  
    if (acceptTwo && valid) {
      (async () => {
        try {
          const response = await fetch(`/confirm`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputValues })
          });
  
          if (response.ok) {
            setConfirmationMessage('Your email has been confirmed successfully!');
            console.log('Your email has been confirmed successfully!');
            setChangePass(true);
          } else {
            setConfirmationMessage('Confirmation failed. The code is invalid or has already been used.');
            console.log('Confirmation failed. The code is invalid or has already been used.');
          }
        } catch (error) {
          console.error('Error occurred: ', error);
          setConfirmationMessage('An error occurred during confirmation.');
          console.log('An error occurred during confirmation.');
        }
      })();
    } else if(acceptTwo) {
      setConfirmationMessage('Please enter a valid number.');
      console.log('Please enter a valid number.');
    }
  }, [inputValues, history]);


  return (
    <>
     { changePass ? <ChangePassword /> :
     (shouldRedirect ? 
     <div className={styles.boxConfirmation}>
     <p>Please confirm your email</p>
 <form onSubmit={HandleConfirmOwnership} className={styles.form}>
<h3 className={styles.heading}>Verify</h3>
<svg className={styles.check} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="60px" height="60px" viewBox="0 0 60 60" space="preserve">  
<image id="image0" width="60" height="60" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
cwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0NDzN/r+StAAACR0lEQVRYw+3Yy2sTURTH8W+bNgVf
aGhFaxNiAoJou3FVEUQE1yL031BEROjCnf4PLlxILZSGYncuiiC48AEKxghaNGiliAojiBWZNnNd
xDza3pl77jyCyPzO8ubcT85wmUkG0qT539In+MwgoxQoUqDAKDn2kSNLlp3AGi4uDt9xWOUTK3xg
hVU2wsIZSkxwnHHGKZOxHKfBe6rUqFGlTkPaVmKGn6iYao1ZyhK2zJfY0FZ9ldBzsbMKxZwZjn/e
5szGw6UsD5I0W6T+hBhjUjiF7bNInjz37Ruj3igGABjbtpIo3GIh30u4ww5wr3fwfJvNcFeznhBs
YgXw70TYX2bY/ulkZhWfzfBbTdtrzjPFsvFI+T/L35jhp5q2owDs51VIVvHYDM9sa/LY8XdtKy1l
FXfM8FVN2/X2ajctZxVXzPA5TZvHpfb6CFXxkerUWTOcY11LX9w0tc20inX2mmF4qG3upnNWrOKB
hIXLPu3dF1x+kRWq6ysHpkjDl+7eQjatYoOCDIZF3006U0unVSxIWTgTsI3HNP3soSJkFaflMDwL
3OoHrph9YsPCJJ5466DyOGUHY3Epg2rWloUxnMjsNw7aw3AhMjwVhgW4HYm9FZaFQZ/bp6QeMRQe
hhHehWKXGY7CAuSpW7MfKUZlAUqWdJ3DcbAAB3guZl9yKC4WYLfmT4muFtgVJwvQx7T2t0mnXK6J
XlGGyAQvfNkaJ5JBmxnipubJ5HKDbJJsM0eY38QucSx5tJWTVHBwqDDZOzRNmn87fwDoyM4J2hRz
NgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMi0xM1QxMzoxNTo1MCswMDowMKC8JaoAAAAldEVY
dGRhdGU6bW9kaWZ5ADIwMjMtMDItMTNUMTM6MTU6NTArMDA6MDDR4Z0WAAAAKHRFWHRkYXRlOnRp
bWVzdGFtcAAyMDIzLTAyLTEzVDEzOjE1OjUxKzAwOjAwIIO3fQAAAABJRU5ErkJggg=="></image>
</svg>
<div className={styles.box}>
<input className={styles.input}  type="tel" maxLength={"1"} value={value1} onChange={(e) => setValue1(e.target.value)} />
<input className={styles.input}  type="tel" maxLength={"1"} value={value2} onChange={(e) => setValue2(e.target.value)} /> 
<input className={styles.input}  type="tel" maxLength={"1"} value={value3} onChange={(e) => setValue3(e.target.value)} />
<input className={styles.input} type="tel" maxLength={"1"} value={value4} onChange={(e) => setValue4(e.target.value)} />
</div>
<button type="submit" className={styles.btn1}>Verify</button>
<button onClick={handleBack} className={styles.btn2}>Back</button>
</form>
<h3 className={styles.error}>{confirmationMessage}</h3>
 </div> 
 
 :
 
 <div className={styles.boxConfirmation}>
     <p>Please confirm your email</p>
 <form onSubmit={HandleMailConfirmation} className={styles.form}>
<h3 className={styles.heading}>Verify</h3>
<svg className={styles.check} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="60px" height="60px" viewBox="0 0 60 60" space="preserve">  
<image id="image0" width="60" height="60" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
cwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0NDzN/r+StAAACR0lEQVRYw+3Yy2sTURTH8W+bNgVf
aGhFaxNiAoJou3FVEUQE1yL031BEROjCnf4PLlxILZSGYncuiiC48AEKxghaNGiliAojiBWZNnNd
xDza3pl77jyCyPzO8ubcT85wmUkG0qT539In+MwgoxQoUqDAKDn2kSNLlp3AGi4uDt9xWOUTK3xg
hVU2wsIZSkxwnHHGKZOxHKfBe6rUqFGlTkPaVmKGn6iYao1ZyhK2zJfY0FZ9ldBzsbMKxZwZjn/e
5szGw6UsD5I0W6T+hBhjUjiF7bNInjz37Ruj3igGABjbtpIo3GIh30u4ww5wr3fwfJvNcFeznhBs
YgXw70TYX2bY/ulkZhWfzfBbTdtrzjPFsvFI+T/L35jhp5q2owDs51VIVvHYDM9sa/LY8XdtKy1l
FXfM8FVN2/X2ajctZxVXzPA5TZvHpfb6CFXxkerUWTOcY11LX9w0tc20inX2mmF4qG3upnNWrOKB
hIXLPu3dF1x+kRWq6ysHpkjDl+7eQjatYoOCDIZF3006U0unVSxIWTgTsI3HNP3soSJkFaflMDwL
3OoHrph9YsPCJJ5466DyOGUHY3Epg2rWloUxnMjsNw7aw3AhMjwVhgW4HYm9FZaFQZ/bp6QeMRQe
hhHehWKXGY7CAuSpW7MfKUZlAUqWdJ3DcbAAB3guZl9yKC4WYLfmT4muFtgVJwvQx7T2t0mnXK6J
XlGGyAQvfNkaJ5JBmxnipubJ5HKDbJJsM0eY38QucSx5tJWTVHBwqDDZOzRNmn87fwDoyM4J2hRz
NgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMi0xM1QxMzoxNTo1MCswMDowMKC8JaoAAAAldEVY
dGRhdGU6bW9kaWZ5ADIwMjMtMDItMTNUMTM6MTU6NTArMDA6MDDR4Z0WAAAAKHRFWHRkYXRlOnRp
bWVzdGFtcAAyMDIzLTAyLTEzVDEzOjE1OjUxKzAwOjAwIIO3fQAAAABJRU5ErkJggg=="></image>
</svg>
<div className={styles.box}>
<input className={styles.input}  type="tel" maxLength={"1"} value={value1} onChange={(e) => setValue1(e.target.value)} />
<input className={styles.input} type="tel" maxLength={"1"} value={value2} onChange={(e) => setValue2(e.target.value)} /> 
<input className={styles.input}  type="tel" maxLength={"1"} value={value3} onChange={(e) => setValue3(e.target.value)} />
<input className={styles.input}  type="tel" maxLength={"1"} value={value4} onChange={(e) => setValue4(e.target.value)} />
</div>
<button type="submit" className={styles.btn1}>Verify</button>
<button onClick={handleBack} className={styles.btn2}>Back</button>
</form>
<h3 className={styles.error}>{confirmationMessage}</h3>
 </div>
 )}
  </>
  )
}

export default EmailConfirmation;