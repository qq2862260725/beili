<template>
  <div class="login">
    <div class="user">
      <div class="info">
        <div class="tag">请输入车牌号</div>
        <div class="write">
          <div class='single' @click="tapInput(1)">
            <span>{{num1}}</span>
            <div class='action' v-show="step == 1"></div>
          </div>
          <div class='single' @click="tapInput(2)">
            <span>{{num2}}</span>
            <div class='action' v-show="step == 2"></div>
          </div>
          <div class='single' @click="tapInput(3)">
            <span>{{num3}}</span>
            <div class='action' v-show="step == 3"></div>
          </div>
          <div class='single' @click="tapInput(4)">
            <span>{{num4}}</span>
            <div class='action' v-show="step == 4"></div>
          </div>
          <div class='single' @click="tapInput(5)">
            <span>{{num5}}</span>
            <div class='action' v-show="step == 5"></div>
          </div>
          <div class='single' @click="tapInput(6)">
            <span>{{num6}}</span>
            <div class='action' v-show="step == 6"></div>
          </div>
          <div class='single' @click="tapInput(7)">
            <span>{{num7}}</span>
            <div class='action' v-show="step == 7"></div>
          </div>
          <div class='single' @click="tapInput(8)">
            <span>{{num8}}</span>
            <div class='action' v-show="step == 8"></div>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="tag">请输入手机号</div>
        <input @focus="hideKeyboard" type="text" class="write" v-model="phone">
      </div>
    </div>
    <div class="note">
      <p>提示：1.如您已办理车证，请输入车牌号、手机号进行查询。如您未办理过车证，请您注册账号。</p>
      <p>2.首次办理的在职老师，请先往学校官网-综合服务一站式服务大厅在线填写申请表。</p>
    </div>
    <div class="button" id="login" @click="loginClick">查询</div>
    <div class="button" id="register" @click="register">注册</div>
    <div class="keyboard_wrap" v-show="show">
      <keyboard @writeKey="keyTap" @deleteKey="deleteKey" ref="keyboard"></keyboard>
    </div>
    <div class="note_wrap" v-show="showNote">
      <note :note="note"></note>
    </div>
  </div>
</template>

<script>
import Keyboard from 'base/keyboard/keyboard'
import Note from 'base/note/note'
import storage from 'good-storage'
import { login } from 'api/login'
export default {
  name: 'Login',
  data () {
    return {
      show: false,
      phone: '',
      num1: "京",
      num2: '',
      num3: '',
      num4: '',
      num5: '',
      num6: '',
      num7: '',
      num8: '',
      step: 1,
      note: '',
      showNote: false
    }
  },

  created() {
    
  },

  methods: {
    //点击车牌框
    tapInput(key) {
      if(!this.show) {
        this.show = true
      }
      this.step = key
    },

    //键盘点击
    keyTap(key) {
      let currentStep = this.step
      switch(currentStep) {
        case 1: 
          this.num1 = key
          this.step++
          break
        case 2: 
          this.num2 = key
          this.step++
          break
        case 3: 
          this.num3 = key
          this.step++
          break
        case 4: 
          this.num4 = key
          this.step++
          break
        case 5: 
          this.num5 = key
          this.step++
          break
        case 6: 
          this.num6 = key
          this.step++
          break
        case 7: 
          this.num7 = key
          this.step++
          break
        case 8: 
          this.num8 = key
          break
        default: 
          
      }
    },

    noteFn(text) {
      this.note = text
      this.showNote = true
      setTimeout(() => {
        this.showNote = false
      }, 2000)
    },

    //删除键
    deleteKey() {
      let currentStep = this.step
      switch(currentStep) {
        case 2: 
          this.num2 = ''
          this.step--
          break;
        case 3: 
          this.num3 = ''
          this.step--
          break;
        case 4: 
          this.num4 = ''
          this.step--
          break;
        case 5: 
          this.num5 = ''
          this.step--
          break;
        case 6: 
          this.num6 = ''
          this.step--
          break;
        case 7: 
          this.num7 = ''
          this.step--
          break;
        case 8: 
          this.num8 = ''
          this.step--
          break;
        default: 
          
      }
    },

    //登陆类型 新能源 燃油车
    loginType(cardLength, carNum, phone) {
      let phoneReg = /^1[3456789]\d{9}$/
      if(carNum.length < cardLength) {
        this.noteFn('车牌号为无效车牌')
      } else if(phone == '') {
        this.noteFn('请输入手机号')
      } else if(!phoneReg.test(phone)) {
        this.noteFn('输入手机号不正确')
      } else {
        login(carNum, phone).then(res => {
          if(res.code == 1) {
            let userId = res.data.users.pm_setrent_userinfo_id;
            storage.set('userId', userId)
            this.$router.push({
              path: '/Home'
            })
          } else {
            this.noteFn(res.msg)
          }
        })
      }
    },
  
    //登陆
    loginClick() {
      this.show = false
      let carNum = `${this.num1}${this.num2}${this.num3}${this.num4}${this.num5}${this.num6}${this.num7}${this.num8}`
      let phone = this.phone
      
      if(this.num8 == '') {
        this.loginType(7, carNum, phone)
      } else {
        this.loginType(8, carNum, phone)
      }
    },

     //输入框聚焦
    hideKeyboard() {
      this.show = false
    },

    //注册
    register() {
      this.$router.push({
        path: '/Register'
      })
    },
 
  },

  watch: {
    step(currentStep) {
      if(currentStep == 1) {
        this.$refs.keyboard.switchKeyboard(2)
      } else {
        this.$refs.keyboard.switchKeyboard(1)
      }
    }
  },

  components: {
    Keyboard,
    Note
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .login 
      width 100%
      height 100%
      padding-top 0.27rem
      .note_wrap
        position fixed
        top 50%
        left 50%
        transform translate(-50%, -50%)
        display flex
        justify-content center
        align-items center
      .user
        height auto
        width 6.9rem
        margin 0 auto
        background-color #ffffff
        padding 0.1rem 0.3rem
        border-radius 0.05rem
        .info 
          width 100%
          height auto
          margin-bottom 0.12rem
          .write 
            width 100%
            height 0.85rem
            display flex
            background #f8f8f8
            border-radius 0.05rem
            .single
              position relative
              height 100%
              flex 1
              color #333333
              font-size 0.3rem
              line-height 0.85rem
              text-align center
            .single:nth-of-type(1):before
              content: ''
              position absolute
              width 1px
              height 0.31rem 
              right 0
              top 50%
              transform translateY(-50%)
              background #222222
            .action
              position absolute
              height 2px
              width 100%
              bottom 0
              background-color #3385EC
              animation myfirst 1.5s infinite
            @keyframes myfirst 
              from 
                background-color: #3385EC
              to 
                background-color: #ffffff              
          .tag 
            color #222222
            font-size 0.3rem
            line-height 0.7rem
          input 
            outline 0
            border none
            font-size 0.3rem
            padding: 0 0.2rem
      .note
        width 6.34rem
        height auto
        margin 0.1rem auto
        color #FF444A
        font-size 0.22rem
      .button 
        width 6.3rem
        height 0.85rem
        margin 0.2rem auto
        font-size: 0.35rem
        line-height 0.8rem
        text-align center
        border-radius 0.05rem
      #login
        color #fff
        margin-top 2rem
        background-color #3385ec
        box-shadow 0 0 0.2rem #3385ec
      #register
        color #3385ec
        border 1px solid #3385ec
      .keyboard_wrap 
        position fixed
        bottom 0
        width 100%
        height auto
</style>
