import mockTasks from './MockTasks'


let store = {
    state:{
        notification:{
            show: false,
            message: null,
            type: 'error' // info, success, warning
        },
        availableStatuses: ['All', 'In Progress', 'Complete'],
        activeStatus: 'All', // in progress, complete
        tasks:{
            list: [],
            selected: null
        }
    },
    setSelectedTask(task){
        this.state.tasks.selected = task
    },
    getSelectedTask(){
        return this.state.tasks.selected // || {title: 'test', description: 'test again'}
    },
    getTasks(){
        return this.state.tasks.list 
    },
    setTasks(tasks = []){
        this.state.tasks.list = tasks
    },
    addTask(task){
        this.state.tasks.list.push(task)
    },
    deleteTask(task){
        this.setTasks(this.getTasks().filter(storedTasks => storedTasks !== task))

        // Is there an advantage to doing it this way vs splice? It feels a bit safer
        // but do we gain safety at the expence of performance re: vue's reactivity? 

        // let index = this.getTasks().indexOf(task)
        // if(index > -1) this.getTasks().splice(index, 1)
    },
    getAvailableStatuses(){
        return this.state.availableStatuses
    },
    getActiveStatus(){
        return this.state.activeStatus
    },
    setActiveStatus(status){
        this.state.activeStatus = status
    },
    setNotification(payload = {message: 'Internal Error', type: 'error'}){
        this.state.notification.message = message
        this.state.notification.type = type
        this.state.notification.show = true
    },
    clearNotification(){
        this.state.notification.show = false
        this.state.notification.message = null
        this.state.notification.type = 'error'
    }
}

store.setTasks(mockTasks.tasks)

module.exports = store