<template>
    <div class="task-list-container">
        <ul class="task-list">
            <li class="task-list-item" v-for="task in tasks" @click="showDetails">
                <span >{{ task.title }}</span>
                <button @click.stop="deleteItem" class="fa fa-close"></button>
            </li>
        </ul>
    </div>
</template>

<script>
    import Store from './Store'
    import TaskDetail from './TaskDetail.vue'

    module.exports = {
        components:{TaskDetail},
        data(){
            return {}
        },
        computed:{
            tasks:{
                get(){
                    return Store.getTasks()
                },
                set(tasks){
                    Store.setTasks(tasks)
                }
            }
        },
        methods:{
            showDetails(){
                console.log('show details')
            },
            deleteItem(){
                console.log('delete item')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/_variables.scss';

    .task-list-container{
        flex: 1;
        background-color: $blue;
    }

    .task-list{
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
    }

    .task-list-item{
        flex: 1; 
        display: flex;
        border-top: 1px solid $darkBlue;
        border-bottom: 1px solid $darkBlue;
        background-color: $white;
        justify-content:space-between;
        // margin-bottom: 10px;
        margin-bottom: -1px;
        align-items: center;
        font-size: 25px;

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
</style>
