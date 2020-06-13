import React from "react";
import {Toast} from "react-bootstrap";

interface MyToastProps {
    show: boolean,
    type: string,
    message: string,
}

export const MyToast: React.FC<MyToastProps> = ({show, type, message}) => {

    const toastCss: React.CSSProperties = {
        position: 'fixed',
        top: '10px',
        right: '10px',
        // zIndex: '1',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    } ;

    return (
        <div style={{"display": show ? "block" : "none"}}>
            <div style={show ? toastCss : undefined}>
                <Toast className={`border text-white ${type === "success" ?
                    "border-success bg-success" : "border-danger bg-danger"}`}
                       show={show}>
                    <Toast.Header className={`text-white ${type === "success" ?
                        "bg-success" : "bg-danger"}`} closeButton={false}>
                        <strong className="mr-auto">Успешно</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {message}
                    </Toast.Body>
                </Toast>
            </div>
        // </div>
    );
}
