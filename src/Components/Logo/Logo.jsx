import { Link } from "react-router-dom/cjs/react-router-dom.min"
import logo from "../../image/logo.png";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link to="#" >
        <img src={logo} width={"200px"} alt="logo" /> 
      </Link>
   </div>
  )
}

export default Logo