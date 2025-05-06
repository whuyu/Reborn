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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

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
  setup(props, { emit }) {
    const callStatus = ref('等待对方接听...');
    const localVideo = ref(null);
    const remoteVideo = ref(null);
    const store = useStore();

    // 设置本地视频流
    const setLocalStream = (stream) => {
      if (localVideo.value) {
        localVideo.value.srcObject = stream;
      }
    };

    // 设置远程视频流
    const setRemoteStream = (stream) => {
      if (remoteVideo.value) {
        remoteVideo.value.srcObject = stream;
        callStatus.value = '通话中...';
      }
    };

    // 接受通话
    const acceptCall = () => {
      console.log('[音视频通话] 接受通话');
      // 发送接受通话消息
      const message = {
        messageType: 5, // 接受通话
        fromId: store.state.currentUser.id,
        toId: props.targetId,
        content: '接受通话'
      }
      console.log('[音视频通话] 发送接受通话消息:', message);
      emit('sendMsg', JSON.stringify(message), () => {
        console.log('[音视频通话] 接受通话消息发送成功');
        emit('acceptCall')
      })
    }

    // 拒绝通话
    const rejectCall = () => {
      
      console.log('[音视频通话] 拒绝通话');
      // 发送拒绝通话消息
      const message = {
        messageType: 6, // 拒绝通话
        fromId: store.state.currentUser.id,
        toId: props.targetId,
        content: '拒绝通话'
      }
      console.log('[音视频通话] 发送拒绝通话消息:', message);
      emit('sendMsg', JSON.stringify(message), () => {
        console.log('[音视频通话] 拒绝通话消息发送成功');
        emit('rejectCall', props.targetId)
      })
    }

    // 取消通话
    const cancelCall = () => {
      console.log('[音视频通话] 取消通话');
      // 发送取消通话消息
      const message = {
        messageType: 7, // 取消通话
        fromId: store.state.currentUser.id,
        toId: props.targetId,
        content: '取消通话'
      }
      console.log('[音视频通话] 发送取消通话消息:', message);
      emit('sendMsg', JSON.stringify(message), () => {
        console.log('[音视频通话] 取消通话消息发送成功');
        emit('cancelCall', props.targetId)
      })
    }

    onBeforeUnmount(() => {
      // 清理视频流
      if (localVideo.value && localVideo.value.srcObject) {
        localVideo.value.srcObject.getTracks().forEach(track => track.stop());
      }
      if (remoteVideo.value && remoteVideo.value.srcObject) {
        remoteVideo.value.srcObject.getTracks().forEach(track => track.stop());
      }
    });

    return {
      callStatus,
      localVideo,
      remoteVideo,
      setLocalStream,
      setRemoteStream,
      acceptCall,
      rejectCall,
      cancelCall
    };
  }
};
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