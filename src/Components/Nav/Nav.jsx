import { useContext } from "react";
import styles from "./Nav.module.css";
import { useHistory } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import user from "../../image/751-13.jpg"

const Nav = () => {
  const { firstName, fatherName } = useContext(DataContext);

    const history = useHistory();

    const handle = () =>{
        history.push('/');
    }

    console.log(firstName, fatherName);


  return (
    <nav className={styles.nav}>
    <div className={styles.box}>
    <button onClick={handle} className={styles.btnHome}>Visit home</button>
    <div className={styles.boxUser}>
      <div>{`${firstName} ${fatherName}`}</div>
      <img className={styles.user} src={user} alt="user" />
    </div>
    </div>
    </nav>
  )
}

export default Nav