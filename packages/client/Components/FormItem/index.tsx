import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormItemProps {
    error?: FieldError;
    placeholder?: string;
    inputId: string;
    name: string;
    labelName: string;
    type: string;
    isFirstVisit?: boolean;
    register: UseFormRegisterReturn;
}

export default function FormItem({
    error,
    placeholder,
    inputId,
    name,
    labelName,
    type,
    isFirstVisit,
    register
}: FormItemProps) {
    const [data, setData] = useState('');
    const [computedClassName, setComputedClassName] = useState('');

    useEffect(() => {
        if (isFirstVisit) {
            setComputedClassName(error ? styles.errorInput : styles.validInput);
        }

    }, [error]);

    return (
        <div className={styles.formItem}>
            <label htmlFor={inputId}>{labelName}:</label>
            <input
                placeholder={placeholder}
                id={inputId}
                {...register}
                name={name}
                className={computedClassName}
                type={type}
                value={data}
                onChange={e => {
                    e.preventDefault();
                    setData(e.target.value);
                }}
            />
            {error && error.message && (
                <span className={styles.errorMessage}>
                    {error.message}
                </span>
            )}
        </div>
    )
}