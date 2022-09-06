import React from 'react'
import styles from './Loader.module.css'

interface LoaderProp {
  width: string;
}

function Loader({width}: LoaderProp) {
  return (
    <div className={styles.loader}>
      <img style={{
        width
      }} src="/loader.svg" alt="" />
    </div>
  )
}

export default Loader