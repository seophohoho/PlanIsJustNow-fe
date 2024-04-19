import { Form } from 'react-bootstrap';

function InputFieldComponent(props){
    const { type, placeholder, onChangeHandler } = props

    return(
        <Form.Control
            type={type}
            placeholder={placeholder}
            onChange={onChangeHandler} // 입력된 펫 이름 기억함수 필요
        />
    )
}

export default InputFieldComponent