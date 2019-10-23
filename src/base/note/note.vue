<template>
    <div class="wrap">
        <div class="note">{{note}}</div>
    </div>
</template>

<script>
    export default {
        name: 'note',
        props: {
            note: {
                type: String,
                default: 'hello'
            }
        },
        data() {
            return {

            }
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .wrap
        .note
            width auto
            height auto
            max-width 6rem
            color #ffffff
            font-size 0.28rem
            line-height 0.5rem
            text-align center
            padding 0 0.1rem
            border-radius 0.05rem
            background-color rgba(0, 0, 0, 0.4);

</style>