<template>
  <div>
    <!-- 群名称 -->
    <div style="height: 60px;background-color: var(--maxWhite)">
      <span style="line-height: 60px;margin-left: 20px;font-size: 18px">
        {{groups[currentGroupId].groupName}}
      </span>
    </div>

    <!-- 群信息 -->
    <div style="background: var(--midWhite);height: calc(100% - 60px)">
      <!-- 群头像 -->
      <div class="myCenter" style="padding: 50px 0;">
        <n-avatar object-fit="cover"
                  :size="60"
                  lazy
                  style="border-radius: 50%;"
                  :src="groups[currentGroupId].avatar"/>
      </div>

      <!-- 群信息 -->
      <div class="myCenter">
        <div style="width: 65%;font-size: 16px">
          <!-- 群名称 -->
          <div style="margin-bottom: 10px">
            <span class="friend-label">
              群名称
            </span>
            <span style="margin: 0 5px 0 0">
              {{groups[currentGroupId].groupName}}
            </span>
            <span @click="changeDataType(2)"
                  v-if="groups[currentGroupId].masterFlag"
                  style="display: inline-block;vertical-align: sub;cursor: pointer">
              <svg viewBox="0 0 1024 1024" width="20" height="20">
                <path
                  d="M929.909189 827.019236H93.990821c-16.598379 0-29.997071 13.398692-29.99707 29.997071s13.398692 29.997071 29.99707 29.997071h835.918368c16.598379 0 29.997071-13.398692 29.99707-29.997071 0-16.498389-13.398692-29.997071-29.99707-29.997071z"
                  fill="#FF6600" opacity=".502"></path>
                <path
                  d="M705.931061 198.080656c3.099697 0 8.999121 0.799922 14.098624 5.899424l28.297236 28.297237c5.099502 5.099502 5.899424 10.998926 5.899424 14.098623 0 3.099697-0.799922 8.999121-5.899424 14.098623L392.161703 616.739772l-86.991505 28.997168 27.597305-82.791915 358.964945-358.964945c5.099502-5.199492 11.098916-5.899424 14.198613-5.899424m0-59.994141c-20.497998 0-40.896006 7.799238-56.594473 23.397715L281.672493 529.148325l-0.699932-0.699931-70.693096 212.079289 212.079289-70.693097 0.699932 0.699932 367.664095-367.664095c31.196953-31.196953 31.196953-81.892003 0-113.088956l-28.297237-28.297237c-15.598477-15.598477-35.996485-23.397715-56.494483-23.397715z"
                  fill="#FF6600"></path>
                <path d="M578.626494 230.803461L621.049351 188.381603l141.40619 141.406191-42.421857 42.421857z"
                      fill="#FF6600"></path>
              </svg>
            </span>
          </div>

          <!-- 群公告 -->
          <div style="margin-bottom: 10px">
            <span class="friend-label">
              群公告
            </span>
            <span style="margin: 0 5px 0 0">
              {{groups[currentGroupId].notice}}
            </span>
            <span @click="changeDataType(3)"
                  v-if="groups[currentGroupId].masterFlag"
                  style="display: inline-block;vertical-align: sub;cursor: pointer">
              <svg viewBox="0 0 1024 1024" width="20" height="20">
                <path
                  d="M929.909189 827.019236H93.990821c-16.598379 0-29.997071 13.398692-29.99707 29.997071s13.398692 29.997071 29.99707 29.997071h835.918368c16.598379 0 29.997071-13.398692 29.99707-29.997071 0-16.498389-13.398692-29.997071-29.99707-29.997071z"
                  fill="#FF6600" opacity=".502"></path>
                <path
                  d="M705.931061 198.080656c3.099697 0 8.999121 0.799922 14.098624 5.899424l28.297236 28.297237c5.099502 5.099502 5.899424 10.998926 5.899424 14.098623 0 3.099697-0.799922 8.999121-5.899424 14.098623L392.161703 616.739772l-86.991505 28.997168 27.597305-82.791915 358.964945-358.964945c5.099502-5.199492 11.098916-5.899424 14.198613-5.899424m0-59.994141c-20.497998 0-40.896006 7.799238-56.594473 23.397715L281.672493 529.148325l-0.699932-0.699931-70.693096 212.079289 212.079289-70.693097 0.699932 0.699932 367.664095-367.664095c31.196953-31.196953 31.196953-81.892003 0-113.088956l-28.297237-28.297237c-15.598477-15.598477-35.996485-23.397715-56.494483-23.397715z"
                  fill="#FF6600"></path>
                <path d="M578.626494 230.803461L621.049351 188.381603l141.40619 141.406191-42.421857 42.421857z"
                      fill="#FF6600"></path>
              </svg>
            </span>
          </div>

          <!-- 群简介 -->
          <div style="margin-bottom: 40px">
            <span class="friend-label">群简介</span>
            <span style="margin: 0 5px 0 6px">
              {{groups[currentGroupId].introduction}}
            </span>
            <span @click="changeDataType(4)"
                  v-if="groups[currentGroupId].masterFlag"
                  style="display: inline-block;vertical-align: sub;cursor: pointer">
              <svg viewBox="0 0 1024 1024" width="20" height="20">
                <path
                  d="M929.909189 827.019236H93.990821c-16.598379 0-29.997071 13.398692-29.99707 29.997071s13.398692 29.997071 29.99707 29.997071h835.918368c16.598379 0 29.997071-13.398692 29.99707-29.997071 0-16.498389-13.398692-29.997071-29.99707-29.997071z"
                  fill="#FF6600" opacity=".502"></path>
                <path
                  d="M705.931061 198.080656c3.099697 0 8.999121 0.799922 14.098624 5.899424l28.297236 28.297237c5.099502 5.099502 5.899424 10.998926 5.899424 14.098623 0 3.099697-0.799922 8.999121-5.899424 14.098623L392.161703 616.739772l-86.991505 28.997168 27.597305-82.791915 358.964945-358.964945c5.099502-5.199492 11.098916-5.899424 14.198613-5.899424m0-59.994141c-20.497998 0-40.896006 7.799238-56.594473 23.397715L281.672493 529.148325l-0.699932-0.699931-70.693096 212.079289 212.079289-70.693097 0.699932 0.699932 367.664095-367.664095c31.196953-31.196953 31.196953-81.892003 0-113.088956l-28.297237-28.297237c-15.598477-15.598477-35.996485-23.397715-56.494483-23.397715z"
                  fill="#FF6600"></path>
                <path
                  d="M578.626494 230.803461L621.049351 188.381603l141.40619 141.406191-42.421857 42.421857z"
                  fill="#FF6600"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>

      <!-- 群按钮 -->
      <div class="myCenter sendMsg">
        <n-button @click="sendGroupMessage()" style="border-radius: 30px;">
          发消息
          <svg t="1748407855813" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23441" width="24" height="24"><path d="M742.894933 200.7168L154.436267 299.3536a8.533333 8.533333 0 0 0-5.077334 13.960533L222.357333 398.72a17.066667 17.066667 0 0 0 19.1232 4.834133l503.658667-194.645333a4.266667 4.266667 0 0 0-2.24-8.192z m-110.024533 626.274133l240.042667-593.019733a8.533333 8.533333 0 0 0-11.191467-11.076267L302.762667 455.970133a12.8 12.8 0 0 0-4.5568 20.416l320.439466 353.1392a8.533333 8.533333 0 0 0 14.229334-2.5344z m-353.083733-3.861333c-14.677333 8.234667-33.211733 4.928-36.3008 4.548267-23.432533-2.875733-37.482667-24.2432-34.602667-47.68L192 470.634667l-86.724267-103.68c-31.965867-33.8688-30.318933-87.069867 3.677867-118.830934a84.561067 84.561067 0 0 1 47.4496-22.1184l691.464533-94.293333c46.3104-5.674667 88.520533 27.080533 94.280534 73.1648 1.9712 15.786667-0.597333 31.803733-7.406934 46.186667L700.599467 852.181333c-19.882667 41.984-70.225067 59.9296-112.443734 40.093867a84.625067 84.625067 0 0 1-25.553066-18.500267L409.079467 704.768c-0.849067 0.597333-43.946667 40.0512-129.2928 118.365867z m-21.3504-271.253333l10.2528 177.685333a8.533333 8.533333 0 0 0 14.528 5.568l71.057066-70.5152a17.066667 17.066667 0 0 0 0.9472-23.210667L273.442133 545.834667a8.533333 8.533333 0 0 0-15.005866 6.0416z" fill="#333333" p-id="23442"></path></svg>
        </n-button>
        <template
          v-if="groups[currentGroupId].groupType === 1 || (groups[currentGroupId].groupType === 2 && groups[currentGroupId].masterFlag)">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <n-button @click="groupSetting()" style="border-radius: 30px;">
            群设置
            <svg t="1748324336561" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="9153" width="24" height="24">
              <path
                d="M408.405333 60.68419l-4.096 0.121905c-33.718857 1.950476-58.416762 28.038095-58.416762 62.390857v78.823619l-3.34019 1.706667a236.422095 236.422095 0 0 0-13.068191 7.631238l-4.705523 2.998857-66.389334-41.496381c-30.45181-17.65181-69.168762-8.801524-84.699428 22.016L71.143619 374.247619l-1.048381 1.682286c-18.627048 31.646476-8.387048 69.12 23.600762 84.504381l2.876952 1.29219 62.70781 39.228953v21.699047l-62.780952 39.228953-2.852572 1.29219c-31.98781 15.36-42.179048 52.784762-23.673905 84.431238l0.975238 1.511619 103.66781 181.321143 1.29219 2.096762c19.968 30.012952 54.905905 36.985905 83.163429 22.747429l2.925714-1.657905 63.804953-39.887238 5.607619 3.072 14.482285 7.582476v75.873524c0 35.791238 26.770286 62.512762 62.512762 62.512762h207.189334l4.242285-0.121905c33.596952-2.023619 58.172952-27.91619 58.343619-62.19581l-0.024381-73.801143 3.364572-1.706666 4.266667-2.389334 8.825904-5.266285 4.656762-3.023238 66.462476 41.569523 4.120381 1.365334c31.061333 10.410667 66.218667-0.121905 80.530286-28.525715l104.472381-182.759619 1.121524-3.413333 1.29219-4.266667c7.753143-28.525714-1.706667-59.489524-26.063238-74.191238l-1.536-0.877714-64.975238-40.618667v-21.674666l62.732191-39.228953 2.925714-1.29219c31.98781-15.36 42.179048-52.784762 23.649524-84.406857l-1.170286-1.926096-103.375238-180.906666-1.26781-2.121143c-19.992381-30.012952-54.930286-36.985905-83.187809-22.723048l-2.925714 1.633524-63.829334 39.887238-5.583238-3.072-14.506667-7.606857V123.196952c0-35.791238-26.745905-62.512762-62.48838-62.512762h-207.238096z m196.608 73.142858v110.470095l30.890667 15.408762 17.115429 8.777143 9.99619 5.38819 5.607619 3.242667 5.071238 3.047619 4.656762 3.023238 19.651048 13.043809 92.964571-58.12419 93.671619 164.035048-93.086476 58.221714v102.741333l93.110857 58.172953-93.720381 164.059428-92.94019-58.099809-36.620191 24.502857c-12.434286 8.167619-21.528381 12.824381-28.525714 14.555428l-27.818667 6.875429-0.024381 116.467809h-185.977904v-110.396952l-36.449524-18.236952-14.140953-7.314286-7.631238-4.169143-6.582857-3.803428-5.778286-3.584-22.357333-14.82362-92.964571 58.09981-93.793524-164.035048 93.110857-58.197333v-102.716952l-93.037714-58.221715 91.550476-160.280381 95.134476 59.489524 36.620191-24.527238c10.898286-7.143619 19.21219-11.605333 25.795047-13.750857l2.730667-0.804571 27.794286-6.875429V133.851429h185.977904z"
                fill="#000000" p-id="9154"></path>
              <path
                d="M512 329.142857a36.571429 36.571429 0 0 1 0 73.142857 109.714286 109.714286 0 1 0 102.278095 69.87581l-2.657524-6.192762a36.571429 36.571429 0 0 1 66.389334-30.72A182.857143 182.857143 0 1 1 512 329.142857z"
                fill="#000000" p-id="9155"></path>
            </svg>
          </n-button>
        </template>
      </div>
    </div>

    <!-- 群设置 -->
    <n-drawer class="group-card"
              v-model:show="activeGroupSet"
              :width="300"
              placement="right"
              to="#body-group">
      <n-card style="margin-bottom: 20px">
        <n-tabs default-value="群设置" justify-content="space-evenly" type="line">
          <!-- 群设置 -->
          <n-tab-pane name="群设置" tab="群设置">
            <div>
              <div class="myCenter" style="margin: 15px 0">
                <n-avatar lazy object-fit="cover" @click="changeAvatar(2)" round class="group-avatar" :size="70"
                          :src="groups[currentGroupId].avatar" style="border-radius: 50%;"/>
              </div>

              <div class="group-set"
                   v-if="groups[currentGroupId].groupType === 1 && groups[currentGroupId].masterFlag">
                <div>
                  是否需要审核
                </div>
                <div>
                  <n-switch @update:value="updateInType(currentGroupId, !groups[currentGroupId].inType)"
                            v-model:value="groups[currentGroupId].inType"/>
                </div>
              </div>

              <div style="display: flex;justify-content: space-around;margin-top: 20px">
                <n-button type="warning" @click="exitGroup(currentGroupId)"
                          v-if="groups[currentGroupId].groupType === 1">
                  退出群
                </n-button>

                <template v-if="groups[currentGroupId].masterFlag">
                  <n-button type="error" @click="dissolveGroup(currentGroupId)">
                    解散群
                  </n-button>
                </template>
              </div>
            </div>
          </n-tab-pane>

          <!-- 成员设置 -->
          <n-tab-pane name="群成员" tab="群成员" v-if="groups[currentGroupId].groupType === 1">
            <div class="group-user"
                 v-for="(item, index) in groupUsers"
                 :key="index">
              <!-- 成员信息 -->
              <div style="display: flex;align-items: center">
                <div>
                  <n-avatar object-fit="cover"
                            :size="40"
                            lazy
                            style="border-radius: 50%;"
                            :src="item.avatar"/>
                </div>

                <div style="margin-left: 20px;font-size: 16px">
                  {{item.username}}
                </div>
              </div>

              <!-- 成员设置 -->
              <div style="display: flex;align-items: center">
                <div v-if="item.adminFlag"
                     class="user-tag"
                     style="background-color: var(--themeBackground)">
                  管理员
                </div>

                <div v-if="!item.adminFlag && groups[currentGroupId].adminFlag && item.userStatus === 1"
                     class="user-tag"
                     @click="changeGroupUserStatus(currentGroupId, item, 1, 2)"
                     style="background-color: var(--red);cursor: pointer">
                  禁言
                </div>

                <div v-if="!item.adminFlag && groups[currentGroupId].adminFlag && item.userStatus === 2"
                     class="user-tag"
                     @click="changeGroupUserStatus(currentGroupId, item, 2, 1)"
                     style="background-color: var(--blue);cursor: pointer">
                  解禁
                </div>
              </div>
            </div>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </n-drawer>
  </div>
</template>

<script>
  import {useStore} from 'vuex';

  import {useDialog} from 'naive-ui';

  import {nextTick} from 'vue';

  import {ElMessage} from "element-plus";

  import {reactive, getCurrentInstance, onMounted, onBeforeUnmount, watchEffect, toRefs} from 'vue';

  export default {
    props: {
      currentGroupId: {
        type: Number
      },
      groups: {
        type: Object
      }
    },
    setup(props, context) {
      const globalProperties = getCurrentInstance().appContext.config.globalProperties;
      const $common = globalProperties.$common;
      const $http = globalProperties.$http;
      const $constant = globalProperties.$constant;
      const store = useStore();
      const dialog = useDialog();

      let data = reactive({
        //群成员
        groupUsers: [],
        //组设置
        activeGroupSet: false
      })

      function updateInType(currentGroupId, inType) {
        $http.post($constant.baseURL + "/imChatGroup/updateGroup", {
          id: props.groups[currentGroupId].id,
          inType: inType
        })
          .then((res) => {
            ElMessage({
              message: "修改成功！",
              type: 'success'
            });
          })
          .catch((error) => {
            ElMessage({
              message: error.message,
              type: 'error'
            });
          });
      }

      function changeDataType(type) {
        context.emit("changeDataType", type);
      }

      function sendGroupMessage() {
        context.emit("sendGroupMessage");
      }

      function groupSetting() {
        data.activeGroupSet = true;
        if (props.groups[props.currentGroupId].groupType === 1) {
          getGroupUser(props.currentGroupId);
        }
      }

      function getGroupUser(groupId, current = 1, size = 9999) {
        $http.get($constant.baseURL + "/imChatGroupUser/getGroupUser", {groupId: groupId, current: current, size: size})
          .then((res) => {
            if (!$common.isEmpty(res.data) && !$common.isEmpty(res.data.records)) {
              data.groupUsers = res.data.records;
            }
          })
          .catch((error) => {
            ElMessage({
              message: error.message,
              type: 'error'
            });
          });
      }

      function exitGroup(currentGroupId) {
        context.emit("exitGroup", currentGroupId);
      }

      function dissolveGroup(currentGroupId) {
        context.emit("dissolveGroup", currentGroupId);
      }

      function changeGroupUserStatus(groupId, item, oldUserStatus, userStatus) {
        $http.get($constant.baseURL + "/imChatGroupUser/changeUserStatus", {
          groupId: groupId,
          userId: item.userId,
          oldUserStatus: oldUserStatus,
          userStatus: userStatus
        })
          .then((res) => {
            item.userStatus = userStatus;
            ElMessage({
              message: "修改成功！",
              type: 'success'
            });
          })
          .catch((error) => {
            ElMessage({
              message: error.message,
              type: 'error'
            });
          });
      }

      function changeAvatar(type) {
        context.emit("changeAvatar", type);
      }

      return {
        ...toRefs(data),
        changeDataType,
        sendGroupMessage,
        groupSetting,
        updateInType,
        exitGroup,
        dissolveGroup,
        changeGroupUserStatus,
        changeAvatar
      }
    }
  }
</script>

<style scoped>

  .friend-label {
    color: var(--greyFont);
    margin-right: 30px;
  }

  .sendMsg .n-button {
    height: 35px;
    padding: 15px 25px;
  }

  .group-set {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }

  .group-set:first-child {
    font-size: 16px;
  }

  .user-tag {
    color: var(--white);
    border-radius: 3px;
    font-size: 12px;
    padding: 0 6px;
    margin: 0 6px;
    height: 22px;
    line-height: 22px;
    letter-spacing: 2px;
  }

  .group-user {
    display: flex;
    padding: 10px;
    height: 60px;
    justify-content: space-between;
    box-sizing: border-box;
  }

  .group-avatar {
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;
  }

  .group-avatar:hover {
    transform: rotate(360deg);
  }
</style>
