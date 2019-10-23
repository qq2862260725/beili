import axios from 'axios'
import qs from 'qs'

//车证类型列表
export function getTypeList(userId) {
    let url = 'http://xin.claile.com/api/Setrent/index'
    let data = qs.stringify({
        userId
    })

    return axios.post(url, data).then((res) => {
        return Promise.resolve(res.data)
    })
}

//单个车证类型信息接口
export function getTypeDetail(userId, setrentId) {
    let url = 'http://xin.claile.com/api/Setrent/detail'
    let data = qs.stringify({
        userId,
        setrentId
    })

    return axios.post(url, data).then((res) => {
        return Promise.resolve(res.data)
    })
}