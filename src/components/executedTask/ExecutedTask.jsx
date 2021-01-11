// import style from "./executedTask.module.css";
import {TaskControls} from '../taskControls/TaskControls';

export const ExecutedTask = ({text }) => {
  return (
    <div>
      <span>{text}</span>
      <TaskControls />
    </div>
  )
}