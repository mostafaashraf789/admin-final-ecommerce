import React from 'react'
import styles from './spinner.module.css'
function Spinner({size =50, color = "#3498db"}) {
    return (
        <div className={styles.spinnercontainer}>
          <div 
            className={styles.spinner}
            style={{ width: size, height: size, borderColor: `${color} transparent ${color} transparent` }}
          ></div>
        </div>
      );
}

export default Spinner
