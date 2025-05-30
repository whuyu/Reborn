<template>
  <div>
    <!-- title -->
    <div style="height: 60px;background-color: var(--maxWhite);display: flex;align-items: center;justify-content: space-between;padding: 0 20px;">
      <template v-if="!$common.isEmpty(currentChatFriendId)">
        <span style="font-size: 18px">
          {{friends[currentChatFriendId].remark}}
        </span>
        <div style="display: flex;flex-direction: row;width: 100px;justify-content: space-evenly;">
          <div @click="startVideoCall" style="margin-right: 10px">
            <svg t="1748405009518" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19795" width="24" height="24"><path d="M902.57 332.86l-76.69 16.23c-14.79 3.13-25.38 16.19-25.38 31.31v262.42c0 15.12 10.58 28.18 25.38 31.31l76.69 16.23c29.85 6.32 57.94-16.45 57.94-46.96V379.82c0-30.51-28.09-53.28-57.94-46.96zM607.83 208h-416c-70.4 0-128 57.6-128 128v352c0 70.4 57.6 128 128 128h416c70.4 0 128-57.6 128-128V336c0-70.4-57.6-128-128-128zM236.96 447.79c-35.35 0-64-28.65-64-64s28.65-64 64-64c35.34 0 64 28.65 64 64s-28.66 64-64 64z" fill="#242424" p-id="19796"></path></svg>
          </div>
          <div @click="startAudioCall">
            <svg t="1748405318382" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22457" width="24" height="24"><path d="M200.832 133.525333c25.088-17.152 50.112 11.093333 50.112 11.093334s119.402667 150.890667 133.546667 172.245333c14.122667 21.376-5.610667 38.933333-5.610667 38.933333l-55.68 38.912s28.672 100.949333 111.274667 183.381334c86.784 86.677333 183.68 111.082667 183.68 111.082666s24.618667-41.258667 38.997333-55.594666c14.378667-14.357333 38.976-0.021333 38.976-0.021334s178.965333 134.186667 189.226667 144.426667c10.282667 10.24 16.384 16.341333 2.773333 41.685333s-48.128 59.136-52.906667 63.957334c-4.842667 4.778667-179.413333 82.282667-481.536-219.306667C61.973333 373.077333 134.72 199.744 139.349333 189.589333l0.213334-0.469333A317.098667 317.098667 0 0 1 200.832 133.546667z m609.792 106.517334c11.797333 0 21.376 9.728 21.376 21.866666-0.170667 102.058667-74.794667 185.984-170.666667 196.970667v44.757333h74.026667c12.16 0 22.037333 9.728 22.037333 21.738667 0 11.989333-9.877333 21.717333-22.016 21.717333h-190.762666c-12.16 0-21.994667-9.728-21.994667-21.717333 0-12.010667 9.856-21.76 21.994667-21.76h74.069333V458.88c-95.893333-10.965333-170.517333-94.912-170.688-197.098667a21.546667 21.546667 0 0 1 21.397333-21.738666c11.797333 0 21.376 9.728 21.44 21.738666v0.597334c0 85.162667 66.773333 154.197333 149.162667 154.197333 82.368 0 149.162667-69.034667 149.162667-154.197333v-0.597334a21.674667 21.674667 0 0 1 21.461333-21.738666zM640 42.666667c64.853333 0 117.397333 53.589333 117.397333 119.68v101.973333c0 66.090667-52.565333 119.68-117.397333 119.68s-117.376-53.589333-117.376-119.68V162.346667C522.624 96.256 575.168 42.666667 640 42.666667z" fill="#333333" p-id="22458"></path></svg>
          </div>
        </div>
      </template>
      <template v-else-if="!$common.isEmpty(currentChatGroupId)">
        <span style="font-size: 18px">
          {{groups[currentChatGroupId].groupName}}
        </span>
        <span style="font-size: 12px;color: var(--greyFont)">
          当前在线人数：4
        </span>
      </template>
    </div>

    <!-- 聊天记录 -->
    <div class="msg-container">
      <template v-if="!$common.isEmpty(currentChatFriendId)">
        <div v-for="(item, index) in imMessages[currentChatFriendId]"
             :class="['msg-one', item.fromId === $store.state.currentUser.id ? 'message-right' : 'message-left']"
             :key="index">
          <!-- 头像 -->
          <div>
            <n-avatar object-fit="cover"
                      :size="40"
                      lazy
                      style="cursor: pointer;border-radius: 50%;"
                      @click="openFriendCircle(item.fromId, item.avatar)"
                      :src="item.avatar"/>
          </div>

          <!-- 文本消息 -->
          <div class="message" v-html="item.content"></div>

          <!-- 时间 -->
          <div class="msg-date" v-if="!$common.isEmpty(item.createTime)">
            {{$common.getDateDiff(item.createTime)}}
          </div>
        </div>
      </template>

      <template v-else-if="!$common.isEmpty(currentChatGroupId)">
        <div v-for="(item, index) in groupMessages[currentChatGroupId]"
             :class="['msg-one', item.fromId === $store.state.currentUser.id ? 'message-right' : 'message-left']"
             :key="index">
          <!-- 头像 -->
          <div>
            <n-avatar object-fit="cover"
                      :size="40"
                      lazy
                      style="cursor: pointer;border-radius:50%;"
                      @click="openFriendCircle(item.fromId, item.avatar, item.username)"
                      :src="item.avatar"/>
          </div>

          <!-- 文本消息 -->
          <div class="message" v-html="item.content"
               :style="{'background': (item.fromId !== $store.state.currentUser.id ? $constant.tree_hole_color[item.fromId % $constant.tree_hole_color.length] : '')}">
          </div>

          <div class="msg-user">{{item.username}}</div>

          <!-- 时间 -->
          <div class="msg-date" style="margin-left: 5px;margin-right: 5px"
               v-if="!$common.isEmpty(item.createTime)">
            {{$common.getDateDiff(item.createTime)}}
          </div>
        </div>
      </template>
    </div>

    <!-- 输入框 -->
    <div style="height: 180px">
      <!-- 功能栏 -->
      <div style="padding: 10px 15px;display: flex;height: 25px">
        <!-- 表情 -->
        <n-popover placement="top-start"
                   display-directive="show"
                   trigger="click">
          <template #trigger>
            <div class="myEmoji">
              <svg t="1748410136166" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25490" width="25" height="25"><path d="M512 986.88c-241.493333 0-438.186667-196.693333-438.186667-438.186667S270.506667 110.506667 512 110.506667 950.186667 307.2 950.186667 548.693333 753.493333 986.88 512 986.88z m0-791.04c-194.56 0-352.853333 158.293333-352.853333 352.853333s158.293333 352.853333 352.853333 352.853334 352.853333-158.293333 352.853333-352.853334S706.56 195.84 512 195.84z" fill="#4D4D4D" p-id="25491"></path><path d="M512 769.706667a221.866667 221.866667 0 0 1-177.493333-89.173334 42.496 42.496 0 0 1 8.96-59.733333 42.496 42.496 0 0 1 59.733333 8.96 134.826667 134.826667 0 0 0 109.226667 55.04c43.093333 0 82.773333-20.053333 108.8-54.613333 14.08-18.773333 40.96-22.613333 59.733333-8.533334 18.773333 14.08 22.613333 40.96 8.533333 59.733334A224.128 224.128 0 0 1 512 769.706667zM376.32 556.8c-23.466667 0-42.666667-19.2-42.666667-42.666667v-56.746666c0-23.466667 19.2-42.666667 42.666667-42.666667s42.666667 19.2 42.666667 42.666667v56.746666c0 23.466667-18.773333 42.666667-42.666667 42.666667zM622.08 556.8c-23.466667 0-42.666667-19.2-42.666667-42.666667v-56.746666c0-23.466667 19.2-42.666667 42.666667-42.666667s42.666667 19.2 42.666667 42.666667v56.746666c0 23.466667-19.2 42.666667-42.666667 42.666667z" fill="#4D4D4D" p-id="25492"></path></svg>
            </div>
          </template>
          <!-- 表情 -->
          <emoji @addEmoji="addEmoji" :showEmoji="true"></emoji>
        </n-popover>

        <!-- 图片 -->
        <div class="myEmoji" @click="sendPicture()">
          <svg t="1748410193832" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27480" width="25" height="25"><path d="M769.3 154.8H258.7c-92.9 0-168.5 75.6-168.5 168.5v379.8c0 92.9 75.6 168.5 168.5 168.5h510.5c92.9 0 168.5-75.6 168.5-168.5V323.3c0.1-92.9-75.5-168.5-168.4-168.5z m-372 146c48.4 0 87.7 39.2 87.7 87.7 0 48.4-39.2 87.7-87.7 87.7-48.4 0-87.7-39.2-87.7-87.7 0.1-48.4 39.3-87.7 87.7-87.7z m-117 407l120.2-187.3 85.8 121L606.6 460l154.5 247.8H280.3z" fill="#0C0C0C" p-id="27481"></path></svg>
        </div>

        <!-- 表情包 -->
        <n-popover v-model:show="showPopoverImage"
                   display-directive="show"
                   placement="top-start"
                   trigger="click">
          <template #trigger>
            <div class="myEmoji" @click="showPopoverImage = !showPopoverImage">
              <svg t="1748410262291" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="29410" width="25" height="25"><path d="M442.71 407.94c0 47.48-38.49 85.97-85.97 85.97s-85.97-38.49-85.97-85.97 38.49-85.97 85.97-85.97 85.97 38.49 85.97 85.97" fill="#3B3B40" p-id="29411"></path><path d="M733.35 407.94c0 47.48-38.49 85.97-85.97 85.97s-85.97-38.49-85.97-85.97 38.49-85.97 85.97-85.97 85.97 38.49 85.97 85.97" fill="#3B3B40" p-id="29412"></path><path d="M737.37 579.75c0 129.86-105.27 235.14-235.14 235.14S267.09 709.62 267.09 579.75" fill="#3B3B40" p-id="29413"></path><path d="M964.74 147.93H877.5l-0.53-87.21c-0.14-23.94-19.58-43.26-43.52-43.26h-0.3c-24.01 0.17-43.34 19.76-43.18 43.78l0.51 86.7h-86.74c-24.04 0-43.52 19.48-43.52 43.52s19.48 43.52 43.52 43.52h87.25l0.51 87.21c0.14 23.94 19.58 43.26 43.52 43.26h0.26c24.04-0.14 43.4-19.74 43.26-43.78l-0.52-86.7h86.71c24.04 0 43.52-19.48 43.52-43.52s-19.48-43.52-43.52-43.52z" fill="#3B3B40" p-id="29414"></path><path d="M489.81 1006.55c-261.89 0.08-474.26-212.16-474.34-474.05-0.08-261.89 212.16-474.26 474.05-474.34 34.41-0.01 68.71 3.72 102.31 11.14 16.94 3.73 27.65 20.5 23.91 37.44-3.73 16.94-20.5 27.65-37.44 23.91a413.851 413.851 0 0 0-177.96 0.26C178.64 180.39 39.03 400.23 88.51 621.93c49.48 221.7 269.33 361.31 491.03 311.83 220.97-50.49 360.09-269.48 311.89-490.97-3.3-17.05 7.86-33.55 24.91-36.84 16.36-3.16 32.35 6.99 36.45 23.14 56.91 255.76-104.29 509.22-360.05 566.13a474.478 474.478 0 0 1-102.93 11.33" fill="#3B3B40" p-id="29415"></path></svg>
            </div>
          </template>

          <div id="image-scroll-container" class="image-list">
            <n-image
              v-for="(item, index) in imageList"
              :src="item"
              @click="sendImage(item)"
              :key="index"
              width="70"
              height="70"
              lazy
              preview-disabled
              :intersection-observer-options="{root: '#image-scroll-container'}">
            </n-image>
          </div>
        </n-popover>


      </div>

      <!-- 输入框 -->
      <textarea @keydown="send($event)"
                v-model="msg"
                maxlength="1000"
                spellcheck="false"
                placeholder="请输入内容..."
                class="message-content">
            </textarea>
      <!-- 发送 -->
      <div class="message-send">
        <span style="color: var(--greyFont);margin-right: 15px;font-size: 12px">Ctrl+Enter：换行 | Enter：发送</span>
        <n-button @click="doSend()" style="border-radius:30px;">
          发送
          <svg t="1748407855813" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23441" width="24" height="24"><path d="M742.894933 200.7168L154.436267 299.3536a8.533333 8.533333 0 0 0-5.077334 13.960533L222.357333 398.72a17.066667 17.066667 0 0 0 19.1232 4.834133l503.658667-194.645333a4.266667 4.266667 0 0 0-2.24-8.192z m-110.024533 626.274133l240.042667-593.019733a8.533333 8.533333 0 0 0-11.191467-11.076267L302.762667 455.970133a12.8 12.8 0 0 0-4.5568 20.416l320.439466 353.1392a8.533333 8.533333 0 0 0 14.229334-2.5344z m-353.083733-3.861333c-14.677333 8.234667-33.211733 4.928-36.3008 4.548267-23.432533-2.875733-37.482667-24.2432-34.602667-47.68L192 470.634667l-86.724267-103.68c-31.965867-33.8688-30.318933-87.069867 3.677867-118.830934a84.561067 84.561067 0 0 1 47.4496-22.1184l691.464533-94.293333c46.3104-5.674667 88.520533 27.080533 94.280534 73.1648 1.9712 15.786667-0.597333 31.803733-7.406934 46.186667L700.599467 852.181333c-19.882667 41.984-70.225067 59.9296-112.443734 40.093867a84.625067 84.625067 0 0 1-25.553066-18.500267L409.079467 704.768c-0.849067 0.597333-43.946667 40.0512-129.2928 118.365867z m-21.3504-271.253333l10.2528 177.685333a8.533333 8.533333 0 0 0 14.528 5.568l71.057066-70.5152a17.066667 17.066667 0 0 0 0.9472-23.210667L273.442133 545.834667a8.533333 8.533333 0 0 0-15.005866 6.0416z" fill="#333333" p-id="23442"></path></svg>
        </n-button>
      </div>
    </div>

    <!-- 聊天图片弹出框 -->
    <div class="showPictureDialog" v-if="showPictureDialog">
      <uploadPicture :prefix="picturePrefix" @addPicture="addPicture" :maxSize="2"
                     :maxNumber="1"></uploadPicture>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useDialog } from 'naive-ui'
import { nextTick, reactive, getCurrentInstance, onMounted, onBeforeUnmount, watchEffect, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import emoji from './emoji'
import uploadPicture from './uploadPicture'

import OpenAI from 'openai'

  export default {
    components: {
      uploadPicture,
      emoji
  },
  props: {
    currentChatFriendId: {
      type: Number
    },
    currentChatGroupId: {
      type: Number
    },
    friends: {
      type: Object
    },
    groups: {
      type: Object
    },
    imMessages: {
      type: Object
    },
    groupMessages: {
      type: Object
    },
    imageList: {
      type: Array
    }
  },
  setup (props, context) {
    console.log('Chat组件初始化...')
    console.log('当前聊天好友ID:', props.currentChatFriendId)
    console.log('当前聊天群组ID:', props.currentChatGroupId)

    const globalProperties = getCurrentInstance().appContext.config.globalProperties
    const $common = globalProperties.$common
    const $http = globalProperties.$http
    const $constant = globalProperties.$constant
    const store = useStore()
    const dialog = useDialog()
    console.log('[Debug] API Key:', process.env.VUE_APP_DASHSCOPE_API_KEY)
    const openai = new OpenAI(
      {
        apiKey: process.env.VUE_APP_DASHSCOPE_API_KEY,
        baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
        dangerouslyAllowBrowser: true
      }
    )

    const data = reactive({
      // 发送消息
      msg: '',

      // 聊天图片
      showPictureDialog: false,
      picturePrefix: '',
      showPopoverImage: false,

      // 音视频通话相关
      showVideoCall: false,
      callType: 'video',
      isCaller: false,
      currentCallTargetId: null
    })

    // 添加音视频通话消息监听
    onMounted(() => {
      console.log('Chat组件已挂载')
      console.log('当前状态:', data)
    })

    onBeforeUnmount(() => {
      // 移除事件监听
    })

    function sendPicture () {
      if (!$common.isEmpty(props.currentChatFriendId)) {
        data.picturePrefix = 'im/friendMessage'
        data.showPictureDialog = true
      } else if (!$common.isEmpty(props.currentChatGroupId)) {
        data.picturePrefix = 'im/groupMessage'
        data.showPictureDialog = true
      }
    }

    function addPicture (res) {
      data.msg += '[' + store.state.currentUser.username + ',' + res + ']'
      data.showPictureDialog = false
    }

    function openFriendCircle (userId, avatar, username) {
      context.emit('openFriendCircle', userId, avatar, username)
    }

    function addEmoji (key) {
      data.msg += key
    }

    function sendImage (url) {
      data.msg += '[' + store.state.currentUser.username + ',' + url + ']'
      data.showPopoverImage = false
      doSend()
    }

    function sendPoetry (type) {
      if (type === 1) {
        sendGuShi()
      } else if (type === 2) {
        sendYiyan()
      } else if (type === 3) {
        sendDog()
      } else if (type === 4) {
        sendJitang()
      } else if (type === 5) {
        sendShehui()
      }
    }

    function sendGuShi () {
      const xhr = new XMLHttpRequest()
      xhr.open('get', $constant.jinrishici)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          const guShi = JSON.parse(xhr.responseText).content
          if (!$common.isEmpty(guShi)) {
            data.msg = guShi
            doSend()
          }
        }
      }
      xhr.send()
    }

    function sendYiyan () {
      const xhr = new XMLHttpRequest()
      xhr.open('get', $constant.yiyan)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          const yiyan = xhr.responseText
          if (!$common.isEmpty(yiyan)) {
            data.msg = yiyan.substring(1, yiyan.length - 1)
            doSend()
          }
        }
      }
      xhr.send()
    }

    function sendDog () {
      const xhr = new XMLHttpRequest()
      xhr.open('get', $constant.dog)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          const dog = xhr.responseText
          if (!$common.isEmpty(dog)) {
            data.msg = dog.substring(1, dog.length - 1)
            doSend()
          }
        }
      }
      xhr.send()
    }

    function sendJitang () {
      const xhr = new XMLHttpRequest()
      xhr.open('get', $constant.jitang)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          const jitang = xhr.responseText
          if (!$common.isEmpty(jitang)) {
            data.msg = jitang.substring(1, jitang.length - 1)
            doSend()
          }
        }
      }
      xhr.send()
    }

    function sendShehui () {
      const xhr = new XMLHttpRequest()
      xhr.open('get', $constant.shehui)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          const shehui = xhr.responseText
          if (!$common.isEmpty(shehui)) {
            data.msg = shehui.substring(1, shehui.length - 1)
            doSend()
          }
        }
      }
      xhr.send()
    }

    function send (e) {
      if (e && (e.ctrlKey || e.shiftKey) && e.keyCode === 13) {
        e.returnValue = false
        data.msg = data.msg + '\n'
      } else if (e && e.keyCode === 13) {
        e.returnValue = false
        doSend()
      }
    }

    async function doSend () {
      console.log('[doSend] 开始执行，当前消息:', data.msg) // 👈 记录入口
      console.log('当前对话用户id：', props.currentChatFriendId)
      console.log(
        '[DEBUG] currentChatFriendId 类型检查:', typeof props.currentChatFriendId, // 应为 "string"
        '值:', props.currentChatFriendId,
        '构造函数:', props.currentChatFriendId?.constructor?.name // 应为 "String"
      )
      const isAIChat = props.currentChatFriendId === 1
      console.log('[debug]:', isAIChat)
      console.debug('[doSend] 是否是AI对话:', isAIChat) // 👈 调试标记

      const sendMessage = (message) => {
        console.info('[sendMessage] 准备发送消息:', message) // 👈 消息发送前记录
        return new Promise(resolve => {
          context.emit('sendMsg', JSON.stringify(message), val => {
            console.log(`[sendMessage] 发送结果: ${val}`) // 👈 发送结果反馈
            resolve(val)
          })
        })
      }

      if ($common.isEmpty(data.msg)) {
        console.warn('[doSend] 消息内容为空，终止发送') // 👈 空内容警告
        return
      }

      if (isAIChat) {
        console.groupCollapsed('[doSend] 进入AI对话流程') // 👈 折叠日志组
        try {
          const userMessage = {
            messageType: 1, // 新增AI对话类型
            content: data.msg,
            fromId: store.state.currentUser.id,
            toId: '1',
            avatar: store.state.currentUser.avatar
          }
          console.log('[debug] userMessage的类型为：', typeof userMessage.content)
          console.log('[doSend] 构造用户消息:', userMessage)

          if (await sendMessage(userMessage)) {
            console.log('[doSend] 用户消息发送成功，清空输入')
            data.msg = ''

            console.time('[callLLM] AI响应耗时')// 👈 计时开始
            const aiResponse = await callLLM(userMessage.content)
            console.timeEnd('[callLLM] AI响应耗时') // 👈 计时结束

            console.log('[doSend] 收到AI响应:', aiResponse?.slice(0, 50) + '...') // 截取部分内容

            const aiMessage = {
              messageType: 1,
              content: aiResponse,
              fromId: '1',
              toId: store.state.currentUser.id,
              avatar: '/ai-avatar.png',
              timestamp: new Date().getTime()
            }
            await sendMessage(aiMessage)
            console.log('[doSend] AI回复已发送')
          }
        } catch (error) {
          console.error('[doSend] AI对话流程异常:', error) // 👈 错误捕获
        } finally {
          console.groupEnd() // 👈 结束日志组
        }
      } else if (!$common.isEmpty(props.currentChatFriendId)) {
        const message = {
          messageType: 1,
          content: data.msg,
          fromId: store.state.currentUser.id,
          toId: props.currentChatFriendId,
          avatar: store.state.currentUser.avatar
        }
        let success = false
        context.emit('sendMsg', JSON.stringify(message), val => {
          success = val
        })
        if (success) {
          data.msg = ''
        }
      } else if (!$common.isEmpty(props.currentChatGroupId)) {
        const message = {
          messageType: 2,
          content: data.msg,
          fromId: store.state.currentUser.id,
          groupId: props.currentChatGroupId,
          avatar: store.state.currentUser.avatar,
          username: store.state.currentUser.username
        }
        let success = false
        context.emit('sendMsg', JSON.stringify(message), val => {
          success = val
        })
        if (success) {
          data.msg = ''
        }
      }
    }

    async function callLLM (userContent) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'qwen-max', // 此处以qwen-plus为例，可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
          messages: [
            { role: 'system', content: '你是一个耐心体贴，富有专业素养的心理医生的身份，无论用户对你说什么，你都要用温柔和善的语言回复。此外，请用中文回答所有问题' },
            { role: 'user', content: userContent }
          ],
          stream: true
        })
        let fullResponse = ' '
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content || ''
          fullResponse += content
          console.log(JSON.stringify(chunk))
        }
        return fullResponse
      } catch (error) {
        console.error('ai调用失败：', error)
        return '服务暂时不可用'
      }
    }


    // 开始视频通话
    function startVideoCall () {
      if (!$common.isEmpty(props.currentChatFriendId)) {
        console.log('[音视频通话] 开始视频通话:', props.currentChatFriendId)
        context.emit('startCall', {
          type: 'video',
          targetId: props.currentChatFriendId,
          isCaller: true
        })
        // context.emit('startCall')

        // 创建 RTCPeerConnection 实例
        const configuration = {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' }
          ]
        }

        const peerConnection = new RTCPeerConnection(configuration)

        peerConnection.ontrack = (event) => {
          const remoteStream = event.streams[0]
          window.remoteStream = remoteStream // 可选，调试用
          const remoteVideo = document.getElementById('remoteVideo') // 或 remoteAudio
          if (remoteVideo) {
            remoteVideo.srcObject = remoteStream
            remoteVideo.play().catch(e => console.warn('播放失败:', e))
          }
        }

        // 获取本地媒体流
        navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        }).then(async (localStream) => {
          window.localStream = localStream
          // 设置音频输出设备
          if (localStream.getAudioTracks().length > 0) {
            const audioTrack = localStream.getAudioTracks()[0]
            audioTrack.enabled = true
          }

          // 将本地流添加到 peerConnection
          localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream)
          })

          // 创建并发送 offer
          const offer = await peerConnection.createOffer()
          await peerConnection.setLocalDescription(offer)

          // 发送 offer 消息
          const message = {
            messageType: 3,
            fromId: store.state.currentUser.id,
            toId: props.currentChatFriendId,
            content: JSON.stringify({
              type: 'offer',
              sdp: offer.sdp // 只发送 sdp 字符串
            })
          }

          // 监听 ICE 候选
          peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
              const iceMessage = {
                messageType: 8,
                fromId: store.state.currentUser.id,
                toId: props.currentChatFriendId,
                content: JSON.stringify({
                  type: 'candidate',
                  candidate: event.candidate
                })
              }
              context.emit('sendMsg', JSON.stringify(iceMessage))
            }
          }

          // 保存 peerConnection 实例
          window.currentPeerConnection = peerConnection

          context.emit('sendMsg', JSON.stringify(message))
        }).catch(error => {
          console.error('[音视频通话] 获取媒体设备失败:', error)
          ElMessage.error('无法访问摄像头或麦克风')
        })
      }
    }

    // 开始语音通话
    function startAudioCall () {
      if (!$common.isEmpty(props.currentChatFriendId)) {
        console.log('[音视频通话] 开始语音通话:', props.currentChatFriendId)
        context.emit('startCall', {
          type: 'audio',
          targetId: props.currentChatFriendId,
          isCaller: true
        })
        // context.emit('startCall')

        // 创建 RTCPeerConnection 实例
        const configuration = {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' }
          ]
        }

        const peerConnection = new RTCPeerConnection(configuration)

        // 获取本地媒体流
        navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        }).then(async (localStream) => {
          window.localStream = localStream
          // 设置音频输出设备
          if (localStream.getAudioTracks().length > 0) {
            const audioTrack = localStream.getAudioTracks()[0]
            audioTrack.enabled = true
          }

          // 将本地流添加到 peerConnection
          localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream)
          })

          peerConnection.ontrack = (event) => {
            const remoteStream = event.streams[0]
            window.remoteStream = remoteStream // 可选，调试用
            const remoteAudio = document.getElementById('remoteAudio') // 或 remoteAudio
            if (remoteAudio) {
              remoteAudio.srcObject = remoteStream
              remoteAudio.play().catch(e => console.warn('播放失败:', e))
            }
          }

          // 创建并发送 offer
          const offer = await peerConnection.createOffer()
          await peerConnection.setLocalDescription(offer)

          // 发送 offer 消息
          const message = {
            messageType: 4,
            fromId: store.state.currentUser.id,
            toId: props.currentChatFriendId,
            content: JSON.stringify({
              type: 'offer',
              sdp: offer.sdp
            })
          }

          // 监听 ICE 候选
          peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
              const iceMessage = {
                messageType: 8,
                fromId: store.state.currentUser.id,
                toId: props.currentChatFriendId,
                content: JSON.stringify({
                  type: 'candidate',
                  candidate: event.candidate
                })
              }
              context.emit('sendMsg', JSON.stringify(iceMessage))
            }
          }

          // 保存 peerConnection 实例
          window.currentPeerConnection = peerConnection

          context.emit('sendMsg', JSON.stringify(message))
        }).catch(error => {
          console.error('[音视频通话] 获取媒体设备失败:', error)
          ElMessage.error('无法访问麦克风')
        })
      }
    }

    return {
      ...toRefs(data),
      openFriendCircle,
      addEmoji,
      addPicture,
      sendPicture,
      sendImage,
      sendPoetry,
      send,
      doSend,
      startVideoCall,
      startAudioCall
    }
  }
}
</script>

<style scoped>
  .msg-container {
    background: var(--midWhite);
    overflow-y: scroll;
    height: calc(100% - 240px);
  }

  .msg-one {
    margin: 15px 20px;
    display: flex;
    align-items: flex-start;
  }

  .message {
    max-width: 50%;
    padding: 5px 10px;
    line-height: 25px;
    word-break: break-all;
    position: relative;
    color: var(--black);
    margin: 0 12px 0 12px;
  }

  .message::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border: 3px solid;
    top: 0;
  }

  .message-left .message {
    background-color: var(--white);
    border-radius: 0 15px 15px 15px;
  }

  .message-left .message::before {
    left: -6px;
    border-color: var(--white) var(--white) transparent transparent;
  }

  .message-right {
    flex-direction: row-reverse;
  }

  .message-right .message {
    color: white;
    background-color: var(--messageColor);
    border-radius: 15px 0 15px 15px;
  }

  .message-right .message::before {
    right: -6px;
    border-color: var(--messageColor) transparent transparent var(--messageColor);
  }

  .msg-date, .msg-user {
    font-size: 12px;
    color: var(--greyFont);
  }

  .myEmoji {
    transition: all 0.5s;
    margin-right: 15px;
    cursor: pointer;
  }

  .myEmoji:hover {
    transform: scale(1.2);
  }

  .message-content {
    width: calc(100% - 30px);
    margin: 0 15px;
    box-sizing: border-box;
    height: calc(100% - 100px);
    display: block;
    border: none;
    outline: none;
    box-shadow: none;
    resize: none;
    font-size: 18px;
  }

  .message-send {
    float: right;
    padding: 10px 30px 15px;
  }

  .message-send .n-button {
    height: 30px;
    padding: 10px 25px;
  }

  .image-list {
    overflow: auto;
    max-width: 400px;
    max-height: 200px;
    display: flex;
    flex-flow: wrap;
    gap: 10px;
  }

  @media screen and (max-width: 400px) {
    .msg-one {
      margin: 15px 10px;
    }

    .image-list {
      max-width: 230px !important;
    }
  }
</style>
