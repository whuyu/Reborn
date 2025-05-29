<template>
  <n-modal v-model:show="showCallModal" :mask-closable="false">
    <div class="video-call-container">

      <div class="video-call-header">
        <span>{{ callType === 'video' ? '视频通话' : '语音通话' }}</span>
        <span>{{ callStatus }}</span>
      </div>

      <div class="video-call-content" v-if="callType === 'video'">
        <div class="remote-video">
          <video ref="remoteVideo" autoplay playsinline></video>
        </div>
        <div class="local-video">
          <video ref="localVideo" autoplay playsinline muted></video>
        </div>
      </div>

      <div class="audio-call-content" v-if="callType === 'audio'">
        <div class="audio-avatar">
          <n-avatar
            :src="targetAvatar"
            :size="100"
            style="border-radius: 50%;"
            object-fit="cover"
          />
        </div>
        <div class="audio-status">{{ callStatus }}</div>
        <audio ref="remoteAudio" autoplay></audio>
      </div>

      <div class="video-call-controls">
        <template v-if="isCaller">
          <n-button @click="cancelCall" type="error" circle>
            <template #icon>
              <svg viewBox="0 0 1024 1024" width="24" height="24">
                <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m0 960C264.6 960 64 759.4 64 512S264.6 64 512 64s448 200.6 448 448-200.6 448-448 448z" fill="#FFFFFF"/>
                <path d="M512 128c-212.1 0-384 171.9-384 384s171.9 384 384 384 384-171.9 384-384-171.9-384-384-384z m0 704c-176.7 0-320-143.3-320-320s143.3-320 320-320 320 143.3 320 320-143.3 320-320 320z" fill="#FFFFFF"/>
                <path d="M512 256c-141.4 0-256 114.6-256 256s114.6 256 256 256 256-114.6 256-256-114.6-256-256-256z m0 448c-106 0-192-86-192-192s86-192 192-192 192 86 192 192-86 192-192 192z" fill="#FFFFFF"/>
              </svg>
            </template>
          </n-button>
        </template>
        <template v-else>
          <n-button v-if="isButton" @click="acceptCall" type="success" circle style="margin-right: 20px">
            <template #icon>
              <svg viewBox="0 0 1024 1024" width="24" height="24">
                <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m0 960C264.6 960 64 759.4 64 512S264.6 64 512 64s448 200.6 448 448-200.6 448-448 448z" fill="#FFFFFF"/>
                <path d="M512 128c-212.1 0-384 171.9-384 384s171.9 384 384 384 384-171.9 384-384-171.9-384-384-384z m0 704c-176.7 0-320-143.3-320-320s143.3-320 320-320 320 143.3 320 320-143.3 320-320 320z" fill="#FFFFFF"/>
                <path d="M512 256c-141.4 0-256 114.6-256 256s114.6 256 256 256 256-114.6 256-256-114.6-256-256-256z m0 448c-106 0-192-86-192-192s86-192 192-192 192 86 192 192-86 192-192 192z" fill="#FFFFFF"/>
              </svg>
            </template>
          </n-button>

          <n-button @click="rejectCall" type="error" circle>
            <template #icon>
              <svg viewBox="0 0 1024 1024" width="24" height="24">
                <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m0 960C264.6 960 64 759.4 64 512S264.6 64 512 64s448 200.6 448 448-200.6 448-448 448z" fill="#FFFFFF"/>
                <path d="M512 128c-212.1 0-384 171.9-384 384s171.9 384 384 384 384-171.9 384-384-171.9-384-384-384z m0 704c-176.7 0-320-143.3-320-320s143.3-320 320-320 320 143.3 320 320-143.3 320-320 320z" fill="#FFFFFF"/>
                <path d="M512 256c-141.4 0-256 114.6-256 256s114.6 256 256 256 256-114.6 256-256-114.6-256-256-256z m0 448c-106 0-192-86-192-192s86-192 192-192 192 86 192 192-86 192-192 192z" fill="#FFFFFF"/>
              </svg>
            </template>
          </n-button>
        </template>
      </div>
    </div>
  </n-modal>

</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch, computed, toRef } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

export default {
  name: 'VideoCall',
  props: {
    callType: {
      type: String,
      default: 'video'
    },
    isCaller: {
      type: Boolean,
      default: false
    },
    targetId: {
      type: Number,
      required: true
    },
    showCallModal: {
      type: Boolean,
      default: false
    },
    isAccepted: {
      type: Boolean,
      default: false
    }
  },

  setup (props, { emit }) {
    const isButton = ref(true)
    const callStatus = ref('等待接听...')
    const localVideo = ref(null)
    const remoteVideo = ref(null)
    const remoteAudio = ref(null)
    const store = useStore()
    const showCallModal = toRef(props, 'showCallModal')
    const isAccepted = toRef(props, 'isAccepted')

    console.log(props.showCallModal)

    if (props.showCallModal && props.isCaller) {
      // console.log('props.showCallModal 变化1111111111111111')
      callStatus.value = '正在呼叫...'
    }


    watch(
      showCallModal,
      (newVal) => {
        console.log('本地 showCallModal 变化', newVal)
        emit('update:showCallModal', newVal)
      }
    )
    watch(
      isAccepted,
      (newVal) => {
        if (props.isAccepted && props.isCaller) {
          console.log('11111111111111111111111111111111111111111111111111111')
          callStatus.value = '通话中...'
        }
        console.log('本地 isAccpeted 变化', newVal)
        emit('update:isAccepted', newVal)
      }
    )

    // 获取目标用户头像
    const targetAvatar = computed(() => {
      // 这里应该根据实际情况获取目标用户的头像
      // 可以从store中获取，或者父组件传入
      return store.state.friends && store.state.friends[props.targetId]
        ? store.state.friends[props.targetId].avatar
        : ''
    })

    // 设置本地视频流
    const setLocalStream = (stream) => {
      if (localVideo.value) {
        localVideo.value.srcObject = stream
      }
    }

    // 设置远程视频流
    const setRemoteStream = (stream) => {
      if (props.callType === 'video' && remoteVideo.value) {
        remoteVideo.value.srcObject = stream
      } else if (props.callType === 'audio' && remoteAudio.value) {
        remoteAudio.value.srcObject = stream
        remoteAudio.value.play().catch(err => {
          console.warn('播放远端音频失败', err)
        })
      }
      callStatus.value = '通话中...'
    }

    // 接受通话 2025-05-07
    const acceptCall = async () => {
      try {
        isButton.value = false
        // 创建 RTCPeerConnection 实例
        const configuration = {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' }
          ]
        }

        const peerConnection = new RTCPeerConnection(configuration)

        // 获取本地媒体流
        const constraints = {
          audio: true,
          video: props.callType === 'video'
        }

        const localStream = await navigator.mediaDevices.getUserMedia(constraints)
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

        // 设置本地视频流
        if (props.callType === 'video') {
          setLocalStream(localStream)
        }

        // 监听远程流
        peerConnection.ontrack = (event) => {
          console.log('[远端轨道]', event.track.kind) // 应该包含 audio
          const remoteStream = event.streams[0]
          setRemoteStream(remoteStream)
        }

        // 监听 ICE 候选
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            const message = {
              messageType: 8,
              content: JSON.stringify({
                type: 'candidate',
                candidate: event.candidate
              }),
              fromId: store.state.currentUser.id,
              toId: props.targetId
            }
            emit('sendMsg', JSON.stringify(message))
          }
        }

        // 设置远程描述（offer）
        const offer = window.pendingOffer
        if (offer) {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(offer))

          // 创建应答
          const answer = await peerConnection.createAnswer()
          await peerConnection.setLocalDescription(answer)

          // 发送应答
          const message = {
            messageType: 5,
            content: JSON.stringify({
              type: 'answer',
              sdp: answer.sdp
            }),
            fromId: store.state.currentUser.id,
            toId: props.targetId
          }
          emit('sendMsg', JSON.stringify(message), () => {
            console.log('[音视频通话] 接受通话消息发送成功')
            emit('accept-call')
          })

          // 处理之前缓存的 ICE candidates
          if (window.pendingIceCandidates) {
            for (const candidate of window.pendingIceCandidates) {
              try {
                await peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
              } catch (error) {
                console.error('[音视频通话] 添加缓存的 ICE candidate 失败:', error)
              }
            }
            window.pendingIceCandidates = []
          }
        }

        // 保存 peerConnection 实例
        window.currentPeerConnection = peerConnection

        callStatus.value = '通话中...'
      } catch (error) {
        isButton.value = true
        console.error('[音视频通话] 接受通话失败:', error)
        ElMessage.error('无法访问摄像头或麦克风')
      }
    }

    // 拒绝通话
    const rejectCall = () => {
      console.log('[音视频通话] 拒绝通话')
      // 发送拒绝通话消息
      const message = {
        messageType: 6, // 拒绝通话
        fromId: store.state.currentUser.id,
        toId: props.targetId,
        content: '拒绝通话'
      }
      console.log('[音视频通话] 发送拒绝通话消息:', message)
      emit('sendMsg', JSON.stringify(message), () => {
        console.log('[音视频通话] 拒绝通话消息发送成功')
        emit('reject-call', props.targetId)
      })
    }

    // 取消通话
    const cancelCall = () => {
      console.log('[音视频通话] 取消通话')
      // 发送取消通话消息
      const message = {
        messageType: 7, // 取消通话
        fromId: store.state.currentUser.id,
        toId: props.targetId,
        content: '取消通话'
      }
      console.log('[音视频通话] 发送取消通话消息:', message)
      emit('sendMsg', JSON.stringify(message), () => {
        console.log('[音视频通话] 取消通话消息发送成功')
        emit('cancel-call', props.targetId)
      })
    }

    onBeforeUnmount(() => {
      // 清理视频流
      if (localVideo.value && localVideo.value.srcObject) {
        localVideo.value.srcObject.getTracks().forEach(track => track.stop())
      }
      if (remoteVideo.value && remoteVideo.value.srcObject) {
        remoteVideo.value.srcObject.getTracks().forEach(track => track.stop())
      }
      // 清理音频流
      if (remoteAudio.value && remoteAudio.value.srcObject) {
        remoteAudio.value.srcObject.getTracks().forEach(track => track.stop())
      }

      // 关闭 PeerConnection
      if (window.currentPeerConnection) {
        window.currentPeerConnection.close()
        window.currentPeerConnection = null
      }

      // 关闭本地媒体流
      if (window.localStream) {
        window.localStream.getTracks().forEach(track => track.stop())
        window.localStream = null
      }
      // 关闭远程媒体流
      if (remoteVideo.value?.srcObject) {
        remoteVideo.value.srcObject.getTracks().forEach(track => track.stop())
      }
    })

    return {
      isButton,
      callStatus,
      localVideo,
      remoteVideo,
      remoteAudio,
      targetAvatar,
      setLocalStream,
      setRemoteStream,
      acceptCall,
      rejectCall,
      cancelCall
    }
  }
}
</script>

<style scoped>
.video-call-container {
  background: var(--white);
  border-radius: 8px;
  padding: 20px;
  width: 500px;
}

.video-call-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 18px;
}

.video-call-content {
  position: relative;
  width: 100%;
  height: 300px;
  background: var(--midWhite);
  border-radius: 4px;
  overflow: hidden;
}

.audio-call-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* 修改高度设置 */
  min-height: 200px; /* 最小高度保障基础显示 */
  height: 40vh; /* 动态高度基于视口 */
  max-height: 400px; /* 最大高度限制 */
  background: var(--midWhite);
  border-radius: 4px;
  padding: 20px 10px; /* 左右留白减少 */
  box-sizing: border-box; /* 包含padding在尺寸计算中 */
}

.audio-avatar {
  margin-bottom: 1.5em; /* 改用相对单位 */
  flex-shrink: 0; /* 防止头像被压缩 */
}

.audio-status {
  font-size: clamp(16px, 4vw, 18px); /* 响应式字体大小 */
  margin: 1em 0; /* 相对单位间距 */
  color: var(--greyFont);
  text-align: center; /* 文字居中 */
  line-height: 1.4; /* 行高优化 */
  max-width: 90%; /* 防止长文本溢出 */
  word-break: break-word; /* 长文本换行 */
}


.remote-video {
  width: 100%;
  height: 100%;
}

.local-video {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 120px;
  height: 90px;
  background: var(--black);
  border-radius: 4px;
  overflow: hidden;
}

.video-call-controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
