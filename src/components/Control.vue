<template>
    <div class="control-container">
        <span class="username"></span>
        <ul class="status-selection">
            <li>Filter by status:</li>
            <li>All</li>
            <li>|</li>
            <li>In Progress</li>
            <li>|</li>
            <li>Complete</li>
        </ul>
        <div><button class="add-button fa fa-plus"></button></div>
    </div>
</template>

<script>
    module.exports = {
        data(){
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/_variables.scss';

    .control-container{
        flex: 0 0 50px;
        padding: 0 20px 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: $darkBlue;
    }

    .status-selection{
        display:flex;
        list-style: none;

        > * {
            margin: 0 10px 0 10px;
        }
    }

    .add-button{
        background:none;
        outline:none;
        border:none;
        font-size:30px;
    }
</style>
