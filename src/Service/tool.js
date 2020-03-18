import qs from 'qs';
import axios from 'axios';
import STATIC from './static';
let api = (url, params) => {
    const tourl = STATIC.API_BASE_URL + url;
    return axios({
        url: tourl,
        data: qs.stringify(params),
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(data => {
        if (data.data.code != 200) {
            console.log(data.message);
            throw data.message
        }
        return data.data.data;
    });
}


let goto = url => {
    history.pushState({}, '', url);
    smooth(document.documentElement, 'scrollTop', 0);
    window.dispatchEvent(new Event('popstate'));
}

let smooth = async(obj, key, val, time = 300) => {
    if (val == obj[key]) return;
    for (let times = parseInt(time / 10), mul = (val - obj[key]) / times; times > 0; times--) {
        await new Promise(c => setTimeout(c, 10));
        obj[key] += mul;
    }
    await new Promise(c => setTimeout(c, 10));
    obj[key] = val;

}

export { api, goto, smooth };