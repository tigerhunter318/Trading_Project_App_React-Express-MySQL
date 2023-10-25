import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./Menu.module.css";
import LogoutSvg from "./logout.svg";


const Menu = () => {
  return (
    <div className={styles.menu}>
    <ul className={styles.ul}>
      <div>
        <li className={styles.li}><Link className={styles.link} to="/homepage">Dashbord</Link></li>
        <li className={styles.li}><Link className={styles.link} to="/deposit">Deposit now</Link></li>
        <li className={styles.li}><Link className={styles.link} to="/withdraw">Withdraw</Link></li>
        <li className={styles.li}><Link className={styles.link} to="/transactions">Transaction log</Link></li>
      </div>
        <Link className={`${styles.link} ${styles.logout}`} to="/"><img src={LogoutSvg} alt="logout icon" /><span>Logout</span></Link>
    </ul>

</div>
  )
}

export default Menu