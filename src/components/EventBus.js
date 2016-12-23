import Vue from 'vue'

exports.bus = new Vue()

exports.BusCommands = {
    CREATENEWTASK: 'createNewTask',
    ENTEREDITMODE: 'editmode'
}