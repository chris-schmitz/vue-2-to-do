module.exports = {
    state:{
        notification:{
            show: false,
            message: null,
            type: 'error' // info, success, warning
        },
        activeStatus: 'All' // in progress, complete
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