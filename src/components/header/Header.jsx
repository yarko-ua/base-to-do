import {Row, Col} from 'antd';
import s from './Header.module.css';

export default function Header () {
  return (
    <header>
      <Row justify="center">
        <Col xs={23} sm={22} md={21} lg={20}>
          <h1 className={s.title}>Todo App</h1>
        </Col>
      </Row>
    </header>
  )
}