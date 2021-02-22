import Immutable from "immutable";

const commonUtils = {
    urlParameterToJson: function() {
        var name, value;
        var str = location.href; //取得整个地址栏
        var num = str.indexOf("?");
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
        var arr = str.split("&"); //各个参数放到数组里
        var info = {};
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                info[name] = value;
            }
        }
        return info;
    },

    localStorageSetToken: function () {
        let urlParameter = this.urlParameterToJson();
        if (urlParameter.token_type && urlParameter.access_token) {
            localStorage.setItem('token_type', urlParameter.token_type);
            localStorage.setItem('access_token', urlParameter.access_token);
            console.log('token is: ', urlParameter.access_token);
        }
    },

    // 获取h5嵌入的环境
    appEnv: function () {
        let u = navigator.userAgent;
        let app = navigator.appVersion;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let ua = u.toLowerCase();
        let isWx = ua.match(/MicroMessenger/i) === "micromessenger";

        if (isAndroid) {
            return 'android';
        } else if (isiOS) {
            return 'ios';
        } else if (isWx) {
            return 'wx';
        } else {
            return 'other';
        }
    },

    checkData: function (obj) {
        //检查字段是否为null，是的话则转换成'-'，否则不做修改
        let keys = Object.keys(obj);
        for (let i = 0; i < keys.length ; i++) {
            if (obj[keys[i]] === null || obj[keys[i]] === '') {
                obj[keys[i]] = '-';
            }
        }
        return obj;
    },

    jsToMapToObj: function (original, current) {
        let tempData = Immutable.fromJS(original);
        let taregetData = tempData.merge(current);
        return taregetData.toObject();
    },

    splicingParameter: function (obj) {
        let tempString = '';
        if (obj) {
            let objkeys = Object.keys(obj);
            let addFlag = 0;
            for (let s = 0; s < objkeys.length ; s++) {
                if (obj[objkeys[s]] !== null && obj[objkeys[s]] !== '' && obj[objkeys[s]] !== undefined) {
                    addFlag += 1;
                    tempString += `${addFlag === 1 ? '?' : '&'}${objkeys[s]}=` + obj[objkeys[s]];
                }
            }
        }
        return tempString;
    },


};
export default commonUtils;