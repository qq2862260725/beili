import axios from 'axios'
import qs from 'qs'

export function login(carNum, phone) {
    let url = 'http://xin.claile.com/api/login/index'
    let data = qs.stringify({
        phone,
        carNum
    })

    return axios.post(url, data).then((res) => {
        return Promise.resolve(res.data)
    })
}