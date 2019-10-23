<template>
    <div class="car_type">
        <div class="all_type">
            <div class="single" v-for="(item, index) in allType" @click="goDetail(item.pm_setrent_id)">
                <p class="type">{{item.name}}</p>
                <div class="time">有效期限：{{item.use_date}}-{{item.end_date}}</div>
                <img src="../../common/img/car.png" alt="">
            </div>
        </div>
        <div class="note_wrap" v-show="showNote">
            <note :note="note"></note>
        </div>
    </div>
</template>

<script>
    import { getTypeList } from 'api/typeList'
    import Note from 'base/note/note'
    import storage from 'good-storage'

    export default {
        name: "CarType",
        data() {
            return {
                userId: storage.get('userId'),
                note: '',
                showNote: false,
                allType: [],
            }
        },

        created() {
            this._getList()
        },

        methods: {
            //note
            noteFn(text) {
                this.note = text
                this.showNote = true
                setTimeout(() => {
                    this.showNote = false
                }, 2000)
            },

            //获取列表
            _getList() {
                getTypeList(this.userId).then(res => {
                    if(res.code == 1) {
                        this.allType = res.data
                    } else {
                        this.noteFn(res.msg)
                    }
                })
            },

            //下一步
            goDetail(setrentId) {
                this.$router.push({
                    path: "/TypeDetail",
                    query: {
                        id: setrentId
                    }
                })
            },
        },

        components: {
            Note
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .car_type
        width 100%
        height auto
        padding 0.4rem 0
        .note_wrap
            position fixed
            top 50%
            left 50%
            transform translate(-50%, -50%)
            display flex
            justify-content center
            align-items center
        .all_type
            width 6.9rem
            height auto
            margin 0 auto
            .single
                position relative
                width 100%
                height 2.2rem
                text-align center
                padding 0.2rem
                margin-bottom 0.3rem
                background linear-gradient(#66A6F0, #8EB5F7)
                border-radius 0.05rem
                img
                    position absolute
                    width 2.12rem
                    height 1.03rem
                    top 0.64rem
                    right 0.25rem
                .type
                    color #FFFFFF
                    font-size 0.44rem
                .time
                    position absolute
                    color #FFFFFF
                    font-size 0.3rem
                    text-align center
                    width 100%
                    bottom 0.2rem

</style>