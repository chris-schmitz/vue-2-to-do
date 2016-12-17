<template>
    <div class="notification-container" :class="type">
        <span class="message">{{ message }}</span>
        <button class="close fa fa-close" @click="close"></button>
    </div>
</template>

<script>
    import Store from './Store'

    module.exports = {
        data(){
            return {
                sharedState: Store.state
            }
        },
        computed:{
            message(){
                return this.sharedState.notification.message
            },
            type(){
                return {[this.sharedState.notification.type]: true}
            },
            show(){
                return this.sharedState.notification.show
            }
        },
        methods:{
            close(){
                Store.clearNotification()
            }
        },
        watch:{
            show(value){
                debugger
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/_variables.scss';

    .notification-container{
        // background-color: cyan;
        margin:20px;
        flex: 1;
        height: 70%;
        font-size: 25px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .message{
            display: inline-block;
            margin-left: 20px;
        }
        .close{
            margin-right: 20px;
            background:none;
            outline: none;
            border: none;
            color: $white;
        }

        &.error{
            background-color: $red;
        }
        &.success{
            background-color: $green;
        }
        &.info{
            background-color: $blue;
        }
        &.warning{
            background-color: $gold;
        }
    }
</style>
