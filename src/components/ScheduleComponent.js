import {Col, Row, Dropdown, DropdownButton} from "react-bootstrap"

function Schedule(){
    return(
        <Row className='section__item-schedule'>
            <Col sm={2} className='text-center'><input type='checkbox'/></Col>
            <Col sm={7} className='m-auto'>sample</Col>
            <Col sm={1} className='m-auto'>
                <input type="checkbox" id="cb1"/>
            </Col>
            <Col sm={2} className='m-auto'>
                <DropdownButton drop="start" variant="secondary">{/**디자인 초기화 아니면 다른요소 제작 후 클릭이벤트 구현 */}
                    <Dropdown.Item eventKey="1">일정 수정</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="2">삭제</Dropdown.Item>
                </DropdownButton>             
            </Col>
        </Row>
    )
}

export default Schedule