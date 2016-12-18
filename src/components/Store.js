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
        tasks: []
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
    },
    getTasks(){
        return this.state.tasks
    },
    setTasks(tasks = []){
        this.state.tasks = tasks
    },
    addTask(task){
        this.state.tasks.push(task)
    }
}

store.setTasks(mockTasks.tasks)

module.exports = store