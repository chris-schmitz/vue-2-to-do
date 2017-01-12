// import mockTasks from './MockTasks'
import {bus, BusCommands} from './EventBus'
import Vue from 'vue'
import config from '../../config.js'

import axios from 'axios'
axios.defaults.baseURL = config.api.host

bus.$on(BusCommands.CREATENEWTASK, createNewTask)

function createNewTask(){
    let newTask = {
       title: null,
       description: null,
       complete: false,
       history: [] 
    }
    store.addTask(newTask)
    store.setSelectedTask(newTask)
    // We need to do it this way so that the TaskDetail.vue has time to render
    Vue.nextTick(() => bus.$emit(BusCommands.ENTEREDITMODE))
}

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
    loadAllTasks(){
        axios.get('tasks')
            .then(response => {
                this.setTasks(response.data.payload.tasks)
                this.setNotification({
                    message: 'Tasks loaded',
                    type: 'success'
                })
            })
            .catch(response => {
                console.error(response)
                this.setNotification({
                    message: 'Error loading tasks',
                    type: 'error'
                })
            })
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
    deleteTask(task, callback){
        let me = this
        axios.delete(`tasks/${task.id}?method=delete`)
            .then(response => {
                me.setTasks(me.getTasks().filter(storedTasks => storedTasks.id !== task.id))

                this.setNotification({
                    message: 'Task deleted',
                    type: 'success'
                })

                callback({success: true})
            })
            .catch(response => {
                console.error(response)
                this.setNotification({
                    message: 'Unable to delete task',
                    type: 'error'
                })
            })

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
    saveChangesToTask(task, callback){
        let success = () => {
            this.setNotification({
                message: 'Task saved',
                type: 'success'
            })
        }
        let failure = () => {
            this.setNotification({
                message: 'Unable to save task',
                type: 'error'
            })
        }

        debugger
        task = JSON.stringify(task) // need this for the python API. it needs valid json

        if(task.id !== undefined){
            let method = "patch"
            axios.patch(`tasks/${task.id}`, {method, task})
                .then(response => {
                    success()
                    callback(response.data)
                })
                .catch(response => {
                    failure()
                    console.error(response)
                })

        } else {
            let method = "patch"

            axios.post('tasks', {method, task})
                .then(response => {
                    task.id = response.data.payload[0].id
                    success()
                    callback(response.data)
                })
                .catch(response => {
                    failure()
                    console.error(response)
                })
        }
    },
    setNotification(payload = {message: 'Internal Error', type: 'error'}){
        this.state.notification.message = payload.message
        this.state.notification.type = payload.type
        this.state.notification.show = true
    },
    clearNotification(){
        this.state.notification.show = false
        this.state.notification.message = null
        this.state.notification.type = 'error'
    }
}

// store.setTasks(mockTasks.tasks)

module.exports = store