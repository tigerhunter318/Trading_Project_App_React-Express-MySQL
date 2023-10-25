import React from 'react';
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
      <div className={styles.modalContent}>
        {children}
      </div>
    </div>
  );
}

export default Modal;