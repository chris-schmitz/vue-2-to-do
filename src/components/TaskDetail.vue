<template>
    <div class="task-detail-container">

        <div v-if="!editTask" class='content view'>
            <div class='title'>
                <h1 class="title-text" v-text="task.title"></h1>
                <span class="title-status" :class="{'complete': task.complete, 'in-progress': !task.complete}" v-text="completeStatus"></span>
            </div>
            <p class="description" v-text="task.description"></p>
        </div>

        <div v-if="editTask" class='content edit'>
            <label class="title-label">Title: 
                <input class="title" v-model="task.title">
            </label>
            <label class="status-label">Status: 
                <button class="status-toggle" @click='toggleStatus' v-text="completeStatus"></button>
            </label>
            <label class="description-label">Description
                <textarea class="description" v-model="task.description"></textarea>
            </label>
        </div>

        <div class='actions'>
            <div class='top'>
                <button class="edit" v-if="!editTask" @click='edit'>Edit</button>
                <button class="save" v-if="editTask" @click='save'>Save</button>
                <button class="cancel" v-if="editTask" @click='cancel'>Cancel</button>
            </div>
            <div class="bottom">
                <button class="close" @click='close'>Close</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Store from './Store'
    import {bus, BusCommands} from './EventBus'

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
            },
            completeStatus(){
                // pull possible status texts from store?
                return this.task.complete ? "Complete" : "In Progress"
            }
        },
        methods:{
            toggleStatus(){
                this.task.complete = !this.task.complete
            },
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
            bus.$on(BusCommands.ENTEREDITMODE, this.edit)
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/_variables.scss';
    @import '../style/_mixins.scss';

    $fontSizeNormal: 15px;
    $fontSizeLarge: 20px;

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

    .content{
        // border: 1px solid red;
        padding: 10px;
        display: flex;
        flex-direction: column;

        margin-right: 10px;

        .title{
            margin: 0;
        }

        // // This is uneededly fancy but I want to do it anyway so whateva!
        // // Any direct label children of .content that have a sibling, 
        // // i.e. All of .contents direct child labels _except_ for the first one
        // // this way we can give "inner" margin to the labels without having to lose
        // // the top and bottom alignment with the items in the .action column
        // > label + * {
        //     margin-top: 10px;
        //     border: 1px solid $blue;
        // }

        label{
            margin: 5px;
            display: flex;
            flex-direction: column;

        }

        .title-label{
            flex: 0 0 70px;
            .title{
                flex: 1;
            }
        }

        .description-label{
            flex: 1;
            .description{
                flex: 1;
            }
        }
    }

    .content.view{
        .title{
            .title-text{
                margin: 0 ;
            }
            .complete{
                color: $green;
            }
            .in-progress{
                color: $red;
            }
        }
        .description{
            font-size: $fontSizeLarge;
        }
    }

    .content.edit{
        justify-content: space-between;

        input, textarea{
            font-size: $fontSizeNormal;
        }

        .status-toggle{
            width: 100px;
            @include button($blue, $white, 0, $fontSizeNormal);
        }
    }

    .actions{
        // border: 1px solid $green;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;

        .edit{
            @include button($blue, $white, 0px, $fontSizeNormal);
        }

        .close{
            @include button($blue, $white, 0px, $fontSizeNormal);
        }
        .save{
            @include button($green, $white, 0px, $fontSizeNormal);
        }
        .cancel{
            @include button($red, $white, 0px, $fontSizeNormal);
        }

        .top{
            display: flex;
            flex-direction: column;
            align-items: stretch;
            
            > *{
                margin-bottom: 10px;
            }
        }

        .bottom{

        }
    }
</style>
