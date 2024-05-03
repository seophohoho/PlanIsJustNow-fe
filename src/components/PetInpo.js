import { useDispatch, useSelector } from "react-redux"
import { Form, Col, Button, Image, Stack } from 'react-bootstrap';
import InputFieldComponent from "./InputFieldComponent";
import { useEffect } from "react";

function PetInfo(props) {
    const { clickHandler, children, btnMessage, isDisabled, setIsLastChoice } = props;
    const dispatch = useDispatch();
    return (
        <Col md="5">
            <Stack className='center margin-bottom-10'>
                {children}
            </Stack>
            <Button 
            variant="primary" 
            className='font-bold' 
            onClick={()=>{
                if(setIsLastChoice !== undefined){setIsLastChoice(true)}
                clickHandler()
            }}
            {...(isDisabled !== undefined && { disabled: isDisabled })}
            >{console.log("start!", isDisabled)}
                {btnMessage}
            </Button>
        </Col>
    );
}

export default PetInfo