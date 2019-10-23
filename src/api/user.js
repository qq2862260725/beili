import axios from 'axios'
import qs from 'qs'

export function userInfo(userId) {
    let url = 'http://xin.claile.com/api/Userinfo/index'
    let data = qs.stringify({
        userId
    })

    return axios.post(url, data).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function modifyInfo(userId, name, phone) {
    let url = 'http://xin.claile.com/api/Userinfo/edit'

    let data = qs.stringify({
        userId,
        name,
        phone,
    })

    return axios.post(url, data).then((res) => {
        return Promise.resolve(res.data)
    })
}