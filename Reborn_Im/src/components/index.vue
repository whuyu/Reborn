<template>
  <div class="friend-wrap">
    <div class="friend-box" v-if="!$common.isEmpty($store.state.currentUser)">
      <div class="friend-aside">
        <div>
          <!-- 头像 -->
          <div>
            <n-avatar lazy object-fit="cover" @click="changeAvatar(1)" class="user-thumb"
              :src="$store.state.currentUser.avatar" style="border-radius: 50%;"/>
          </div>
          <!-- 聊天 -->
          <div id="chat" class="friend-chat aside-active" @click="isActive($event, 'aside-active', 1)">
            <div>
              <svg t="1748317200411" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="1507" width="24" height="24">
                <path
                  d="M512 896H224a96.2 96.2 0 0 1-96-96V512a384 384 0 1 1 384 384z m0-704a320 320 0 0 0-320 320V800a32.1 32.1 0 0 0 32 32h288a320 320 0 0 0 0-640z"
                  fill="#333333" p-id="1508"></path>
                <path d="M320 384m32 0l192 0q32 0 32 32l0 0q0 32-32 32l-192 0q-32 0-32-32l0 0q0-32 32-32Z"
                  fill="#333333" p-id="1509"></path>
                <path d="M320 512m32 0l320 0q32 0 32 32l0 0q0 32-32 32l-320 0q-32 0-32-32l0 0q0-32 32-32Z"
                  fill="#333333" p-id="1510"></path>
                <path d="M320 640m32 0l320 0q32 0 32 32l0 0q0 32-32 32l-320 0q-32 0-32-32l0 0q0-32 32-32Z"
                  fill="#333333" p-id="1511"></path>
              </svg>
            </div>
            <div class="friend-text">聊天</div>
          </div>
          <!-- 好友 -->
          <div class="friend-chat" @click="isActive($event, 'aside-active', 2)">
            <div>
              <svg t="1748317281365" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2499" width="24" height="24">
                <path
                  d="M394 108.1c-130.9 0-237 106.1-237 237s106.1 237 237 237 237-106.1 237-237-106.1-237-237-237z m0 391.3c-85.2 0-154.3-69.1-154.3-154.3S308.8 190.8 394 190.8s154.3 69.1 154.3 154.3S479.2 499.4 394 499.4z"
                  fill="#242424" p-id="2500"></path>
                <path
                  d="M393.5 581c151.1 0 273.6 122.5 273.6 273.6H749c0-196.3-159.2-355.5-355.5-355.5S38 658.3 38 854.6h81.9c0-151.1 122.5-273.6 273.6-273.6z"
                  fill="#242424" p-id="2501"></path>
                <path d="M78.9 855.4m-40.9 0a40.9 40.9 0 1 0 81.8 0 40.9 40.9 0 1 0-81.8 0Z" fill="#242424" p-id="2502">
                </path>
                <path d="M708.1 855.4m-40.9 0a40.9 40.9 0 1 0 81.8 0 40.9 40.9 0 1 0-81.8 0Z" fill="#242424"
                  p-id="2503"></path>
                <path d="M663.4 541.2m-40.9 0a40.9 40.9 0 1 0 81.8 0 40.9 40.9 0 1 0-81.8 0Z" fill="#242424"
                  p-id="2504"></path>
                <path d="M643.1 149.2m-40.9 0a40.9 40.9 0 1 0 81.8 0 40.9 40.9 0 1 0-81.8 0Z" fill="#242424"
                  p-id="2505"></path>
                <path
                  d="M989 854.6c0-143.7-85.3-267.5-208-323.6 54.8-43.4 90-110.6 90-185.9 0-127.8-101.2-232-227.9-236.8v81.8c81 4.7 145.2 72.9 145.2 155 0 78.8-56.1 146.7-132.3 156.1-5.6 0.7-12.9 7.4-12.9 13v60.6c0-20 3.1-0.6 7.2-0.3l5 7c143.3 8.7 251.8 127.6 251.8 273.1h0.1v0.8c0 22.6 18.3 40.9 40.9 40.9S989 878 989 855.4v-0.8z"
                  fill="#242424" p-id="2506"></path>
              </svg>
            </div>
            <div class="friend-text">好友</div>
          </div>
          <!-- 群聊 -->
          <div class="friend-chat" @click="isActive($event, 'aside-active', 3)">
            <div>
              <svg t="1748324220543" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="5405" width="24" height="24">
                <path
                  d="M482.4 18.8C215.6 18.8 0 206.4 0 438c0 142 82.4 268.4 206.8 345.6v129.6c0 17.6 12.4 28 26.4 28 5.2 0 10.4-1.6 14-3.6l131.6-87.6c33.2 7.2 66.8 8.8 101.6 8.8 266.4 0 482.4-187.6 482.4-419.2 1.6-233.2-214-420.8-480.4-420.8z m0 770c-30 0-59.6-3.6-89.6-8.8l-14-3.6c-8.8-1.6-17.6 0-26.4 5.2l-12.4 8.8-63.2 42V764c0-12.4-7.2-24.4-17.6-30l-17.6-10.4c-108.8-64.8-173.6-172-173.6-284 0-192.8 184-348.8 412-348.8s412 156 412 348.8c2.4 191.2-183.6 349.2-409.6 349.2z m-273.6-338.4c0 32 26 58 58 58s58-26 58-58-26-58-58-58c-32.4 0-58 26-58 58z m219.2 0c0 32 26 58 58 58s58-26 58-58-26-58-58-58-58 26-58 58z m212 0c0 32 26 58 58 58s58-26 58-58-26-58-58-58-58 26-58 58z m332.4 90.4c-1.2-1.2-2-2.4-3.2-4-7.6 28.8-18.4 56.4-32 82.4 0.4 1.2 1.2 2.4 2 3.6 9.2 21.2 14 44 14 67.6 0 63.2-36.4 123.2-97.6 159.6l-10 6c-6 2.8-10 10-10 16.8v38.4l-35.6-23.6-6.8-4.8c-4.8-2.8-10-4-14.8-2.8l-8 2c-16.8 3.2-33.6 4.8-50.4 4.8-40 0-78-8.8-110.8-24.4-32.8 7.6-66.8 12.4-101.6 14 54.8 47.2 130.4 76.4 213.6 76.4 22 0 43.2-1.2 64-5.6l82.8 55.2c2 1.2 5.6 2 8.8 2 8.8 0 16.4-6.8 16.4-17.6v-81.6c78.4-48.4 130.4-128 130.4-217.2 0.4-54.4-18.8-105.2-51.2-147.2z"
                  fill="#333333" p-id="5406"></path>
              </svg>
            </div>
            <div class="friend-text">群聊</div>
          </div>
        </div>
        <div class="friend-set">
          <!-- 朋友圈 -->
          <div @click.stop="openFriendCircle($store.state.currentUser.id, $store.state.currentUser.avatar)"
            style="margin-bottom: 15px">
            <svg t="1748324278123" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="6486" width="24" height="24">
              <path
                d="M328.5 456.3s-25.7 63.6 3.1 138l137.9-137.8-141-0.2z m251.6-127.2s-63.6-26.4-137.8 2.6L580 470.3l0.1-141.2z m-154.9 17s-61.4 26.2-93.3 96.3H525l-99.8-96.3z m168.9-14v193.3l96.4-96.6c0-0.1-25.2-64.8-96.4-96.7zM512.5 112C291.3 112 112 291.3 112 512.5S291.3 913 512.5 913 913 733.7 913 512.5 733.7 112 512.5 112z m0 766.7c-202.2 0-366.2-163.9-366.2-366.2 0-202.2 163.9-366.2 366.2-366.2s366.2 163.9 366.2 366.2c0 202.2-164 366.2-366.2 366.2z m95.8-187.8s64.1-25.3 95.9-96.8h-193l97.1 96.8z m-152.2 16.6s63.6 26.3 137.8-2.6L456.2 566.7l-0.1 140.8z m-14.1-2.7V511.6l-96.4 99.3s26.2 62 96.4 93.9z m124.1-124.3l140.5 0.2s27.2-63.7-1.8-138L566.1 580.5z"
                fill="#050505" p-id="6487"></path>
            </svg>
          </div>

          <!-- 设置 -->
          <div @click.stop="changeAside()">
            <svg t="1748324336561" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="9153" width="24" height="24">
              <path
                d="M408.405333 60.68419l-4.096 0.121905c-33.718857 1.950476-58.416762 28.038095-58.416762 62.390857v78.823619l-3.34019 1.706667a236.422095 236.422095 0 0 0-13.068191 7.631238l-4.705523 2.998857-66.389334-41.496381c-30.45181-17.65181-69.168762-8.801524-84.699428 22.016L71.143619 374.247619l-1.048381 1.682286c-18.627048 31.646476-8.387048 69.12 23.600762 84.504381l2.876952 1.29219 62.70781 39.228953v21.699047l-62.780952 39.228953-2.852572 1.29219c-31.98781 15.36-42.179048 52.784762-23.673905 84.431238l0.975238 1.511619 103.66781 181.321143 1.29219 2.096762c19.968 30.012952 54.905905 36.985905 83.163429 22.747429l2.925714-1.657905 63.804953-39.887238 5.607619 3.072 14.482285 7.582476v75.873524c0 35.791238 26.770286 62.512762 62.512762 62.512762h207.189334l4.242285-0.121905c33.596952-2.023619 58.172952-27.91619 58.343619-62.19581l-0.024381-73.801143 3.364572-1.706666 4.266667-2.389334 8.825904-5.266285 4.656762-3.023238 66.462476 41.569523 4.120381 1.365334c31.061333 10.410667 66.218667-0.121905 80.530286-28.525715l104.472381-182.759619 1.121524-3.413333 1.29219-4.266667c7.753143-28.525714-1.706667-59.489524-26.063238-74.191238l-1.536-0.877714-64.975238-40.618667v-21.674666l62.732191-39.228953 2.925714-1.29219c31.98781-15.36 42.179048-52.784762 23.649524-84.406857l-1.170286-1.926096-103.375238-180.906666-1.26781-2.121143c-19.992381-30.012952-54.930286-36.985905-83.187809-22.723048l-2.925714 1.633524-63.829334 39.887238-5.583238-3.072-14.506667-7.606857V123.196952c0-35.791238-26.745905-62.512762-62.48838-62.512762h-207.238096z m196.608 73.142858v110.470095l30.890667 15.408762 17.115429 8.777143 9.99619 5.38819 5.607619 3.242667 5.071238 3.047619 4.656762 3.023238 19.651048 13.043809 92.964571-58.12419 93.671619 164.035048-93.086476 58.221714v102.741333l93.110857 58.172953-93.720381 164.059428-92.94019-58.099809-36.620191 24.502857c-12.434286 8.167619-21.528381 12.824381-28.525714 14.555428l-27.818667 6.875429-0.024381 116.467809h-185.977904v-110.396952l-36.449524-18.236952-14.140953-7.314286-7.631238-4.169143-6.582857-3.803428-5.778286-3.584-22.357333-14.82362-92.964571 58.09981-93.793524-164.035048 93.110857-58.197333v-102.716952l-93.037714-58.221715 91.550476-160.280381 95.134476 59.489524 36.620191-24.527238c10.898286-7.143619 19.21219-11.605333 25.795047-13.750857l2.730667-0.804571 27.794286-6.875429V133.851429h185.977904z"
                fill="#000000" p-id="9154"></path>
              <path
                d="M512 329.142857a36.571429 36.571429 0 0 1 0 73.142857 109.714286 109.714286 0 1 0 102.278095 69.87581l-2.657524-6.192762a36.571429 36.571429 0 0 1 66.389334-30.72A182.857143 182.857143 0 1 1 512 329.142857z"
                fill="#000000" p-id="9155"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="friend-bode" id="body-group">
        <div class="body-left" v-show="showBodyLeft">
          <!-- 搜索 -->
          <div>
            <n-input v-model:value="showFriendValue" round placeholder="Search" class="im-input">
              <template #prefix>
                <svg t="1748324783324" class="icon" viewBox="0 0 1821 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="12591" width="34" height="34">
                  <path
                    d="M1107.6 687.2l0.666667 0.666667c45.2-59.866667 72.133333-134.4 72.133333-215.2 0-197.2-159.866667-357.066667-357.066667-357.066667S466.133333 275.333333 466.133333 472.533333s159.866667 357.066667 357.066667 357.066667c80.8 0 155.2-26.8 215.066667-72l-0.533334-0.533333 69.866667-69.866667z m-284.4 43.6c-68.933333 0-133.866667-26.8-182.533333-75.6-48.8-48.8-75.6-113.6-75.6-182.533333s26.8-133.866667 75.6-182.533334 113.6-75.6 182.533333-75.6 133.866667 26.8 182.533333 75.6c48.8 48.8 75.6 113.6 75.6 182.533334s-26.8 133.866667-75.6 182.533333-113.6 75.6-182.533333 75.6z"
                    fill="#040000" p-id="12592"></path>
                  <path
                    d="M1108.133333 687.733333l-0.666666-0.666666-69.866667 69.866666 0.533333 0.533334 142 142c11.866667 11.866667 31.066667 11.866667 42.933334 0l27.066666-27.066667c11.866667-11.866667 11.866667-31.066667 0-42.933333L1108.133333 687.733333z"
                    fill="#040000" p-id="12593"></path>
                </svg>
              </template>
            </n-input>
          </div>
          <!-- 聊天 -->
          <div class="aside-list" v-show="type === 1">
            <!-- 系统消息 -->
            <div class="im-user im-active" @click="isActive($event, 'im-active', null, 1)">
              <div>
                <svg t="1748324883529" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="14422" width="25" height="25">
                  <path
                    d="M763.733333 349.866667c8.533333 0 17.066667-4.266667 25.6-8.533334l196.266667-115.2c12.8-8.533333 21.333333-17.066667 25.6-34.133333 4.266667-12.8 0-25.6-8.533333-34.133333-8.533333-17.066667-25.6-25.6-42.666667-25.6-8.533333 0-17.066667 4.266667-25.6 8.533333L738.133333 256c-12.8 8.533333-21.333333 17.066667-25.6 34.133333-4.266667 12.8 0 25.6 8.533334 34.133334 12.8 12.8 25.6 25.6 42.666666 25.6zM541.866667 72.533333c-17.066667 0-34.133333 4.266667-46.933334 12.8L311.466667 200.533333c-21.333333 17.066667-46.933333 21.333333-72.533334 21.333334H149.333333C68.266667 221.866667 0 285.866667 0 366.933333v268.8c0 89.6 72.533333 157.866667 157.866667 157.866667h106.666666c25.6 0 51.2 8.533333 72.533334 21.333333l157.866666 98.133334c12.8 8.533333 29.866667 12.8 46.933334 12.8 46.933333 0 89.6-38.4 89.6-89.6V162.133333c0-17.066667-4.266667-34.133333-12.8-46.933333-17.066667-25.6-46.933333-42.666667-76.8-42.666667z m-439.466667 298.666667c0-25.6 21.333333-46.933333 46.933333-46.933333h93.866667c46.933333 0 85.333333-12.8 128-34.133334l166.4-102.4v635.733334l-140.8-85.333334c-42.666667-25.6-81.066667-34.133333-123.733333-34.133333H162.133333c-34.133333 0-59.733333-25.6-59.733333-59.733333V371.2zM998.4 452.266667h-226.133333c-25.6 0-51.2 21.333333-51.2 51.2s21.333333 51.2 51.2 51.2h226.133333c25.6 0 51.2-21.333333 51.2-51.2s-25.6-51.2-51.2-51.2zM989.866667 772.266667l-196.266667-115.2c-8.533333-4.266667-17.066667-8.533333-25.6-8.533334-17.066667 0-34.133333 8.533333-42.666667 25.6-8.533333 12.8-8.533333 25.6-4.266666 38.4 4.266667 12.8 12.8 25.6 21.333333 29.866667l196.266667 115.2c8.533333 4.266667 17.066667 8.533333 25.6 8.533333 17.066667 0 34.133333-8.533333 42.666666-25.6 8.533333-12.8 8.533333-25.6 8.533334-34.133333-4.266667-12.8-12.8-25.6-25.6-34.133333z"
                    fill="#2c2c2c" p-id="14423"></path>
                </svg>
              </div>

              <div class="im-user-right">
                <div>系统消息</div>
              </div>
            </div>

            <div style="overflow-y: scroll;height: calc(100% - 70px)">
              <!-- 群聊天 -->
              <div class="im-user im-group-current" v-for="(item, index) in groupChats" :key="index"
                v-show="groups[item].groupName.includes(showFriendValue) || $common.isEmpty(showFriendValue)"
                @click="isActive($event, 'im-active', null, 2, item, 1)">
                <div>
                  <n-badge :value="groupMessageBadge[item]" :max="99">
                    <n-avatar object-fit="cover" lazy :size="40" :src="groups[item].avatar" style="border-radius: 50%;"/>
                  </n-badge>
                </div>
                <div class="im-user-right">
                  <div>{{ groups[item].groupName }}</div>
                  <div class="im-down" v-if="!$common.isEmpty(groupMessages[item])">
                    {{ groupMessages[item][groupMessages[item].length - 1].content.substr(0, 8) }}
                  </div>
                </div>
              </div>

              <!-- 聊天 -->
              <div class="im-user im-user-current" v-for="(item, index) in imChats" :key="index"
                v-show="friends[item].remark.includes(showFriendValue) || $common.isEmpty(showFriendValue)"
                @click="isActive($event, 'im-active', null, 2, item, 2)">
                <div>
                  <n-badge :value="imMessageBadge[item]" :max="99">
                      <n-avatar object-fit="cover" lazy :size="40" :src="friends[item].avatar" style="border-radius: 50%;"/>
                  </n-badge>
                </div>
                <div class="im-user-right">
                  <div>{{ friends[item].remark }}</div>
                  <div class="im-down" v-if="!$common.isEmpty(imMessages[item])">
                    {{ imMessages[item][imMessages[item].length - 1].content.substr(0, 8) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 好友 -->
          <div class="aside-list" v-show="type === 2">
            <!-- 添加好友 -->
            <div class="im-user friend-active" @click="isActive($event, 'friend-active', null, 3)">
              <div style="display: flex;align-items: center;justify-content: center;">
                <svg t="1748324973149" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="15431" width="25" height="25">
                  <path
                    d="M629.333333 160c129.6 0 234.666667 105.066667 234.666667 234.666667 0 97.28-59.221333 180.778667-143.573333 216.32 19.157333 5.888 37.674667 13.632 55.296 23.104a64.042667 64.042667 0 0 0-39.594667 55.04l-0.128 4.202666v42.666667h-42.666667l-3.754666 0.106667a64 64 0 0 0-60.138667 60.138666l-0.106667 3.754667 0.106667 3.754667a64 64 0 0 0 60.138667 60.138666l3.754666 0.106667h42.666667v42.666667l0.106667 3.754666c0.597333 10.24 3.605333 19.861333 8.469333 28.266667L352 938.666667a32 32 0 0 1-32-32c0-139.136 91.861333-256.810667 218.24-295.701334A234.666667 234.666667 0 0 1 394.666667 394.666667c0-129.6 105.066667-234.666667 234.666666-234.666667z m170.666667 501.333333a32 32 0 0 1 31.850667 28.928L832 693.333333V768h74.666667a32 32 0 0 1 31.850666 28.928L938.666667 800a32 32 0 0 1-28.928 31.850667L906.666667 832H832v74.666667a32 32 0 0 1-28.928 31.850666L800 938.666667a32 32 0 0 1-31.850667-28.928L768 906.666667V832h-74.666667a32 32 0 0 1-31.850666-28.928L661.333333 800a32 32 0 0 1 28.928-31.850667L693.333333 768H768v-74.666667a32 32 0 0 1 25.92-31.424l2.986667-0.426666L800 661.333333z m-448-576.661333c50.496 0 96.704 18.410667 132.266667 48.874667a298.538667 298.538667 0 0 0-153.6 261.12c0 90.218667 40 171.093333 103.253333 225.834666a375.253333 375.253333 0 0 0-121.770667 121.152H117.333333A27.008 27.008 0 0 1 90.325333 714.666667c0-112.256 70.677333-208 169.962667-245.141334A203.328 203.328 0 0 1 352 84.672z"
                    fill="#000000" p-id="15432"></path></svg>
              </div>

              <div class="im-friend">
                好友请求
              </div>
            </div>

            <div style="margin: 0 30px 0 30px">
              <n-divider dashed>
                {{ Object.keys(friends).length }}位联系人
              </n-divider>
            </div>

            <!-- 好友列表 -->
            <div style="overflow-y: scroll;height: calc(100% - 140px)">
              <div class="im-user" v-for="(item, index) in Object.values(friends).reverse()" :key="index"
                v-show="item.remark.includes(showFriendValue) || $common.isEmpty(showFriendValue)"
                @click="isActive($event, 'friend-active', null, 4, item)">
                <div>
                  <n-avatar object-fit="cover" lazy style="cursor: pointer;border-radius: 50%;"
                    @click.stop="openFriendCircle(item.friendId, item.avatar)" :size="40" :src="item.avatar"/>
                </div>
                <div class="im-friend">
                  {{ item.remark }}
                </div>
              </div>
            </div>
          </div>
          <!-- 群聊 -->
          <div class="aside-list" v-show="type === 3">
            <div style="margin: 0 30px 0 30px">
              <n-divider dashed>
                {{ Object.keys(groups).length }}个群聊
              </n-divider>
            </div>

            <div class="im-user-group" v-for="(item, index) in Object.values(groups).reverse()" :key="index"
              v-show="item.groupName.includes(showFriendValue) || $common.isEmpty(showFriendValue)"
              @click="isActive($event, 'im-group', null, 5, item)">
              <div>
                <n-avatar object-fit="cover" :size="45" lazy :src="item.avatar" style="border-radius: 50%;"/>
              </div>
              <div class="im-user-right">
                <div>{{ item.groupName }}</div>
                <div class="im-down">
                  <span class="group-tag" v-if="item.masterFlag || item.adminFlag">
                    <template v-if="item.masterFlag">
                      群主
                    </template>
                    <template v-else-if="item.adminFlag">
                      管理员
                    </template>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="body-right" v-if="subType === 1">
          <!-- <div class="body-right" v-if="true"> -->
          <div style="height: 60px;background-color: var(--maxWhite)">
            <span style="line-height: 60px;margin-left: 20px;font-size: 18px">系统消息</span>
          </div>
          <div style="background: var(--midWhite);overflow-y: scroll;height: calc(100% - 60px);">
            <div class="msg-one" v-for="(item, index) in systemMessages" :key="index">
              <!-- 图标 -->
              <div>
                <svg viewBox="0 0 1024 1024" width="50" height="50">
                  <path
                    d="M752.768 955.392H257.92c-112.384 0-203.392-91.008-203.392-203.392V257.152C54.528 144.768 145.536 53.76 257.92 53.76h494.848C865.152 53.76 956.16 144.768 956.16 257.152v494.848c0 112.384-91.008 203.392-203.392 203.392z"
                    fill="#FF4D3C"></path>
                  <path
                    d="M616.576 765.952H370.56c-67.968 0-123.008-55.04-123.008-123.008V396.8c0-67.968 55.04-123.008 123.008-123.008h166.272c9.984 0 18.176 8.064 18.176 18.176 0 9.984-8.064 18.176-18.176 18.176H370.56c-47.872 0-86.656 38.784-86.656 86.656v246.016c0 47.872 38.784 86.656 86.656 86.656h246.016c47.872 0 86.656-38.784 86.656-86.656V469.12c0-9.984 8.064-18.176 18.176-18.176 9.984 0 18.176 8.064 18.176 18.176v173.824c0 67.968-55.04 123.008-123.008 123.008z"
                    fill="#FFFFFF"></path>
                  <path d="M694.784 312.704m-113.408 0a113.408 113.408 0 1 0 226.816 0 113.408 113.408 0 1 0-226.816 0Z"
                    fill="#FFFFFF"></path>
                </svg>
              </div>

              <!-- 内容 -->
              <div style="margin-left: 10px">
                <div class="system-date">
                  {{ item.createTime }}
                </div>
                <div class="system-content">
                  {{ item.content }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 聊天 -->
        <chat class="body-right"
          v-if="subType === 2 && (!$common.isEmpty(currentChatFriendId) || !$common.isEmpty(currentChatGroupId))"
          :currentChatFriendId="currentChatFriendId" :currentChatGroupId="currentChatGroupId" :friends="friends"
          :groups="groups" :imageList="imageList" :imMessages="imMessages" :groupMessages="groupMessages"
          @sendMsg="sendMsg" @openFriendCircle="openFriendCircle" @startCall="handleStartCall"></chat>

        <div class="body-right" v-if="subType === 3">
          <div style="height: 60px;background-color: var(--maxWhite)">
            <span style="line-height: 60px;margin-left: 20px;font-size: 18px">
              好友请求
            </span>
          </div>
          <div class="friend-request">
            <div style="margin: 20px;display: flex" v-for="(item, index) in friendRequests" :key="index">
              <!-- 图标 -->
              <div>
                <n-avatar object-fit="cover" :size="50" lazy :src="item.avatar" style="border-radius: 50%;"/>
              </div>

              <!-- 内容 -->
              <div style="display: flex;flex: 1">
                <div style="margin-left: 10px">
                  <div style="font-size: 16px;margin-bottom: 4px">
                    {{ item.username }}
                  </div>
                  <div style="font-size: 12px;color: var(--greyFont)">
                    {{ item.remark }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ item.createTime }}
                  </div>
                </div>
                <div class="request-status">
                  <n-button @click="changeFriendStatus(item.friendId, 1, index)" size="small" type="primary"
                    style="margin-right: 10px">
                    通过
                  </n-button>
                  <n-button @click="changeFriendStatus(item.friendId, -1, index)" size="small" type="error">
                    拒绝
                  </n-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="body-right" v-if="subType === 4 && !$common.isEmpty(currentFriendId)">
          <div style="height: 60px;background-color: var(--maxWhite)">
            <span style="line-height: 60px;margin-left: 20px;font-size: 18px">
              {{ friends[currentFriendId].remark }}
            </span>
          </div>
          <div style="background: var(--midWhite);height: calc(100% - 60px)">
            <div class="myCenter">
              <div class="friend-info">
                <div style="display: flex;align-items: center">
                  <n-avatar object-fit="cover" :size="60" lazy :src="friends[currentFriendId].avatar" style="border-radius: 50%;"/>

                  <span style="margin: 0 5px 0 15px;font-size: 16px">{{ friends[currentFriendId].remark }}</span>
                  <span style="cursor: pointer;margin-top: 6px" @click="changeDataType(1)">
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

                <div style="margin-top: 4px;cursor: pointer" @click="removeFriend(currentFriendId)">
                  <span style="vertical-align: -4px;margin-right: 2px">
                    <svg viewBox="0 0 1024 1024" width="20" height="20">
                      <path
                        d="M920 242.82H768v-75.45C768 128 736.66 96 698 96H326c-38.66 0-70 32-70 71.37v75.45H104c-22.09 0-40 18.26-40 40.79 0 22.52 17.91 40.78 40 40.78h88v532.24c0 39.42 31.34 71.37 70 71.37h500c38.66 0 70-32 70-71.37V324.39h88c22.09 0 40-18.26 40-40.78 0-22.53-17.91-40.79-40-40.79z m-584-24.47c0-22.52 17.91-40.78 40-40.78h272c22.09 0 40 18.26 40 40.78v24.47H336z m416 587.3c0 22.52-17.91 40.78-40 40.78H312c-22.09 0-40-18.26-40-40.78V324.39h480z"
                        fill="#999999"></path>
                      <path
                        d="M360 424a40 40 0 0 0-40 40v240a40 40 0 0 0 80 0V464a40 40 0 0 0-40-40zM512 424a40 40 0 0 0-40 40v240a40 40 0 0 0 80 0V464a40 40 0 0 0-40-40zM624 464v240a40 40 0 0 0 80 0V464a40 40 0 0 0-80 0z"
                        fill="#999999"></path>
                    </svg>
                  </span>
                  <span style="color: var(--greyFont)">删除好友</span>
                </div>
              </div>
            </div>

            <n-divider />

            <div class="myCenter">
              <div style="width: 65%;font-size: 16px">
                <div style="margin-bottom: 10px">
                  <span class="friend-label">用户名</span>
                  <span>{{ friends[currentFriendId].username }}</span>
                </div>
                <div style="margin-bottom: 10px">
                  <span class="friend-label">
                    性&nbsp;&nbsp;&nbsp;别
                  </span>
                  <span>
                    <template v-if="friends[currentFriendId].gender === 1">
                      男
                    </template>
                    <template v-else-if="friends[currentFriendId].gender === 2">
                      女
                    </template>
                    <template v-else>
                      薛定谔的猫
                    </template>
                  </span>
                </div>
                <div>
                  <span class="friend-label">简&nbsp;&nbsp;&nbsp;介</span>
                  <span>{{ $common.isEmpty(friends[currentFriendId].introduction) ? '暂无简介' :
                    friends[currentFriendId].introduction }}</span>
                </div>
              </div>
            </div>

            <n-divider />

            <div class="myCenter sendMsg">
              <n-button @click="sendFriendMessage()" style="border-radius: 30px;">
                发消息
                <svg t="1748407855813" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23441" width="24" height="24"><path d="M742.894933 200.7168L154.436267 299.3536a8.533333 8.533333 0 0 0-5.077334 13.960533L222.357333 398.72a17.066667 17.066667 0 0 0 19.1232 4.834133l503.658667-194.645333a4.266667 4.266667 0 0 0-2.24-8.192z m-110.024533 626.274133l240.042667-593.019733a8.533333 8.533333 0 0 0-11.191467-11.076267L302.762667 455.970133a12.8 12.8 0 0 0-4.5568 20.416l320.439466 353.1392a8.533333 8.533333 0 0 0 14.229334-2.5344z m-353.083733-3.861333c-14.677333 8.234667-33.211733 4.928-36.3008 4.548267-23.432533-2.875733-37.482667-24.2432-34.602667-47.68L192 470.634667l-86.724267-103.68c-31.965867-33.8688-30.318933-87.069867 3.677867-118.830934a84.561067 84.561067 0 0 1 47.4496-22.1184l691.464533-94.293333c46.3104-5.674667 88.520533 27.080533 94.280534 73.1648 1.9712 15.786667-0.597333 31.803733-7.406934 46.186667L700.599467 852.181333c-19.882667 41.984-70.225067 59.9296-112.443734 40.093867a84.625067 84.625067 0 0 1-25.553066-18.500267L409.079467 704.768c-0.849067 0.597333-43.946667 40.0512-129.2928 118.365867z m-21.3504-271.253333l10.2528 177.685333a8.533333 8.533333 0 0 0 14.528 5.568l71.057066-70.5152a17.066667 17.066667 0 0 0 0.9472-23.210667L273.442133 545.834667a8.533333 8.533333 0 0 0-15.005866 6.0416z" fill="#333333" p-id="23442"></path></svg>
              </n-button>
            </div>
          </div>
        </div>

        <!-- 群 -->
        <groupInfo class="body-right" v-if="subType === 5 && !$common.isEmpty(currentGroupId)" :groups="groups"
          :currentGroupId="currentGroupId" @exitGroup="exitGroup" @dissolveGroup="dissolveGroup"
          @changeDataType="changeDataType" @sendGroupMessage="sendGroupMessage" @changeAvatar="changeAvatar">
        </groupInfo>

        <!-- 头像修改弹出框 -->
        <n-modal v-model:show="showAvatarDialog">
          <div style="padding: 40px;background: var(--white);border-radius: 5px;width: 20%">
            <div style="margin: 0 0 25px;text-align: center;font-size: 18px">上传图片</div>
            <uploadPicture :prefix="avatarPrefix" @addPicture="submitAvatar" :maxSize="1" :maxNumber="1">
            </uploadPicture>
          </div>
        </n-modal>

        <!-- 修改信息 -->
        <n-modal :auto-focus="false" v-model:show="changeModal">
          <div style="background-color: var(--white);padding: 20px;border-radius: 5px">
            <div style="text-align: center;font-size: 20px;padding: 20px">
              修改信息
            </div>
            <div>
              <n-input v-model:value="changeData" maxlength="30" show-count clearable />
            </div>
            <div class="myCenter" style="margin-top: 30px">
              <n-button @click="submitChange()" type="info">
                提交
              </n-button>
            </div>
          </div>
        </n-modal>

        <!-- 朋友圈 -->
        <n-modal class="friend-model" v-model:show="showFriendCircle" :mask-closable="false">
          <div style="background-color: var(--background);border-radius: 10px">
            <div class="treeHole-wrap">
              <treeHole :avatar="weiYanAvatar" :treeHoleList="treeHoleList" @launch="launch"
                @deleteTreeHole="deleteTreeHole"></treeHole>
            </div>
            <div class="pagination-wrap">
              <proButton :info="'关闭'" @click="cleanFriendCircle()" :before="$constant.before_color_1"
                :after="$constant.after_color_1">
              </proButton>
              <proButton :info="'下一页'" style="margin-left: 20px" @click="pageWeiYan()"
                v-if="pagination.total !== treeHoleList.length" :before="$constant.after_color_1"
                :after="$constant.tree_hole_color[1]">
              </proButton>
              <proButton :info="'随笔'" style="margin-left: 20px" v-if="$store.state.currentUser.id === pagination.userId"
                @click="launch()" :before="$constant.before_color_2" :after="$constant.after_color_2">
              </proButton>
              <proButton :info="'加好友'" style="margin-left: 20px" v-else-if="$common.isEmpty(friends[pagination.userId])"
                @click="addFriend()" :before="$constant.before_color_2" :after="$constant.after_color_2">
              </proButton>
            </div>
          </div>
        </n-modal>

        <!-- 发朋友动态 -->
        <n-modal v-model:show="weiYanDialogVisible" :mask-closable="false" preset="dialog">
          <div class="weiyan-edit">
            <div class="myCenter" style="padding-bottom: 20px">
              <el-radio-group v-model="isPublic">
                <el-radio-button :label="true">公开</el-radio-button>
                <el-radio-button :label="false">私密</el-radio-button>
              </el-radio-group>
            </div>
            <commentBox @submitComment="submitWeiYan"></commentBox>
          </div>
        </n-modal>

        <!-- 绑定邮箱 -->
        <n-modal v-model:show="emailVisible">
          <div class="email-wrap">
            <div class="email-title">请绑定邮箱，接收留言通知</div>
            <div>
              <div style="margin-bottom: 5px">邮箱：</div>
              <n-input v-model:value="email"></n-input>
              <div style="margin-top: 10px;margin-bottom: 5px">验证码：</div>
              <n-input v-model:value="code"></n-input>
              <div style="margin-top: 10px;margin-bottom: 5px">密码：</div>
              <n-input v-model:value="password" type="password" show-password-on="mousedown"></n-input>
            </div>
            <div class="myCenter" style="margin-top: 30px">
              <proButton :info="codeString" @click="getCode()" :before="$constant.before_color_1"
                :after="$constant.after_color_1" style="margin-right: 20px">
              </proButton>
              <proButton :info="'提交'" @click="submitDialog()" :before="$constant.before_color_2"
                :after="$constant.after_color_2">
              </proButton>
            </div>
          </div>
        </n-modal>
      </div>
    </div>

    <div id="outerImg">
      <div id="innerImg" style="position:absolute">
        <img id="bigImg" src="" />
      </div>
    </div>

    <!-- 音视频通话组件 -->
    <video-call
      v-if="showVideoCall"
      :key="currentCallTargetId"
      :call-type="callType"
      :is-caller="isCaller"
      :target-id="currentCallTargetId"
      v-model:show-call-modal="showVideoCall"
      :is-accepted="isAccepted"
      @reject-call="handleCallReject"
      @cancel-call="handleCallCancel"
      @send-msg="sendMsg"

    />
  </div>
</template>

<script>
import Im from '../utils/im'
import { useStore } from 'vuex'

import { useDialog } from 'naive-ui'

import { nextTick, reactive, getCurrentInstance, onMounted, onBeforeUnmount, watchEffect, toRefs, ref } from 'vue'

import { ElMessage } from 'element-plus'

import bindEmail from '../hooks/bindEmail'
import friendCircle from '../hooks/friendCircle'
import friend from '../hooks/friend'
import group from '../hooks/group'
import imUtil from '../hooks/imUtil'
import changeData from '../hooks/changeData'

import proButton from './common/proButton'
import treeHole from './common/treeHole'
import commentBox from './common/commentBox'
import uploadPicture from './common/uploadPicture'
import chat from './common/chat'
import groupInfo from './common/groupInfo'
import videoCall from './common/videoCall'

export default {
  components: {
    proButton,
    treeHole,
    commentBox,
    uploadPicture,
    chat,
    groupInfo,
    videoCall
  },
  setup (props, context) {
    const globalProperties = getCurrentInstance().appContext.config.globalProperties
    const $common = globalProperties.$common
    const $http = globalProperties.$http
    const $constant = globalProperties.$constant
    const store = useStore()
    const dialog = useDialog()

    const { bindEmailData, getCode, submitDialog } = bindEmail()
    const { friendCircleData, launch, openFriendCircle, deleteTreeHole, submitWeiYan, pageWeiYan, cleanFriendCircle, addFriend } = friendCircle()
    const { friendData, getImFriend, removeFriend, getFriendRequests, changeFriendStatus } = friend()
    const { groupData, getImGroup, addGroupTopic, exitGroup, dissolveGroup } = group()
    const { imUtilData, changeAside, mobileRight, getSystemMessages, hiddenBodyLeft, imgShow, getImageList, parseMessage } = imUtil()
    const { changeDataData, changeAvatar, changeDataType, submitAvatar, submitChange } = changeData(friendData, groupData)

    const data = reactive({
      // 消息列表
      imMessages: {},
      // 消息标记
      imMessageBadge: {},
      // 聊天列表
      imChats: [],
      // 当前聊天信息
      currentChatFriendId: null,

      // 群消息列表
      groupMessages: {},
      // 群消息标记
      groupMessageBadge: {},
      // 群聊天列表
      groupChats: [],
      // 当前群聊天信息
      currentChatGroupId: null,

      type: 1,
      subType: 1,
      showFriendValue: ''
    })

    let im

    const showVideoCall = ref(false)
    const isAccepted = ref(false)
    const callType = ref('')
    const isCaller = ref(false)
    const currentCallTargetId = ref('')

    if (!$common.isEmpty(store.state.currentUser)) {
      getImageList()
      getSystemMessages()
      getFriendRequests()
      getFriendAndGroup()
      getSysConfig()
    }

    async function getFriendAndGroup () {
      await getImFriend()
      await getImGroup()
      await nextTick()
      getIm()
    }

    function getSysConfig () {
      $http.get($constant.baseURL + '/sysConfig/listSysConfig')
        .then((res) => {
          if (!$common.isEmpty(res.data)) {
            store.commit('loadSysConfig', res.data)
            buildCssPicture()
          }
        })
        .catch((error) => {
          this.$message({
            message: error.message,
            type: 'error'
          })
        })
    }

    function buildCssPicture () {
      const root = document.querySelector(':root')
      const webStaticResourcePrefix = store.state.sysConfig.webStaticResourcePrefix
      root.style.setProperty('--commentURL', 'url(' + webStaticResourcePrefix + 'assets/commentURL.jpg)')
      root.style.setProperty('--imBackground', 'url(' + webStaticResourcePrefix + 'assets/backgroundPicture.jpg)')
      const font = new FontFace('reborn-font', 'url(' + webStaticResourcePrefix + 'assets/font.woff2)')
      font.load()
      document.fonts.add(font)
    }

    function getIm () {
      im = new Im()
      im.initWs()
      im.tio.ws.onmessage = function (event) {
        const message = JSON.parse(event.data)
        message.content = parseMessage(message.content)

        // 处理音视频通话消息
        if (message.messageType >= 3 && message.messageType <= 8) {
          console.log('[音视频通话] 收到通话消息:', message)
          switch (message.messageType) {
            case 3: // 视频通话请求
            case 4: // 语音通话请求
              console.log('[音视频通话] 收到通话请求')
              try {
                const offer = JSON.parse(message.content)
                if (offer.type === 'offer') {
                  showVideoCall.value = true
                  callType.value = message.messageType === 3 ? 'video' : 'audio'
                  isCaller.value = false
                  currentCallTargetId.value = message.fromId
                  // 保存 offer 供 acceptCall 使用
                  window.pendingOffer = new RTCSessionDescription({
                    type: 'offer',
                    sdp: offer.sdp
                  })
                }
              } catch (error) {
                console.error('[音视频通话] 解析 offer 失败:', error)
              }
              break
            case 5: // 接受通话

              console.log('[音视频通话] 对方接受通话')
              try {
                isAccepted.value=true
                const answer = JSON.parse(message.content)
                if (answer.type === 'answer') {
                  const peerConnection = window.currentPeerConnection
                  if (peerConnection && peerConnection.signalingState !== 'closed') {
                  // 创建正确的 RTCSessionDescription 对象
                    const sessionDescription = new RTCSessionDescription({
                      type: 'answer',
                      sdp: answer.sdp
                    })
                    peerConnection.setRemoteDescription(sessionDescription)
                      .catch(error => {
                        console.error('[音视频通话] 设置远程描述失败:', error)
                      })
                  }
                }
              } catch (error) {
                console.error('[音视频通话] 解析 answer 失败:', error)
              }
              break
            case 6: // 拒绝通话
              console.log('[音视频通话] 对方拒绝通话')
              showVideoCall.value = false
              isAccepted.value=false
              break
            case 7: // 取消通话
              console.log('[音视频通话] 对方取消通话')
              showVideoCall.value = false
              isAccepted.value=false
              break
            case 8: // ICE 候选
              try {
                const iceData = JSON.parse(message.content)
                if (iceData.type === 'candidate') {
                  const peerConnection = window.currentPeerConnection
                  if (peerConnection && peerConnection.remoteDescription) {
                    peerConnection.addIceCandidate(new RTCIceCandidate(iceData.candidate))
                      .catch(error => {
                        console.error('[音视频通话] 添加 ICE candidate 失败:', error)
                      })
                  } else {
                    // 如果远程描述还未设置,将 ICE candidate 保存起来
                    if (!window.pendingIceCandidates) {
                      window.pendingIceCandidates = []
                    }
                    window.pendingIceCandidates.push(iceData.candidate)
                  }
                }
              } catch (error) {
                console.error('[音视频通话] 解析 ICE candidate 失败:', error)
              }
              break
          }
          return
        }

        if (message.messageType === 1) {
          if (message.fromId === store.state.currentUser.id && (friendData.friends[message.toId] !== null && friendData.friends[message.toId] !== undefined)) {
            if (data.imMessages[message.toId] === null || data.imMessages[message.toId] === undefined) {
              data.imMessages[message.toId] = []
            }
            data.imMessages[message.toId].push(message)

            for (let i = 0; i < data.imChats.length; i++) {
              if (data.imChats[i] === message.toId) {
                data.imChats.splice(i, 1)
                break
              }
            }
            data.imChats.splice(0, 0, message.toId)
            isActive(document.getElementsByClassName('im-user-current')[0], 'im-active', null, 2, message.toId, 2)
          } else if (message.fromId !== store.state.currentUser.id && (friendData.friends[message.fromId] !== null && friendData.friends[message.fromId] !== undefined)) {
            if (data.imMessages[message.fromId] === null || data.imMessages[message.fromId] === undefined) {
              for (let i = 0; i < data.imChats.length; i++) {
                if (data.imChats[i] === message.fromId) {
                  data.imChats.splice(i, 1)
                  break
                }
              }
              data.imChats.splice(0, 0, message.fromId)

              data.imMessages[message.fromId] = []
            }
            data.imMessages[message.fromId].push(message)

            if (data.subType !== 2 || data.currentChatFriendId !== message.fromId) {
              if (data.imMessageBadge[message.fromId] === null || data.imMessageBadge[message.fromId] === undefined) {
                data.imMessageBadge[message.fromId] = 1
              } else {
                data.imMessageBadge[message.fromId] = data.imMessageBadge[message.fromId] + 1
              }
            }
          }

          nextTick(() => {
            const msgContainer = document.getElementsByClassName('msg-container')
            if (msgContainer && msgContainer.length > 0) {
              msgContainer[0].scrollTop = msgContainer[0].scrollHeight
            }
            imgShow()
          })
        } else if (message.messageType === 2 && (groupData.groups[message.groupId] !== null && groupData.groups[message.groupId] !== undefined)) {
          if (data.groupMessages[message.groupId] === null || data.groupMessages[message.groupId] === undefined) {
            data.groupMessages[message.groupId] = []
          }
          data.groupMessages[message.groupId].push(message)

          if (message.fromId === store.state.currentUser.id || data.groupMessages[message.groupId] === null || data.groupMessages[message.groupId] === undefined) {
            for (let i = 0; i < data.groupChats.length; i++) {
              if (data.groupChats[i] === message.groupId) {
                data.groupChats.splice(i, 1)
                break
              }
            }
            data.groupChats.splice(0, 0, message.groupId)
            isActive(document.getElementsByClassName('im-group-current')[0], 'im-active', null, 2, message.groupId, 1)
          }

          if ((data.subType !== 2 || data.currentChatGroupId !== message.groupId) && message.fromId !== store.state.currentUser.id) {
            if (data.groupMessageBadge[message.groupId] === null || data.groupMessageBadge[message.groupId] === undefined) {
              data.groupMessageBadge[message.groupId] = 1
            } else {
              data.groupMessageBadge[message.groupId] = data.groupMessageBadge[message.groupId] + 1
            }
          }

          nextTick(() => {
            const msgContainer = document.getElementsByClassName('msg-container')
            if (msgContainer && msgContainer.length > 0) {
              msgContainer[0].scrollTop = msgContainer[0].scrollHeight
            }
            imgShow()
          })
        }
      }
    }

    function sendMsg (msg, callback) {
      try {
        console.log('[WebSocket] 准备发送消息:', msg)
        if (!im || !im.tio || !im.tio.ws) {
          console.error('[WebSocket] 发送失败: WebSocket 未连接')
          if (callback) callback(false)
          return false
        }

        const success = im.sendMsg(msg)
        console.log('[WebSocket] 消息发送结果:', success)
        if (callback) callback(success)
        return success
      } catch (error) {
        console.error('[WebSocket] 发送消息时发生错误:', error)
        if (callback) callback(false)
        return false
      }
    }

    function isActive (e, className, type, subType, current, imType) {
      if (!$common.isEmpty(type)) {
        data.type = type
        const actives = ['im-active', 'friend-active', 'im-group']
        for (const activeClass of actives) {
          for (const tab of document.getElementsByClassName(activeClass)) {
            tab.classList.remove(activeClass)
          }
        }
      }

      if (!$common.isEmpty(subType)) {
        data.subType = subType
        if (subType === 4 && !$common.isEmpty(current)) {
          friendData.currentFriendId = current.friendId
        }
        if (subType === 5 && !$common.isEmpty(current)) {
          groupData.currentGroupId = current.id
        }

        if (subType === 2 && !$common.isEmpty(current) && !$common.isEmpty(imType)) {
          if (imType === 1) {
            data.currentChatFriendId = null
            data.currentChatGroupId = current
            data.groupMessageBadge[current] = 0
          } else if (imType === 2) {
            data.currentChatGroupId = null
            data.currentChatFriendId = current
            data.imMessageBadge[current] = 0
          }
        }

        nextTick(() => {
          const msgContainer = document.getElementsByClassName('msg-container')
          if (msgContainer && msgContainer.length > 0) {
            msgContainer[0].scrollTop = msgContainer[0].scrollHeight
          }
          imgShow()
          mobileRight()
          hiddenBodyLeft()
        })
      }

      for (const tab of document.getElementsByClassName(className)) {
        tab.classList.remove(className)
      }

      if (e instanceof HTMLElement) {
        e.classList.add(className)
      } else {
        const node = e.currentTarget
        node.classList.add(className)
      }
    }

    async function sendFriendMessage () {
      for (let i = 0; i < data.imChats.length; i++) {
        if (data.imChats[i] === friendData.currentFriendId) {
          data.imChats.splice(i, 1)
          break
        }
      }
      data.imChats.splice(0, 0, friendData.currentFriendId)
      await nextTick()
      isActive(document.getElementById('chat'), 'aside-active', 1)
      isActive(document.getElementsByClassName('im-user-current')[0], 'im-active', null, 2, friendData.currentFriendId, 2)
      getMessages(friendData.currentFriendId)
    }

    async function sendGroupMessage () {
      for (let i = 0; i < data.groupChats.length; i++) {
        if (data.groupChats[i] === groupData.currentGroupId) {
          data.groupChats.splice(i, 1)
          break
        }
      }
      data.groupChats.splice(0, 0, groupData.currentGroupId)
      await nextTick()
      isActive(document.getElementById('chat'), 'aside-active', 1)
      isActive(document.getElementsByClassName('im-group-current')[0], 'im-active', null, 2, groupData.currentGroupId, 1)
      getGroupMessages(groupData.currentGroupId)
      if (groupData.groups[groupData.currentGroupId].groupType === 2) {
        addGroupTopic()
      }
    }

    function getMessages (friendId, current = 1, size = 100) {
      if (!data.imMessages.hasOwnProperty(friendId)) {
        $http.get($constant.baseURL + '/imChatUserMessage/listFriendMessage', {
          friendId: friendId,
          current: current,
          size: size
        })
          .then((res) => {
            if (!$common.isEmpty(res.data) && !$common.isEmpty(res.data.records)) {
              res.data.records.forEach(message => {
                message.content = parseMessage(message.content)
              })
              data.imMessages[friendId] = res.data.records
            } else {
              data.imMessages[friendId] = []
            }
            nextTick(() => {
              const msgContainer = document.getElementsByClassName('msg-container')
              if (msgContainer && msgContainer.length > 0) {
                msgContainer[0].scrollTop = msgContainer[0].scrollHeight
              }
              imgShow()
            })
          })
          .catch((error) => {
            ElMessage({
              message: error.message,
              type: 'error'
            })
          })
      }
    }

    function getGroupMessages (groupId, current = 1, size = 100) {
      if (!data.groupMessages.hasOwnProperty(groupId)) {
        $http.get($constant.baseURL + '/imChatUserGroupMessage/listGroupMessage', {
          groupId: groupId,
          current: current,
          size: size
        })
          .then((res) => {
            if (!$common.isEmpty(res.data) && !$common.isEmpty(res.data.records)) {
              res.data.records.forEach(message => {
                message.content = parseMessage(message.content)
              })
              data.groupMessages[groupId] = res.data.records
            } else {
              data.groupMessages[groupId] = []
            }
            nextTick(() => {
              const msgContainer = document.getElementsByClassName('msg-container')
              if (msgContainer && msgContainer.length > 0) {
                msgContainer[0].scrollTop = msgContainer[0].scrollHeight
              }
              imgShow()
            })
          })
          .catch((error) => {
            ElMessage({
              message: error.message,
              type: 'error'
            })
          })
      }
    }

    function handleCallOffer (data) {
      const message = {
        messageType: 3,
        content: JSON.stringify({
          type: data.type,
          offer: data.offer
        }),
        fromId: store.state.currentUser.id,
        toId: data.targetId,
        avatar: store.state.currentUser.avatar
      }
      im.sendMsg(JSON.stringify(message))
    }

    function handleCallAnswer (data) {
      const message = {
        messageType: 4,
        content: JSON.stringify({
          answer: data.answer
        }),
        fromId: store.state.currentUser.id,
        toId: data.targetId,
        avatar: store.state.currentUser.avatar
      }
      im.sendMsg(JSON.stringify(message))
    }

    function handleCallReject (targetId) {
      // console.log('[音视频通话] 发送拒绝通话消息')
      // im.sendMsg(JSON.stringify(message))
      showVideoCall.value = false
      isAccepted.value=false
    }

    function handleCallCancel (targetId) {
      showVideoCall.value = false
      isAccepted.value=false
    }

    // 处理接收到的 ICE 候选 2025-05-07
    const handleIceCandidate = async (candidate) => {
      try {
        const peerConnection = window.currentPeerConnection
        if (peerConnection) {
          await peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
        }
      } catch (error) {
        console.error('[音视频通话] 处理 ICE 候选失败:', error)
      }
    }

    function handleStartCall (params) {
       showVideoCall.value = true
      //showVideoCall.value = !showVideoCall.value
      callType.value = params.type
      isCaller.value = params.isCaller
      currentCallTargetId.value = params.targetId
    }

    // 修改 WebSocket 消息监听器
    onMounted(() => {
      console.log('[WebSocket] 添加消息监听器')
      window.addEventListener('imMessage', (event) => {
        if (event && event.detail) {
          getIm(event.detail)
        } else {
          console.error('[WebSocket] 收到无效的事件数据:', event)
        }
      })
    })

    onBeforeUnmount(() => {
      console.log('[WebSocket] 移除消息监听器')
      window.removeEventListener('imMessage', getIm)

      // 清理视频流和连接 2025-05-07
      if (window.currentPeerConnection) {
        window.currentPeerConnection.close()
        window.currentPeerConnection = null
      }

      if (localVideo.value && localVideo.value.srcObject) {
        localVideo.value.srcObject.getTracks().forEach(track => track.stop())
      }
      if (remoteVideo.value && remoteVideo.value.srcObject) {
        remoteVideo.value.srcObject.getTracks().forEach(track => track.stop())
      }
      // 清理全局变量
  window.pendingOffer = null
  window.pendingIceCandidates = null
  // 关闭所有打开的媒体流
  if (window.localStream) {
    window.localStream.getTracks().forEach(track => track.stop())
    window.localStream = null
  }
  if (window.remoteStream) {
    window.remoteStream.getTracks().forEach(track => track.stop())
    window.remoteStream = null
  }
    })

    // 处理接收到的 answer  2025-05-07
    const handleAnswer = async (answer) => {
      try {
        const peerConnection = window.currentPeerConnection
        if (peerConnection) {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
        }
      } catch (error) {
        console.error('[音视频通话] 处理 answer 失败:', error)
      }
    }

    return {
      ...toRefs(data),
      ...toRefs(bindEmailData),
      ...toRefs(friendCircleData),
      ...toRefs(friendData),
      ...toRefs(groupData),
      ...toRefs(imUtilData),
      ...toRefs(changeDataData),
      isActive,
      sendMsg,
      submitAvatar,
      changeFriendStatus,
      submitChange,
      removeFriend,
      sendFriendMessage,
      changeDataType,
      changeAvatar,
      sendGroupMessage,
      changeAside,
      openFriendCircle,
      launch,
      deleteTreeHole,
      submitWeiYan,
      pageWeiYan,
      cleanFriendCircle,
      addFriend,
      getCode,
      submitDialog,
      exitGroup,
      dissolveGroup,
      showVideoCall,
      isAccepted,
      callType,
      isCaller,
      currentCallTargetId,
      handleCallOffer,
      handleCallAnswer,
      handleCallReject,
      handleCallCancel,
      handleIceCandidate, // 2025-05-07
      handleStartCall,
      getIm,
      handleAnswer// 2025-05-07,
    }
  }
}
</script>

<style scoped>

  .friend-wrap {
    background: var(--imBackground) center center / cover no-repeat;
    width: 100vw;
    height: 100vh;
  }

  .friend-box {
    display: flex;
    background-color: var(--white);
    border-radius: 10px;
    position: absolute;
    width: 70vw;
    max-width: 1000px;
    height: 80vh;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    overflow: hidden;
  }

  .friend-aside {
    width: 60px;
    border-right: 1px solid var(--maxLightGray);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .friend-bode {
    flex: 1;
    display: flex;
  }

  .body-left {
    width: 260px;
    box-shadow: 3px 0 6px var(--maxLightGray);
  }

  .body-right {
    flex: 1;
    position: relative;
  }

  .user-thumb {
    width: 36px;
    height: 36px;
    margin-top: 15px;
    margin-left: 12px;
    cursor: pointer;
  }

  .friend-chat {
    margin-top: 25px;
    text-align: center;
    cursor: pointer;
  }

  .friend-text {
    font-size: 13px;
  }

  .friend-set {
    text-align: center;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .im-input {
    margin: 13px;
    width: 240px;
  }

  .im-user {
    display: flex;
    padding: 10px;
    cursor: pointer;
    height: 60px;
    box-sizing: border-box;
  }

  .im-user-group {
    display: flex;
    padding: 10px;
    cursor: pointer;
    height: 65px;
    box-sizing: border-box;
  }

  .im-active, .friend-active, .im-group {
    background: var(--imBG);
  }

  .im-user-right {
    flex: 1;
    margin-left: 20px;
  }

  .aside-list {
    height: calc(100% - 60px);
  }

  .im-down {
    margin-top: 3px;
    font-size: 12px;
    color: var(--greyFont);
  }

  .aside-active {
    color: var(--blue);
    font-weight: 800;
  }

  .im-friend {
    margin-left: 20px;
    align-self: center;
    font-size: 15px;
  }

  .body-left >>> .n-divider .n-divider__title {
    color: var(--greyFont);
    font-size: 12px;
    letter-spacing: 2px;
  }

  .group-tag {
    border-radius: 2px;
    padding: 2px;
    background: var(--themeBackground);
    color: var(--white);
    margin-right: 12px;
  }

  .msg-one {
    margin: 15px 20px;
    display: flex;
    align-items: flex-start;
  }

  /* 滚动条 */
  .friend-box ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .friend-box ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: var(--lowGray);
  }

  .sendMsg .n-button {
    height: 35px;
    padding: 15px 25px;
  }

  .system-date {
    font-size: 12px;
    color: var(--greyFont);
    margin-bottom: 5px;
  }

  .system-content {
    background-color: var(--messageColor);
    border-radius: 4px;
    max-width: 80%;
    padding: 5px 10px;
    line-height: 25px;
    word-break: break-all;
    color: var(--black);
  }

  .friend-request {
    background: var(--midWhite);
    overflow-y: scroll;
    height: calc(100% - 60px);
  }

  .request-status {
    font-size: 16px;
    color: var(--greyFont);
    flex: 1;
    display: flex;
    justify-content: right;
    align-items: center;
  }

  .friend-label {
    color: var(--greyFont);
    margin-right: 30px;
  }

  .friend-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 65%;
    padding-top: 50px;
  }

  .body-right .n-card.n-card--bordered {
    border: none;
  }

  #outerImg {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10;
    width: 100%;
    height: 100%;
    display: none;
  }

  .mobile-right::before {
    content: "👈";
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 40px;
    color: var(--white);
    top: 0;
    left: 0;
    background: var(--maxGreyFont);
    z-index: 100;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .pagination-wrap {
    display: flex;
    justify-content: center;
    height: 35px;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .treeHole-wrap {
    width: 800px;
    height: calc(100vh - 100px);
    overflow-y: scroll;
  }

  .treeHole-wrap::-webkit-scrollbar-thumb {
    background-color: var(--lowGray);
    border-radius: 5px;
  }

  .treeHole-wrap::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .weiyan-edit {
    width: 350px;
    background-color: var(--background);
    border-radius: 10px;
    padding: 20px;
  }

  .email-wrap {
    padding: 20px;
    background: var(--white);
    border-radius: 10px;
    transition: all 1s ease;
  }

  .email-title {
    line-height: 30px;
    font-size: 24px;
    margin-bottom: 15px;
  }

  @media screen and (max-width: 1200px) {
    .friend-box {
      width: 95vw;
      height: 95vh;
    }
  }

  @media screen and (max-width: 850px) {
    .friend-box {
      width: 100vw;
      height: 100vh;
      border-radius: unset;
    }

    .friend-bode {
      max-width: calc(100vw - 60px);
    }

    .body-right {
      max-width: calc(100vw - 60px);
    }

    .treeHole-wrap {
      width: calc(100vw - 40px);
    }
  }

  @media screen and (max-width: 400px) {
    .msg-one {
      margin: 15px 10px;
    }

    .friend-model {
      width: 90% !important;
    }
  }
</style>
