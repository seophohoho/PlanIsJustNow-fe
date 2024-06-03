import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

function ErrorComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <Result
      status={state?.status || 'error'}
      title={state?.statusTitle || 'Error'}
      subTitle={state?.subTitle || 'Something went wrong.'}
      extra={<Button type="primary" onClick={handleNavigate}>홈으로 가기</Button>}
    />
  );
}

export default ErrorComponent;
