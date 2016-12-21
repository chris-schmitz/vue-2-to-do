<template>
    <div class="task-detail-container">
        <div v-if="!editTask" class='view-content'>
            <h1 class="title" v-text="task.title"></h1>
            <p class="discription" v-text="task.description"></p>
        </div>
        <div v-if="editTask" class='view-content'>
            <h1 class="title">
                <input v-model="task.title">
            </h1>
            <textarea v-model="task.description"></textarea>
        </div>
        <div class='actions'>
            <div class='top'>
                <button v-if="!editTask" @click='edit'>Edit</button>
                <button v-if="editTask" @click='save'>Save</button>
                <button v-if="editTask" @click='cancel'>Cancel</button>
            </div>
            <div class="bottom">
                <button @click='close'>Close</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Store from './Store'

    module.exports = {
        data(){
            return {
                editTask: false,
                task:{
                    title: null,
                    description: null,
                    complete: null,
                    history: []
                }
            }
        },
        computed:{
            selectedTask(){
                return Store.getSelectedTask()
            }
        },
        methods:{
            edit(){
                this.editTask = true
            },
            save(){
                this.copyLocalTaskPropertiesToSelected()
                this.editTask = false
            },
            cancel(){
                this.copySelectedTaskPropertiesToLocal()
                this.editTask = false
            },
            close(){
                Store.setSelectedTask(null)
            },
            copySelectedTaskPropertiesToLocal(){
                Object.keys(this.selectedTask)
                    .forEach((key) => {
                        this.task[key] = this.selectedTask[key]
                    })
            },
            copyLocalTaskPropertiesToSelected(){
                Object.keys(this.task)
                    .forEach((key) => {
                        this.selectedTask[key] = this.task[key]
                    })
            }
        },
        mounted(){
            this.copySelectedTaskPropertiesToLocal()
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/_variables.scss';

    .task-detail-container{
        position: absolute;
        width: 60%;
        background-color: $white;
        height: 100%;
        right: 0;
        padding: 20px;
        display: flex;
        // flex-direction: column;
        justify-content: space-between;
    }

    .view-content{
        display: flex;
        flex-direction: column;
        .title{
            margin: 0;
        }
    }

    .edit-content{

    }

    .actions{
        border: 1px solid $green;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;

        .top{
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }
        .bottom{

        }
    }
</style>
