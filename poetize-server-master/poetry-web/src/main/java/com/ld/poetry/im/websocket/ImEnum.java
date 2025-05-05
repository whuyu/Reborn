package com.ld.poetry.im.websocket;

public enum ImEnum {
    /**
     * 消息类型
     */
    MESSAGE_TYPE_MSG_SINGLE(1, "单聊"),
    MESSAGE_TYPE_MSG_GROUP(2, "群聊"),
    MESSAGE_TYPE_CALL_OFFER(3, "通话请求"),
    MESSAGE_TYPE_CALL_ANSWER(4, "通话应答"),
    MESSAGE_TYPE_CALL_REJECT(5, "通话拒绝"),
    MESSAGE_TYPE_CALL_CANCEL(6, "通话取消"),
    MESSAGE_TYPE_CALL_ICE(7, "ICE候选");

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
