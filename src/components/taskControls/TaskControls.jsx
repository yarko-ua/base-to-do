import {useState} from 'react';
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {Modal, Button} from 'antd';
import { useStoreActions } from 'easy-peasy';

export const TaskControls  = ({index, isDone}) => {
  const buttonStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px'
  };

  const [isModalVisible, changeModalVisibility] = useState(false);

  const checkTask = useStoreActions(actions => actions.checkTask);
  const makeTaskDone = () => {
    checkTask(index);
    updateCount({type: 'check'});
  }

  const deleteTask = useStoreActions(actions => actions.deleteTask);
  const updateCount = useStoreActions(actions => actions.updateTasksCount);
  const onModalCancel = () => {
    changeModalVisibility(false);
  }
  const onModalOk = () => {
    changeModalVisibility(false);
    deleteTask(index);
    updateCount({type: 'del', target: isDone ? "checked" : "default"})
  }


  const showConfirmModal = () => {
    changeModalVisibility(true);
  };

  return (
    <>
    <Modal okText="Delete" onOk={onModalOk} onCancel={onModalCancel} title="Test title" visible={isModalVisible}>Are you shure you want to delete task from the list?</Modal>
      <Button onClick={showConfirmModal} style={buttonStyles} type="default" shape="circle" icon={<CloseCircleOutlined style={{fontSize: '30px', color: '#ff0000'}}/>} />
      {!isDone && <Button onClick={makeTaskDone} style={buttonStyles} type="default" shape="circle" icon={<CheckCircleOutlined style={{fontSize: '30px', color: '#00ff00'}}/>} /> }
    </>
  )
}