import React, { useContext, useRef, useState } from "react";
import styles from "./index.module.css";
import { ModalTypeEnum } from "@/Components/Layouts";

type Props = {
    toggleModal: Function;
};
export interface FormData {
    password: string;
    re_password: string;
}

export default function ForgotPasswordModal({ toggleModal }: Props) {
    return(
        <></>
    )
}