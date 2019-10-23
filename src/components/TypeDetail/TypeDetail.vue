<template>
    <div class="type_detail">
        <div class="user">{{userInfo.name}}</div>
        <div class="tag_title">请填写您的基本信息</div>
        <div class="info_wrap">
            <div class="single">
                <div class="tag">车主姓名</div>
                <div class="value">{{userInfo.name}}</div>
            </div>
            <div class="single">
                <div class="tag">主车牌号</div>
                <div class="value">
                    <div class="car_num">京A11111</div>
                </div>
            </div>
            <div class="single">
                <div class="tag">副车牌号</div>
                <div class="value">
                    <div class="car_num none">无</div>
                </div>
            </div>
            <div class="single">
                <div class="tag">手机号码</div>
                <div class="value">{{userInfo.phone}}</div>
            </div>
            <div class="single">
                <div class="tag">一级机构</div>
                <div class="value">
                    请选择一级机构
                    <img src='../../common/img/right.png' alt="">
                </div>
            </div>
            <div class="single">
                <div class="tag">二级机构</div>
                <div class="value">
                    请选择二级机构
                    <img src='../../common/img/right.png' alt="">
                </div>
            </div>
            <div class="single">
                <div class="tag">办理类型</div>
                <div class="value">
                    请选择办理类型
                    <img src='../../common/img/right.png' alt="">
                </div>
            </div>
            <div class="single">
                <div class="tag">开始时间</div>
                <div class="value">2019-02-01</div>
            </div>
            <div class="single">
                <div class="tag">结束时间</div>
                <div class="value">2019-02-01</div>
            </div>
            <div class="single unique">
                <div class="tag">选择领纸质版停车证方式：</div>
                <div class="value">
                    <div class="select">
                        <div class="card_type">学院统一取</div>
                        <div class="chose">
                            <div><img src="../../common/img/fork2.png" alt=""></div>
                            <div><img src="../../common/img/fork1.png" alt=""></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="note_wrap" v-show="showNote">
            <note :note="note"></note>
        </div>
        <div class="submit" @click="nextStep">下一步</div>
    </div>
</template>

<script>
    import { getTypeDetail } from 'api/typeList'
    import Note from 'base/note/note'
    import storage from 'good-storage'

    export default {
        name: "TypeDetail",
        data() {
            return {
                setrentId: this.$route.query.id,
                userId: storage.get('userId'),
                userInfo: {},
                org: [],
                showNote: false,
                note: ''
            }
        },

        created() {
            console.log(this.setrentId, this.userId)
            this._getTypeDetail()
        },

        methods: {
            //获取信息
            _getTypeDetail() {
                let userId = this.userId
                let setrentId = this.setrentId
                getTypeDetail(userId, setrentId).then(res => {
                    console.log(96, res);
                    if(res.code == 1) {
                        let resData = res.data
                        this.userInfo = resData.users
                        this.org = resData.org
                    } else {
                        this.noteFn(res.msg)
                    }
                })
            },

            //note
            noteFn(text) {
                this.note = text
                this.showNote = true
                setTimeout(() => {
                    this.showNote = false
                }, 2000)
            },

            //下一步
            nextStep() {
                this.$router.push({
                    path: '/UpFile'
                })
            }
        },

        components: {
            Note
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .type_detail
        width 100%
        height auto
        .note_wrap
            position fixed
            top 50%
            left 50%
            transform translate(-50%, -50%)
            display flex
            justify-content center
            align-items center
        .user
            width 100%
            height 1.01rem
            color #000000
            font-size 0.3rem
            line-height 1.01rem
            margin-bottom 0.23rem
            background #ffffff
            padding 0 0.3rem
        .tag_title
            width 100%
            height 0.85rem
            color #3385EC
            font-size 0.34rem
            line-height 0.85rem
            padding 0 0.3rem
            margin-bottom 0.2rem
            background #ffffff
        .info_wrap 
            width 100%
            height auto
            padding 0 0.3rem
            background-color #ffffff
            .single
                height 0.85rem
                line-height 0.85rem
                display flex
                justify-content space-between
                border-top 1px solid #000000 
                &:nth-of-type(1) 
                    border none
                .tag
                    color #000000
                    font-size 0.3rem
                .value 
                    color #666666
                    font-size 0.26rem
                    display flex
                    align-items center
                    .car_num
                        color #ffffff
                        background #3385EC
                        width auto
                        height 0.46rem
                        line-height 0.46rem
                        padding 0 0.25rem
                        border-radius 0.05rem
                    .none
                        color #3385EC
                        background none
                        border 1px solid #3385EC
                    img 
                        width 0.16rem
                        height 0.26rem
                        margin-left 0.23rem
            .unique
                width 100%
                margin-bottom 0.3rem
                .value
                    .select
                        width 2.7rem
                        height 0.45rem
                        display flex
                        border-radius 0.05rem
                        border 1px solid #999999
                        .card_type 
                            flex 1
                            height 100%
                            line-height 0.45rem
                            padding 0 0.2rem
                        .chose 
                            width 0.43rem
                            height 0.43rem
                            background #3385EC
                            div 
                                position relative
                                width 100%
                                height 50%
                                img
                                    position absolute
                                    width 0.15rem
                                    height 0.1rem
                                    left 50%
                                    top 50%
                                    transform translate(-50%, -50%)
                                    margin 0
        .submit
            width 6.3rem
            height 0.85rem
            color #ffffff
            font-size 0.3rem
            line-height 0.85rem
            text-align center
            background #3385EC
            margin 0.47rem auto 1rem
            box-shadow 0 0 0.2rem #3385ec
</style>