import { Row, Col } from "antd"
import { useStoreState } from "easy-peasy"

export const Counter = props => {
  const doneTasksCount = useStoreState(state => state.tasksDoneCount);
  const undoneTasksCount = useStoreState(state => state.tasksUndoneCount);

  return (
    <Row justify="space-around">
      <Col span={10}>Done tasks: ({doneTasksCount})</Col>
      <Col span={10}>Undone taks: ({undoneTasksCount})</Col>
    </Row>
  )
}