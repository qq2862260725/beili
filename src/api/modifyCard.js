import axios from 'axios'
import qs from 'qs'

let config = {
    headers:{'Content-Type':'multipart/form-data'}
}

export function ModifyCard(userId, carNum, carType, carImg) {
    let url = 'http://xin.claile.com/api/Userinfo/driver'
    let data = qs.stringify({
        userId,
        carNum,
        carType,
        carImg,
    })

    return axios.post(url, data, config).then((res) => {
        return Promise.resolve(res.data)
    })
}