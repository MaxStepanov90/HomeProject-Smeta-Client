import React, {FormEvent, useState} from "react";
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen, faPlus, faSave} from "@fortawesome/free-solid-svg-icons";
import {MyToast} from "../../Generic/MyToast/MyToast";
import {useDispatch, useSelector} from "react-redux";
import {Category} from "../../../utils/Category";
import {IRootState} from "../../../interfaces/IRootState";
import {saveNewEstimateDetail} from "../../../service/actions/estimateDetailActions";

interface RouterProps {
    estimateId: any;
}

interface EstimateDetailFormProps extends RouterProps {
    history: any
}

const EstimateDetailForm: React.FC<EstimateDetailFormProps> = ({history}) => {

    const dispatch = useDispatch()

    const show = useSelector((state: IRootState) => state.app.show)
    const messageText = useSelector((state: IRootState) => state.app.messageText)
    const messageType = useSelector((state: IRootState) => state.app.messageType)

    const id = history.location.state.estimateId
    const [estimateDetailFormName, setEstimateDetailFormName] = useState('')
    const [estimateDetailFormUnit, setEstimateDetailFormUnit] = useState('')
    const [estimateDetailFormQuantity, setEstimateDetailFormQuantity] = useState(0)
    const [estimateDetailFormPrice, setEstimateDetailFormPrice] = useState(0)
    const [estimateDetailFormCategory, setEstimateDetailFormCategory] = useState('работы')

    const submitEstimateDetail = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const newEstimateDetail = {
            name: estimateDetailFormName,
            unit: estimateDetailFormUnit,
            quantity: estimateDetailFormQuantity,
            price: estimateDetailFormPrice,
            category: estimateDetailFormCategory,
            estimateId: id
        };
        dispatch(saveNewEstimateDetail(newEstimateDetail))
        setTimeout(() => estimateDetailList(id), 1000)

        setEstimateDetailFormName('')
        setEstimateDetailFormUnit('')
        setEstimateDetailFormQuantity(0)
        setEstimateDetailFormPrice(0)
    };

    const estimateDetailList = (estimateId: number): void => {
        return history.push("/estimate/" + estimateId)
    };

    const estimateDetailNameInputField =
        <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Наименование позиции</Form.Label>
            <Form.Control required autoComplete="off"
                          type="test" name="name"
                          value={estimateDetailFormName}
                          onChange={e => setEstimateDetailFormName(e.target.value)}
            />
        </Form.Group>

    const estimateDetailUnitInputField =
        <Form.Group as={Col} controlId="formGridUnit">
            <Form.Label>Ед.изм.</Form.Label>
            <Form.Control required autoComplete="off"
                          type="test" name="unit"
                          value={estimateDetailFormUnit}
                          onChange={e => setEstimateDetailFormUnit(e.target.value)}
            />
        </Form.Group>

    const estimateDetailQuantityInputField =
        <Form.Group as={Col} controlId="formGridQuantity">
            <Form.Label>Количество</Form.Label>
            <Form.Control required autoComplete="off"
                          type="test" name="quantity"
                          value={estimateDetailFormQuantity}
                          onChange={e => setEstimateDetailFormQuantity(parseInt(e.target.value))}
            />
        </Form.Group>

    const estimateDetailPriceInputField =
        <Form.Group as={Col} controlId="formGridPrice">
            <Form.Label>Цена</Form.Label>
            <Form.Control required autoComplete="off"
                          type="test" name="price"
                          value={estimateDetailFormPrice}
                          onChange={e => setEstimateDetailFormPrice(parseInt(e.target.value))}
            />
        </Form.Group>

    const estimateDetailCategoryInputField =
        <Form.Group as={Col} controlId="formGridCategory">
            <Form.Label>Категория</Form.Label>
            <Form.Control required as="select"
                          custom onChange={e => setEstimateDetailFormCategory(e.target.value)}
                          name="category"
                          value={estimateDetailFormCategory}>
                <option value={Category.Works}>{Category.Works}</option>
                <option value={Category.Materials}>{Category.Materials}</option>
            </Form.Control>
        </Form.Group>

    return (
        <Container>
            <MyToast show={show} message={messageText} type={messageType}/>
            <Card className={"border border-dark"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faPlus}/>&nbsp;Новая позиция
                </Card.Header>
                ` <Form onSubmit={submitEstimateDetail} id="estimateDetailFormId">
                <Card.Body>
                    <Form.Row>
                        {estimateDetailNameInputField}
                    </Form.Row>
                    <Form.Row>
                        {estimateDetailUnitInputField}
                        {estimateDetailQuantityInputField}
                        {estimateDetailPriceInputField}
                        {estimateDetailCategoryInputField}
                    </Form.Row>
                </Card.Body>
                <Card.Footer style={{"textAlign": "right"}}>
                    <Button size="sm" variant="success" type="submit">
                        <FontAwesomeIcon icon={faSave}/>&nbsp;Сохранить
                    </Button>{' '}
                    <Button size="sm" variant="info" type="button"
                            onClick={() => estimateDetailList(id)}>
                        <FontAwesomeIcon icon={faFolderOpen}/>&nbsp;Вернуться назад
                    </Button>
                </Card.Footer>
            </Form>
            </Card>
        </Container>
    )
}
export default EstimateDetailForm