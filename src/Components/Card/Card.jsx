import styles from "./Card.module.css";
import { ReactComponent as WithdrawSvg } from "../../image/donation.svg";
import { ReactComponent as CreditCardSvg } from "../../image/credit-card.svg";
import { ReactComponent as StatsSvg } from "../../image/stats.svg";
import { ReactComponent as TicketSvg } from "../../image/ticket.svg";


const Card = () => {
  return (
    <div className={styles.cardChartx}>

    <div className={`${styles.cardOne} ${styles.mycard}`}>
        <div className={`${styles.svg1} ${styles.svg}`}>
          <CreditCardSvg className={styles.customStyleSvg} />
        </div>
  <div className={styles.description}>
      <span>0.00 USD</span>
      <p>Total deposit</p>
  </div>
</div>

    <div className={`${styles.cardTwo} ${styles.mycard}`}>
    <div className={`${styles.svg2} ${styles.svg}`}>
        <WithdrawSvg className={styles.customStyleSvg} />
    </div>
  <div className={styles.description}>
      <span>0.00 USD</span>
      <p>Total withdraw</p>
  </div>
</div>

<div className={`${styles.cardThree} ${styles.mycard}`}>
<div className={`${styles.svg3} ${styles.svg}`}>
  <StatsSvg className={styles.customStyleSvg} />
</div>
  <div className={styles.description}>
      <span>0.00 USD</span>
      <p>Total payment</p>
  </div>
</div>

<div className={`${styles.cardFour} ${styles.mycard}`}>
<div className={`${styles.svg4} ${styles.svg}`}>
  <TicketSvg className={styles.customStyleSvg} />
</div>
  <div className={styles.description}>
      <span>0</span>
      <p>Support ticket</p>
  </div>
</div>

    </div>
  )
}

export default Card