<template>
    <div class="home">
        <div class="user">
            <div class="name">{{name}}</div>
            <div class="user_info" @click="navUser">
                {{phone}}
                <img src="../../common/img/user.png" alt="">
            </div>
        </div>
        <div class="car_list" v-if="carList.length > 0">
            <div class="single">
                <div class="top">
                    <img src="../../common/img/logo.png" alt="">
                    <span>2019.01.03-2019.02.04</span>
                </div>
                <p class="card_type">包年卡</p>
                <div class="bottom">
                    <div class="type">车证类型：小黑</div>
                    <div class="status_wrap">
                        <p class="use_status">使用中</p>
                        <div class="modify" @click="carDeatil">查看详情</div>
                        <div class="modify" @click="switchCar">转校内</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="none" v-if="carList.length == 0">
            <none text="暂无车证"></none>
        </div>
        <div class="switch_wrap" v-show="payNote">
            <p>当前卡类型转校内需支付100元</p>
            <div class="button_wrap">
                <div class="button ensure" @click="ensurePay">确定</div>
                <div class="button cancle" @click="canclePay">取消</div>
            </div>
        </div>
        <div class="note_wrap" v-show="showNote">
            <note :note="note"></note>
        </div>
        <div class="new_card" v-if="!carList.length > 0" @click="getNew">新办车证</div>
    </div>
</template>

<script>
    import None from '@/base/none/none'
    import Note from 'base/note/note'
    import storage from 'good-storage'
    import { getUserInfo } from 'api/home'

    export default {
        name: 'Home',
        data() {
            return {
                name: '',
                phone: '',
                carList: [],
                payNote: false,
                userId: storage.get('userId'),
                showNote: false,
                note: ''
            }
        },

        created() {
            if(!this.userId) {
                this.$router.push({
                    path: '/'
                })
            }
            this._getUserInfo()
        },

        methods: {
            //获取用户信息
            _getUserInfo() {
                getUserInfo(this.userId).then( res => {
                    if(res.code == 1) {
                        let resData = res.data
                        this.carList = resData.car
                        this.name = resData.users.name
                        this.phone = resData.users.phone
                    } else {
                        this.noteFn(res.msg)
                    }
                })
            },

            noteFn(text) {
                this.note = text
                this.showNote = true
                setTimeout(() => {
                    this.showNote = false
                }, 2000)
            },

            //跳转个人中心
            navUser() {
                this.$router.push({
                    path: '/User'
                })
            },

            //修改车辆信息
            carDeatil() {
                this.$router.push({
                    path: '/Detail'
                })
            },

            //转校内
            switchCar() {
                this.payNote = true
            },
            ensurePay() {
                console.log(67, 'pay')
            },
            canclePay() {
                this.payNote = false
            },

            //办理车证
            getNew() {
                this.$router.push({
                    path: '/CarType'
                })
            }
        },

        components: {
            None,
            Note,
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .home
        position relative
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
            height 1.05rem
            font-size 0.3rem
            display flex
            line-height 1.01rem
            justify-content space-between
            padding 0 0.3rem
            background #ffffff
        .user_info 
            display flex
            align-items center
            img
                width 0.26rem
                height 0.26rem
                margin-left 0.14rem
        .car_list
            width 100%
            height auto
            margin-top 0.25rem
            margin-bottom 1rem
            .single
                width 6.9rem
                height 2.32rem
                margin 0 auto
                padding 0.1rem 0.27rem 0 0.33rem
                background-color #ffffff
                border-radius 0.05rem
                .top
                    width 100%
                    height 0.68rem
                    display flex
                    justify-content space-between
                    img 
                        width 3.35rem
                        height 0.68rem
                    span
                        color #666666
                        font-size 0.22rem
                        line-height 0.5rem
                .card_type
                    color #3385EC
                    font-size 0.36rem
                    text-align right
                .bottom
                    width 100%
                    height 0.45rem
                    margin-top 0.35rem
                    display flex
                    line-height 0.45rem
                    justify-content space-between
                    .type 
                        color #000000
                        font-size 0.3rem
                    .status_wrap
                        display flex
                        font-size 0.26rem
                        justify-content flex-end
                        .use_status
                            color #3385EC
                            margin-right 0.32rem
                        .modify
                            width 1.2rem
                            color #ffffff
                            text-align center
                            border-radius 0.05rem
                            margin-left 0.1rem
                            background-color #3385EC
        .none 
            width 100%
            height auto
            margin-top 2.03rem
            margin-bottom 3rem
        .new_card
            width 6.3rem
            height 0.85rem
            color #ffffff
            font-size 0.3rem
            text-align center
            line-height 0.85rem
            margin 0 auto
            background-color #3385EC

        .switch_wrap
            position absolute
            width 4.7rem
            height 2.9rem
            background #ffffff
            text-align center
            top 3.84rem
            left 50%
            font-size 0.3rem
            transform translate(-50%, 0)
            p
                color #333333
                text-align center
                line-height 0.7rem
            .button_wrap
                width auto
                height 0.55rem 
                margin 0.55rem auto
                display flex
                justify-content center
                .button
                    width 1.5rem
                    height 100%
                    color #3385EC
                    line-height 0.55rem
                    margin 0 0.1rem
                    border 1px solid #3385EC
                .ensure
                    color #ffffff
                    background #3385EC
            
</style>