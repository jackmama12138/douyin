// 使用封装后的axios实例发送GET请求
import service from "../utils/http.js";
export function getOnline(roomid) {
    return service({
        url: `/getOnline/${roomid}`,
        method: 'get'
    });
}

export function getHotList() {
    return service({
        url: 'http://101.43.7.52:4000/api/hostList',
        method: 'get',
    });
}

export function getScoresList() {
    return service({
        url: 'http://101.43.7.52:4000/api/scoresList',
        method: 'get'
    });
}