import { Row, Col } from 'antd';
import {TaskControls} from '../taskControls/TaskControls';
import s from "./Task.module.css";

export const Task = ({text, index, isDone}) => {
  return (
    <Row className={`${s.task} ${isDone ? s.executed : s.default}`} 
      justify="space-between">
      <Col>
        <span>{text}</span>
      </Col>
      <Col>
        <TaskControls index={index} isDone={isDone}/>
      </Col>
    </Row> 
  )
}

