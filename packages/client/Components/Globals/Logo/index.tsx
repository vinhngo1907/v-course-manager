import React from 'react';
import styles from './index.module.css';
import * as icons from '@/constants/icons';

export default function logo(){
    return (
        <div className={styles.logo}>
            <img src={`${icons.LOGO}`} width='20' alt='logo' style={{outline: "none"}}/>
        </div>
    )
}