import React, { useState } from 'react';
import styles from './ErrorModal.module.scss';
import Button from '../Button';

interface IErrorModal {
  errorMessage: string;
  onClose: () => void;
}

const ErrorModal: React.FC<IErrorModal> = ({ errorMessage, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className={styles.error}>
          <div className={styles.errorContent}>
            <Button
              className={styles.button}
              type="button"
              text="  &times;"
              onClick={handleClose}
            />
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorModal;
