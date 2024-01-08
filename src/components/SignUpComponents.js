import { InputGroup, Form, Col, Row, Button, Container, Navbar, Image } from 'react-bootstrap';
import axios from 'axios';

{ 
  //TODO InputComponent-onChange: value 갱신될 때마다 app.js의 각각의 state에 갱신
  //Todo InputComponent-onChange: 5개의 input 양식 조건 state 구현후 map 순서따라 할당(상세내용 app.js Todo확인)
}

function InputComponent(props){
    const {inputTitle, inputType, placeholder, classNames, btnMessage, addr, data, email, setEmail} = props 
    return(
      <>
        {
          inputTitle.map(function(notUse, i){
            return(
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Col>
                      <Form.Label column>
                        <p className='color-darkBlue'><span>*</span> { inputTitle[i] }</p> 
                      </Form.Label>
                    </Col>
                    <Col className='mb-3'>
                      <Form.Control type={ inputType[i] } placeholder={ placeholder[i] } className={classNames[i]} onChange={(e)=>{
                        //---testing
                        setEmail(e.target.value)
                        //---만약 i 0일때 1일때 각각 조정 아니면 다같이처리? -> 리소스 낭비인 것 같은데
                      }}/>
                    </Col>
                    <Col>
                      {
                        btnMessage[i]===false ? null : <Button as="input" type="button" value={ btnMessage[i] } onClick={()=>{
                          btnFeat(addr[i], data[i])
                        }}/>
                      }
                    </Col>
                </Form.Group>
            )})
        }
      </>
    )
}

function btnFeat(addr, data){
    try{
        axios.post(`http://localhost:8080/${addr}`, data)}
    catch(error){
      alert(error + "디버그용: 올바르게 작동하지 않음!")
    }
}
  

export default InputComponent