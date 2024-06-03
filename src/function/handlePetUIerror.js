const handlePetUIerror = (error, id, navigate, setErrorMsg) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                setErrorMsg("로그인을 다시해주세요!");
                navigate('/sign-in');
                break;
            case 400:
                if (id === 'hands') {
                    setErrorMsg("하루 할당량을 모두 사용하였습니다!");
                } else if (id === 'feed') {//pet 알림 이용하기
                    setErrorMsg(`현재 할당량 모두 사용!\n각 시간대에 한번씩 사용가능! \n07:00 ~ 09:00\n12:00 ~ 14:00\n17:00 ~ 22:00`);
                }
                break;
            default:
                setErrorMsg("서버와 연결에 실패했습니다.");
        }
    } else {
        console.error("Error: ", error);
        setErrorMsg("에러: " + (error.message || "알 수 없는 에러가 발생했습니다."));
    }
};

export default handlePetUIerror;
