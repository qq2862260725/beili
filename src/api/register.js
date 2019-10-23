import axios from 'axios'
import qs from 'qs'

export function register(carNum, carType, name, phone) {
    let url = 'http://xin.claile.com/api/login/regist'
    let data = qs.stringify({
        carNum,
        carType,
        name,
        phone
    })

    return axios.post(url, data).then((res) => {
        return Promise.resolve(res.data)
    })
}