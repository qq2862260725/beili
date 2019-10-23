<template>
    <div id="none">
        <img :src=noneImg alt="">
        <p>{{text}}</p>
    </div>
</template>

<script>
    import noneImg from 'common/img/none.png' 
    export default {
        name: 'none',
        props: {
            text: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                noneImg: noneImg
            }
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    #none
        width 100%
        height auto
        align-items center
        img 
            width 2.91rem
            height 3.01rem
            display block
            margin 0 auto
        p
            color #666666
            font-size 0.3rem
            text-align center
            line-height 0.9rem
</style>