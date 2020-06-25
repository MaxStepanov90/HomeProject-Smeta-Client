import React from "react";
import {Toast} from "react-bootstrap";
import {MyToastMessageType} from "../../../utils/MyToastMessageType";

type MyToastProps = {
    show: boolean,
    type: string,
    message: string,
}

export const MyToast: React.FC<MyToastProps> = ({show, type, message}) => {

    const toastStyle: React.CSSProperties = {
        position: 'fixed',
        top: '10px',
        right: '10px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    };
    const toastBodyStyle = `border text-white ${type === MyToastMessageType.Success ?
        "border-success bg-success" : "border-danger bg-danger"}`

    const toastHeaderStyle = `text-white ${type === MyToastMessageType.Success ?
        "bg-success" : "bg-danger"}`

    const toastHeaderText = type === MyToastMessageType.Success ? "Успешно" : "Ошибка"

    return (
        <div style={{"display": show ? "block" : "none"}}>
            <div style={show ? toastStyle : undefined}>
                <Toast className={toastBodyStyle} show={show}>
                    <Toast.Header className={toastHeaderStyle} closeButton={false}>
                        <strong className="mr-auto">{toastHeaderText}</strong>
                    </Toast.Header>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </div>
        </div>
    );
}