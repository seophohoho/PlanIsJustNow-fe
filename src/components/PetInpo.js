import { useDispatch, useSelector } from "react-redux"
import { Form, Col, Button, Image, Stack } from 'react-bootstrap';
import InputFieldComponent from "./InputFieldComponent";

function PetInfo(props) {
    const { clickHandler, children, btnMessage } = props;
    const dispatch = useDispatch();
    return (
        <Col md="5">
            <Stack className='center margin-bottom-10'>
                {children}
            </Stack>
            <Button variant="primary" className='font-bold' onClick={clickHandler}>
                {btnMessage}
            </Button>
        </Col>
    );
}

export default PetInfo