import { Form, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import serverUrl from '../serverConfig'
import { useEffect, useState } from 'react';
//ㅋㅋ 이건 컴포넌트가 아니라 사실상 page 실수했다.. 다음엔 컴포넌트 답게 만들어야겠다..
function InputComponent(props){
  const {
    inputTitle, inputType, authCode,
    placeholder,classNames, email, passwordConfirm,
    btnMessage, password, nickname, isEmail,
    setEmail, setAuthCode, isNickName, setPasswordConfirm,
    isPassword, isAuthCode, isInputDisabled, setIsInputDisabled,
    setIsNickName, setIsAuthCode,
    setIsEmail, setIsPassword,setIsNextButtonDisabled,
    setPassword, setNickname} = props 
 
  //유효성 메시지 상태저장
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')
  const [nickNameMessage, setNickNameMessage] = useState('')
  
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  
  useEffect(()=>{
    const passwordRegex = /^[a-z\d!@*&-_]{8,20}$/;
    if (password === '') {
      setPasswordMessage('');
      setIsPassword(false)
    } 
    else if (!passwordRegex.test(password)) {
      setPasswordMessage('비밀번호는 8~20자의 영소문자, 숫자, !@*&-_만 입력해주세요!');
      setIsPassword(false)
    } 
    else if (passwordConfirm !== password) {
      setPasswordMessage('');
      setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
      setIsPassword(false)
    }  
    else {
      setPasswordMessage('완벽해요');
      setPasswordConfirmMessage('완벽해요');
      setIsPassword(true)
    }
  },[password, passwordConfirm])
  
  useEffect(()=>{
    if(nickname!== ""){
      if(isValidNickname(nickname)){
        setIsNickName(true)
        setNickNameMessage("완벽해요!")
      }
      else {
        setIsNickName(false)
        setNickNameMessage("최소 2글자는 입력! 특수문자 공백은 사용할 수 없어요!")
        setIsNextButtonDisabled(true)
      }
    }
  },[nickname])

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
                    value={i===0 ? email : i===1 ? authCode : i===2 ? password : i===3 ? passwordConfirm : i===4 ? nickname : ""}
                    onInput={(e) => {
                      const value = e.target.value
                      if (e.target.value.length > e.target.maxLength){
                        e.target.value = e.target.value.slice(0, e.target.maxLength);
                      }
                      if (i === 2) {
                        setPassword(value);
                      } else if (i === 3) {
                        setPasswordConfirm(value);
                      }
                      if(isPassword && isNickName){setIsNextButtonDisabled(false)}
                      else{
                        setIsNextButtonDisabled(true)
                      }
                    }
                    }
                    disabled={i === 0 ? isInputDisabled : i === 1 ? isInputDisabled : ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (i === 0) {
                        setEmail(value);
                      } else if (i === 1) {
                        setAuthCode(value);
                      } else if (i === 2 || i === 3) {
                        if(i===2)setPassword(value)
                        else if(i===3)setPasswordConfirm(value)
                      } else if (i === 4) {
                        setNickname(value);
                      }

                    }}/>
                    <label className='border-zero impo-margin-zero '>
                      {i === 2 ? passwordMessage : i === 3 ? passwordConfirmMessage : i === 4 ? nickNameMessage : ''}
                    </label>
                  </Col>
                  <Col>
                    {
                      btnMessage[i]===false ? null : <Button as="input" type="button" value={ btnMessage[i] }
                      disabled={i === 1 ? isButtonDisabled : ""}//i가 인증보내기 칸이고 state또한 일치하면 버튼활성화
                      onClick={() => {
                        if (i === 0) {
                          btnEmail(email).then(copy=>{
                            setIsButtonDisabled(copy);
                            setIsEmail(!copy);
                          if(isPassword && isNickName){setIsNextButtonDisabled(false)}
                          })
                        };
                        if(i===1){
                          btnAuth(email, authCode).then(copy=>{
                            setIsAuthCode(copy)
                            setIsInputDisabled(!copy)
                            if(isPassword && isNickName){setIsNextButtonDisabled(false)}
                          })
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
  
async function btnEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,6}$/;

  // return은 실패, 성공에 따른 인증확인 버튼 활성화 상태 반환용
  if (emailRegex.test(email)) {
    try {
      const Response = await axios.post(`${serverUrl}/api/auth/mail`, {"email": email});

      if (Response.status === 200) {
        alert("인증메일이 발송됐어요!");
        return false;
      } else if (Response.status === 409) {
        alert("이미 사용중인 이메일입니다!");
        return true;
      }
    } catch (error) {
      alert(error + ": 메일발송에 실패했습니다. 잠시후 다시 시도해주세요");
      return true;
    }
  } else {
    alert("이메일 양식을 다시 확인해주세요..");
    return true;
  }
}

function isValidNickname(nickname) {
  const regex =/^[a-zA-Z가-힣]{2,20}$/;
  return regex.test(nickname);
}


export default InputComponent