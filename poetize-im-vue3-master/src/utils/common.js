import constant from './constant'
import CryptoJS from 'crypto-js'
import store from '../store'
import { ElMessage } from 'element-plus'

export default {
  /**
   * 判断设备
   */
  mobile () {
    const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag && flag.length && flag.length > 0
  },

  /**
   * 判断是否为空
   */
  isEmpty (value) {
    if (typeof value === 'undefined' || value === null || (typeof value === 'string' && value.trim() === '') || (Array.prototype.isPrototypeOf(value) && value.length === 0) || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0)) {
      return true
    } else {
      return false
    }
  },

  /**
   * 加密
   */
  encrypt (plaintText) {
    const options = {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
    const key = CryptoJS.enc.Utf8.parse(constant.cryptojs_key)
    const encryptedData = CryptoJS.AES.encrypt(plaintText, key, options)
    return encryptedData.toString().replace(/\//g, '_').replace(/\+/g, '-')
  },

  /**
   * 解密
   */
  decrypt (encryptedBase64Str) {
    const val = encryptedBase64Str.replace(/\-/g, '+').replace(/_/g, '/')
    const options = {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }
    const key = CryptoJS.enc.Utf8.parse(constant.cryptojs_key)
    const decryptedData = CryptoJS.AES.decrypt(val, key, options)
    return CryptoJS.enc.Utf8.stringify(decryptedData)
  },

  /**
   * 表情包转换
   */
  faceReg (content) {
    content = content.replace(/\[[^\[^\]]+\]/g, (word) => {
      const index = constant.emojiList.indexOf(word.replace('[', '').replace(']', ''))
      if (index > -1) {
        const url = store.state.sysConfig.webStaticResourcePrefix + 'emoji/q' + (index + 1) + '.gif'
        return '<img loading="lazy" style="vertical-align: middle;width: 32px;height: 32px" src="' + url + '" title="' + word + '"/>'
      } else {
        return word
      }
    })
    return content
  },

  /**
   * 图片转换
   */
  pictureReg (content) {
    content = content.replace(/\[[^\[^\]]+\]/g, (word) => {
      const index = word.indexOf(',')
      if (index > -1) {
        const arr = word.replace('[', '').replace(']', '').split(',')
        return '<img loading="lazy" style="border-radius: 5px;width: 100%;max-width: 250px" src="' + arr[1] + '" title="' + arr[0] + '"/>'
      } else {
        return word
      }
    })
    return content
  },

  /**
   * 字符串转换为时间戳
   */
  getDateTimeStamp (dateStr) {
    return Date.parse(dateStr.replace(/-/gi, '/'))
  },

  getDateDiff (dateStr) {
    const publishTime = Date.parse(dateStr.replace(/-/gi, '/')) / 1000
    let d_seconds
    let d_minutes
    let d_hours
    let d_days
    const timeNow = Math.floor(new Date().getTime() / 1000)
    let d
    const date = new Date(publishTime * 1000)
    const Y = date.getFullYear()
    let M = date.getMonth() + 1
    let D = date.getDate()
    let H = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    // 小于10的在前面补0
    if (M < 10) {
      M = '0' + M
    }
    if (D < 10) {
      D = '0' + D
    }
    if (H < 10) {
      H = '0' + H
    }
    if (m < 10) {
      m = '0' + m
    }
    if (s < 10) {
      s = '0' + s
    }
    d = timeNow - publishTime
    d_days = Math.floor(d / 86400)
    d_hours = Math.floor(d / 3600)
    d_minutes = Math.floor(d / 60)
    d_seconds = Math.floor(d)
    if (d_days > 0 && d_days < 3) {
      return d_days + '天前'
    } else if (d_days <= 0 && d_hours > 0) {
      return d_hours + '小时前'
    } else if (d_hours <= 0 && d_minutes > 0) {
      return d_minutes + '分钟前'
    } else if (d_seconds < 60) {
      if (d_seconds <= 0) {
        return '刚刚发表'
      } else {
        return d_seconds + '秒前'
      }
    } else if (d_days >= 3 && d_days < 30) {
      return M + '-' + D + ' ' + H + ':' + m
    } else if (d_days >= 30) {
      return Y + '-' + M + '-' + D + ' ' + H + ':' + m
    }
  },

  /**
   * 保存资源
   */
  saveResource (that, type, path, size, mimeType, originalName, storeType) {
    const resource = {
      type: type,
      path: path,
      size: size,
      mimeType: mimeType,
      storeType: storeType,
      originalName: originalName
    }

    that.$http.post(that.$constant.baseURL + '/resource/saveResource', resource)
      .catch((error) => {
        ElMessage({
          message: error.message,
          type: 'error'
        })
      })
  }
}
