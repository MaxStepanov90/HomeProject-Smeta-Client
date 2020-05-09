import React from "react";
import Table from "react-bootstrap/Table";
import * as PropTypes from "prop-types";

export default function PaymentListTable({payments}){

    return(
        <Table bordered hover striped>
            <thead>
            <tr>
                <th scope="col">Дата платежа</th>
                <th scope="col-3">Смета</th>
                <th scope="col">Сумма</th>
                <th scope="col">Комментарий</th>
            </tr>
            </thead>
            <tbody>
            {payments.length === 0 ?
                <tr align="center">
                    <td colSpan="6">Нет информации по платежам</td>
                </tr> :
                payments.map((payment) => (
                    <tr key={payment.id}>
                        <td>{payment.date}</td>
                        <td>{payment.estimateName}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.comment}</td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
    )
}
PaymentListTable.propTypes={
    payments: PropTypes.array.isRequired,
}