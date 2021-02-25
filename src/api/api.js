const baseURI = 'http://localhost:3004';

const todoAPI = {
  getTasks: () => {
    return  fetch(`${baseURI}/tasks`)
              .then(response => response.json())
  },
  getTask: (id) => {
    return fetch(`${baseURI}/tasks/${id}`)
    .then(response => response.json());
  },
  addTask: (task) => {
    const data = {
      "task": task,
      "waiting": false,
      "waiting_time" : 0,
      "creation_time": Date.now(),
      "execute_time": 0,
      "executed": false,
    }
    return  fetch(`${baseURI}/tasks`, 
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},  
        body: JSON.stringify(data)
      }) 
      .then(response => response.json()) 
  },
  executeTask: async (id) => {
    // const $this = this;
    // this.getTask(id);
    const task = await todoAPI.getTask(id);  
    task.executed = true;

    return fetch(`${baseURI}/tasks/${id}`,
    {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task)
    }).then(response => response.json())
  }
}

export default todoAPI;