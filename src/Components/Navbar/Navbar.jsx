import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "../Logo/Logo";
import { useHistory } from "react-router-dom";

const Navbar = () => {

  const history = useHistory();


  return (
    <nav className={styles.navbar} id="nav">
      <div className={styles.container}>
      <Logo />
        <div className={styles.links}>
          <div>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
            <button className={styles.btnSignUp} onClick={()=> history.push('/signup')}>
              Sign up
            <div className={styles.arrowWrapper}>
            <div className={styles.arrow}></div>
            </div>
            </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar