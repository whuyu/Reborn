package com.ld.poetry.im.websocket;

public enum ImEnum {
    /**
     * 消息类型
     */
    MESSAGE_TYPE_MSG_SINGLE(1, "单聊"),
    MESSAGE_TYPE_MSG_GROUP(2, "群聊"),
    MESSAGE_TYPE_CALL_VIDEO(3, "视频通话"),       // 3改为视频通话
    MESSAGE_TYPE_CALL_AUDIO(4, "语音通话"),       // 4改为语音通话
    MESSAGE_TYPE_CALL_ACCEPT(5, "通话接收"),      // 5改为通话接收
    MESSAGE_TYPE_CALL_REJECT(6, "通话拒绝"),      // 6改为通话拒绝
    MESSAGE_TYPE_CALL_CANCEL(7, "通话取消"),      // 7改为通话取消
    MESSAGE_TYPE_CALL_ICE(8, "ICE候选");          // 8改为ICE候选


    private int code;
    private String msg;

    ImEnum(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
