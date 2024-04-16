import { useDispatch, useSelector } from "react-redux"
import { Form, Col, Button, Image, Stack } from 'react-bootstrap';
import { selectPetName } from "../store/store"//수정할 함수 import 해야함

function PetInfo(props) {
    const { petName, petInpo, onClick } = props;
    const dispatch = useDispatch();
    return (
        <Col md="5">
            <Stack className='center margin-bottom-10'>
                <Image src="/700x460.png" fluid />
                <Stack direction='horizontal' gap={2} className='center margin-bottom-10'>
                    <Form.Label column sm="4" className='color-darkBlue'>
                        펫 이름
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="text"
                            placeholder={petName}
                            onChange={(e) => { dispatch(selectPetName(e.target.value)); }}
                        />
                    </Col>
                </Stack>
                <p className='color-lightPurple'>{petInpo}</p>
            </Stack>
            <Button variant="primary" className='font-bold' onClick={onClick}>
                이 펫으로 할래요!
            </Button>
        </Col>
    );
}

export default PetInfo