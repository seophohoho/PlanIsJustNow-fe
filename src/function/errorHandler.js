let lastAlertTime = 0;
const alertThrottleDuration = 1000; // 1초

const showAlert = (message) => {
  const currentTime = new Date().getTime();
  if (currentTime - lastAlertTime > alertThrottleDuration) {
    alert(message);
    lastAlertTime = currentTime;
  }
};

const handleError = (error, navigate) => {
  if (error.response) { // error.response가 있는지 먼저 확인함
    if (error.response.status === 401) { // 토큰 만료 리다이렉트
      showAlert("로그인을 다시해주세요!");
      navigate('/sign-in');
    } 
    else if (error.response.status === 403) {
      navigate('/connect-status', { state: { status: 403, statusTitle: 403, subTitle: '권한이 없습니다.' } });
    } 
    else if (error.response.status === 404) {
      navigate('/connect-status', { state: { status: 404, statusTitle: 404, subTitle: '찾을 수 없는 페이지입니다.' } });
    } 
    else if (error.response.status === 405) {
      navigate('/connect-status', { state: { status: 405, statusTitle: 405, subTitle: '허용되지 않은 메서드입니다.' } });
    } 
    else if (error.response.status === 500) {
      navigate('/connect-status', { state: { status: 500, statusTitle: 500, subTitle: '서버 에러가 발생했습니다.' } });
    } 
    else {
      showAlert("서버와 연결에 실패했습니다.");
    }
  } else if (error.request) { // Network Error
    navigate('/connect-status', { state: { statusTitle: 'Network Error', subTitle: '네트워크 오류가 발생했습니다. 다시 시도해 주세요.' } });
  } else {
    if (error.message) {
      showAlert("에러: " + error.message);
    } else {
      showAlert("알 수 없는 에러가 발생했습니다.");
    }
  }
};

export default handleError;
