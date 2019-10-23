import axios from 'axios'
import qs from 'qs'

export function getUserInfo(userId) {
    let url = 'http://xin.claile.com/api/Setrent/chezheng'
    let data = qs.stringify({
        userId
    })

    return axios.post(url, data).then((res) => {
        return Promise.resolve(res.data)
    })
}