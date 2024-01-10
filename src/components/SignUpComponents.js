import { Form, Col, Row, Button, Container, Navbar, Image } from 'react-bootstrap';
import axios from 'axios';
import { serverUrl } from '../serverConfig';
import { useState } from 'react';

{ 
  //TODO 이메일: 전달전 양식 올바른지 판단(빈값, @ 있는지) 정규표현식
  //TODO 사용자: 인증번호 전송 버튼을 누르지 않고 해당 버튼을 누르는 경우
  //todo 비밀번호: 보안양식과 일치하는지 확인
  //todo 비밀번호: 재확인 일치한지 확인
  //todo 닉네임: 중복확인 기능 필요 --> 유저id로 처리할거고 본인 이름으로 하는 것도 있을 텐데? 이메일 중복만 판단하도록 변경
  //Todo InputComponent-onChange: 5개의 input 양식 조건 state 구현후 map 순서따라 할당(상세내용 app.js Todo확인)
  //todo 102 line
}

function InputComponent(props){
  const {
    inputTitle, inputType, authCode,
    placeholder,classNames, email,
    btnMessage, addr, password, nickname,
    setEmail, setAuthCode, isNickName,
    isEmail, isPassword, isAuthCode,
    isPasswordConfirm, setIsNickName, setIsAuthCode,
    setIsEmail, setIsPassword,setIsNextButtonDisabled,
    setIsPasswordConfirm, setPassword, setNickname} = props 
 
  //유효성 메시지 상태저장
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')
  const [nickNameMessage, setNickNameMessage] = useState('')

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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
                      if (e.target.value.length > e.target.maxLength)
                        e.target.value = e.target.value.slice(0, e.target.maxLength);
                    }}
                    onChange={(e)=>{
                      //다음 버튼 활성화 조건
                      if(isNickName && isAuthCode && isPassword && isPasswordConfirm && isEmail){setIsNextButtonDisabled(false)}
                      //내용에 따른 state 설정
                      if(i===0){setEmail(e.target.value);}
                      else if(i===1){setAuthCode(e.target.value)}
                      else if(i===2){
                        setPassword(e.target.value)
                        if(isValidPassword(password)){
                          setPasswordMessage("완벽해요!")
                          setIsPassword(true)
                        }
                        else {
                          setPasswordMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!")
                          setIsPassword(false)
                        }
                      }
                      else if(i===3){
                        if(password === e.target.value){
                          setPasswordConfirmMessage("완벽해요!")
                          setIsPasswordConfirm(true)
                        }
                        else{
                          setPasswordConfirmMessage("무언가 다른것 같아요..")
                          setIsPasswordConfirm(false)
                        }
                      }
                      else if(i===4){
                        setNickname(e.target.value)
                        if(isValidNickname(nickname)){
                          setNickNameMessage("완벽해요!")
                          setIsNickName(true)
                        }
                        else {setNickNameMessage("최소 2글자는 입력! 특수문자 공백은 사용할 수 없어요!")
                              setIsNickName(false)}
                      }
                      console.log(isEmail, isAuthCode, isPassword, isPasswordConfirm, isNickName)
                      
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
                        if(i==0){
                          const copy = btnEmail(addr[i], email)
                          setIsButtonDisabled(copy)
                          setIsEmail(!copy)
                        };//통신 성공시 버튼 활성화
                        setIsAuthCode(btnAuth(addr[i], email, authCode))
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
function btnAuth(addr, email, authCode){
  if(addr==="api/auth/check" && (authCode.length === 6)){
    axios.post(`${serverUrl}/api/auth/check`, {
        "email" : email,
        "code" : authCode
      }).then((Response)=>{
        if(Response.status === 200){alert("인증이 완료되었어요!");return true}
        else{alert("잘못된 인증코드입니다.");return false}
      }).catch((error)=>{alert(error+":인증과정 중 문제가 발생했습니다. 나중에 다시 시도해주세요");return false}
    ); return true
  }
  else{alert("인증번호 6자리를 입력해야합니다!");return false}
}
  
//post 이메일 인증 보내기 요청 & 이메일 유효성확인
function btnEmail(addr, email){
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  //return은 실패,성공에 따른 인증확인 버튼 활성화 상태 반환용
  if(addr==="api/auth/mail" && emailRegex.test(email)){
    axios.post(`${serverUrl}/api/auth/mail`, {"email" : email})
      .then((Response)=>{
        if(Response.status === 200){
          alert("인증메일이 발송됐어요!"); 
          return false
        } 
        else if(Response.status === 409){
          alert("이미 사용중인 이메일입니다!");
          return true
        }
      }
    ).catch((error)=>{alert(error+":메일발송에 실패했습니다. 잠시후 다시 시도해주세요");return true})
  }
  else{alert("이메일 양식을 다시 확인해주세요..");return true}
}

function isValidPassword(password){
  const Regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/
  return Regex.test(password);
}

function isValidNickname(nickname) {
  //20자 이내 확인->html로 제한
  const regex = /^[a-zA-Z가-힣0-9]{2,20}$/;
  return regex.test(nickname);
}


export default InputComponent