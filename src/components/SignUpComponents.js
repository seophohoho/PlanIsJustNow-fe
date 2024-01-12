import { Form, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { serverUrl } from '../serverConfig';
import { useEffect, useState } from 'react';

function InputComponent(props){
  const {
    inputTitle, inputType, authCode,
    placeholder,classNames, email, passwordConfirm,
    btnMessage, password, nickname, isNextButtonDisabled,
    setEmail, setAuthCode, isNickName, setPasswordConfirm,
    isEmail, isPassword, isAuthCode, isInputDisabled, setIsInputDisabled,
    isPasswordConfirm, setIsNickName, setIsAuthCode,
    setIsEmail, setIsPassword,setIsNextButtonDisabled,
    setIsPasswordConfirm, setPassword, setNickname} = props 
 
  //유효성 메시지 상태저장
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')
  const [nickNameMessage, setNickNameMessage] = useState('')
  
  const [emailBtnReact, setEmailBtnReact] = useState(false)
  const [authBtnReact, setAuthBtnReact] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  
  useEffect(()=>{
    if(emailBtnReact){
      const copy = btnEmail(email)
      setIsButtonDisabled(copy)
      setIsEmail(!copy)
      if(isPassword && isPasswordConfirm && isNickName){setIsNextButtonDisabled(false)}
    }
    else{
      setIsNextButtonDisabled(true)
    }
    console.log('check '+ isPassword, isPasswordConfirm, isNickName)
  },[emailBtnReact])

  useEffect(()=>{
    if(authBtnReact){
      const copy = btnAuth(email, authCode)
      setIsAuthCode(copy)
      setIsInputDisabled(copy)
      if(isPassword && isPasswordConfirm && isNickName){setIsNextButtonDisabled(false)}
    }
    else{
      setIsNextButtonDisabled(true)
    }
    console.log('check '+ isPassword, isPasswordConfirm, isNickName)

  },[authBtnReact])

  useEffect(()=>{
    if(password){
      if(isValidPassword(password)){
        setIsPassword(true)
        setPasswordMessage("완벽해요!")
        if(isPassword && isPasswordConfirm && isNickName){setIsNextButtonDisabled(false)}
      }
      else {
        setIsPassword(false)
        setPasswordMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!")
        setIsNextButtonDisabled(true)
      }
    }
    console.log('check '+ isPassword, isPasswordConfirm, isNickName)
   
  },[password])
 
  useEffect(()=>{
    if(passwordConfirm){
      if(password === passwordConfirm){
        setIsPasswordConfirm(true)
        setPasswordConfirmMessage("완벽해요!")
        if(isPassword && isPasswordConfirm && isNickName){setIsNextButtonDisabled(false)}
        
      }
      else{
        setIsPasswordConfirm(false)
        setPasswordConfirmMessage("무언가 다른것 같아요..")
        setIsNextButtonDisabled(true)
      }
    }
    console.log('check '+ isPassword, isPasswordConfirm, isNickName)

  },[passwordConfirm])
  
  useEffect(()=>{
    if(nickname){
      if(isValidNickname(nickname)){
        setIsNickName(true)
        setNickNameMessage("완벽해요!")
        if(isPassword && isPasswordConfirm && isNickName){setIsNextButtonDisabled(false)}
      }
      else {
        setIsNickName(false)
        setNickNameMessage("최소 2글자는 입력! 특수문자 공백은 사용할 수 없어요!")
        setIsNextButtonDisabled(true)
      }
    }
    console.log('check '+ isPassword, isPasswordConfirm, isNickName)

  },[nickname])

  useEffect(()=>{

  },[])

  return(
    <>
      {//입력 컴포넌트 inputTitle의 배열 만큼 input 입력칸이 생기도록 설정
        inputTitle.map(function(notUse, i){
          return(
              <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                  <Col>
                    <Form.Label column>{/** label칸 */}
                      <p className='color-darkBlue'><span>*</span> { inputTitle[i] }</p> 
                    </Form.Label>
                  </Col>
                  <Col className='mb-3'>{/** input칸 */}
                    <Form.Control type={ inputType[i] } placeholder={ placeholder[i] } maxLength={i === 1 ? 6 : 20} className={classNames[i]} 
                    onInput={(e) => {
                      if (e.target.value.length > e.target.maxLength){
                        e.target.value = e.target.value.slice(0, e.target.maxLength);
                      }
                    }
                    }
                    disabled={i === 0 ? isInputDisabled : i === 1 ? isInputDisabled : ""}
                    onChange={(e)=>{
                      //내용에 따른 state 설정
                       if(i===0){
                        setEmail(e.target.value)
                      }
                      else if(i===1){
                        setAuthCode(e.target.value)
                        
                      }
                      else if(i===2){
                        setPassword(e.target.value)
                      }
                      else if(i===3){
                        setPasswordConfirm(e.target.value)
                      }
                      else if(i===4){
                        setNickname(e.target.value) 
                      }
                      if(isPassword && isPasswordConfirm && isNickName){setIsNextButtonDisabled(false)}

                      console.log('check '+isPassword, isPasswordConfirm, isNickName)
                    }}/>
                    <label className='border-zero impo-margin-zero '>
                      {i === 2 ? passwordMessage : i === 3 ? passwordConfirmMessage : i === 4 ? nickNameMessage : ''}
                    </label>
                  </Col>
                  <Col>
                    {
                      btnMessage[i]===false ? null : <Button as="input" type="button" value={ btnMessage[i] }
                      disabled={i === 1 ? isButtonDisabled : ""}//i가 인증보내기 칸이고 state또한 일치하면 버튼활성화
                      onClick={()=>{
                        if(i===0){ 
                          setEmailBtnReact(true)
                        };//통신 성공시 버튼 활성화
                        if(i===1){
                          setAuthBtnReact(true)
                        }
                      }}/>
                    }
                  </Col>
              </Form.Group>
        )})
      }
    </>
  )
}

//post 인증번호 확인 요청 & 인증번호 유효성확인
async function btnAuth(email, authCode){
  if (authCode.length === 6) {
      const response = await axios.post(`${serverUrl}/api/auth/check`, {
        "email": email,
        "code": authCode
      }).then((response)=>{
        if (response.status === 200) {
          alert("인증이 완료되었어요!");
          return true;
        } 
        else{
          alert("잘못된 인증코드입니다.");
          return false;
        }  
      })
      .catch((error)=>{
        alert(error + ": 인증과정 중 문제가 발생했습니다. 나중에 다시 시도해주세요");
        return false;
      })
  }
  else {
    alert("인증번호 6자리를 입력해야합니다!");
    return false;
  }
}
  
function btnEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,6}$/;

  // return은 실패, 성공에 따른 인증확인 버튼 활성화 상태 반환용
  if (emailRegex.test(email)) {
      axios.post(`${serverUrl}/api/auth/mail`, {"email": email}).then((Response)=>{
      if (Response.status === 200) {
        alert("인증메일이 발송됐어요!");
        return false;
      } else if (Response.status === 409) {
        alert("이미 사용중인 이메일입니다!");
        return true;
      }}).catch((error)=>{
         alert(error + ": 메일발송에 실패했습니다. 잠시후 다시 시도해주세요");
        return true;
      })
    }
  else {
    alert("이메일 양식을 다시 확인해주세요..");
    return true;
  }
}

function isValidPassword(password){
  const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/
  return regex.test(password);
}

function isValidNickname(nickname) {
  const regex =/^[a-zA-Z가-힣]{2,20}$/;
  return regex.test(nickname);
}


export default InputComponent