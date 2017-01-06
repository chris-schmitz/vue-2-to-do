<template>
    <div class="task-list-container">
        <ul class="task-list" :class="{'plank': displayStyle === 'plank'}">
            <li
                class="task-list-item"
                :class="{'complete': task.complete, 'tile': displayStyle === 'tile', 'plank': displayStyle === 'plank'}"
                v-for="task in tasksByFilter"
                @click="showDetails(task)"
            >
                <span >{{ task.title }}</span>
                <button @click.stop="deleteItem(task)" class="fa fa-close"></button>
            </li>
        </ul>

        <!-- 
        <button @click='toggleListDisplay'>Toggle</button>
         -->

    </div>
</template>

<script>
    import Store from './Store'
    import TaskDetail from './TaskDetail.vue'

    module.exports = {
        components:{TaskDetail},
        data(){
            return {
                displayStyle: 'tile' // plank
            }
        },
        computed:{
            tasks:{
                get(){
                    return Store.getTasks()
                },
                set(tasks){
                    Store.setTasks(tasks)
                }
            },
            tasksByFilter(){
                debugger
                return Store.getTasks()
                    .filter(task => {
                        if(Store.getActiveStatus() === "In Progress"){
                            return task.complete 
                        } else if (Store.getActiveStatus() === "Complete"){
                            return !task.complete 
                        } else {
                            return true
                        }
                    })
            }
        },
        methods:{
            showDetails(task){
                Store.setSelectedTask(task)
            },
            deleteItem(task){
                Store.deleteTask(task)
                console.log('delete item')
            },
            toggleListDisplay(){
                if (this.displayStyle === 'tile'){
                    this.displayStyle = 'plank'
                } else {
                    this.displayStyle = 'tile'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/_variables.scss';

    .task-list-container{
        flex: 1;
        background-color: $blue;
        overflow-x: hidden;
        overflow-y: auto;
        align-items: center;
        position: relative;
    }

    .task-list{
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        &.plank{
            flex-wrap: none;
        }
    }

    .task-list-item{
        cursor: pointer;
        margin: 10px;
        display: flex;
        border-top: 1px solid $darkBlue;
        border-bottom: 1px solid $darkBlue;
        background-color: $white;
        justify-content:space-between;
        // margin-bottom: 10px;
        margin-bottom: -1px;
        align-items: center;
        font-size: 25px;

        &:hover{
            background-color: $green;
        }
        &:active{
            background-color: darken($green,20%);
        }

        &.tile{
            flex: 0 0 350px; 
        }
        &.plank{
            width: 100%!important;
        }

        span{
            padding: 20px;
            flex: 1;
        }

        button{
            padding: 20px;
            // flex: 1;
            background: none;
            outline: none;
            border: none;
            text-align: left;
        }
    }
    .complete{
        background-color: darkgray;
        color:gray; 
    }
</style>
