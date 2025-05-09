<template>
  <n-modal v-model:show="showCallModal" :mask-closable="false">
    <div class="video-call-container">
      <div class="video-call-header">
        <span>{{ callType === 'video' ? '视频通话' : '语音通话' }}</span>
        <span>{{ callStatus }}</span>
      </div>

      <div class="video-call-content">
        <div class="remote-video" v-if="callType === 'video'">
          <video ref="remoteVideo" autoplay playsinline></video>
        </div>
        <div class="local-video" v-if="callType === 'video'">
          <video ref="localVideo" autoplay playsinline muted></video>
        </div>
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
          <n-button @click="acceptCall" type="success" circle style="margin-right: 20px">
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
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
    }
  },
  setup (props, { emit }) {
    const callStatus = ref('等待对方接听...')
    const localVideo = ref(null)
    const remoteVideo = ref(null)
    const store = useStore()

    // 设置本地视频流
    const setLocalStream = (stream) => {
      if (localVideo.value) {
        localVideo.value.srcObject = stream
      }
    }

    // 设置远程视频流
    const setRemoteStream = (stream) => {
      if (remoteVideo.value) {
        remoteVideo.value.srcObject = stream
        callStatus.value = '通话中...'
      }
    }

    // 接受通话 2025-05-07
    const acceptCall = async () => {
      try {
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
        console.log('[远端轨道]', event.track.kind)  // 应该包含 audio
        const remoteStream = event.streams[0]
        setRemoteStream(remoteStream)
        
        // 播放音频（尤其对 audio-only 情况）
        const remoteAudio = document.getElementById('remoteAudio')
        if (remoteAudio) {
          remoteAudio.srcObject = remoteStream
          remoteAudio.play().catch(err => {
            console.warn('播放远端音频失败', err)
          })
        }
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
        console.log('[音视频通话] 接受通话消息发送成功');
        emit('acceptCall')
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
        emit('rejectCall', props.targetId)
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
        emit('cancelCall', props.targetId)
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
    })

    return {
      callStatus,
      localVideo,
      remoteVideo,
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
