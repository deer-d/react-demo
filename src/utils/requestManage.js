// import axios from 'axios';
// import qs from 'qs';
// import {message, Modal} from 'antd';
// import { Base64 } from 'js-base64';
// const domain = require('../../config/domain.js');
// const environmental = domain.environmental;
// import md5 from 'src/utils/md5';
// import React from "react";
// let clientId = 'TRUCKER';
// let clientSecret = domain[environmental].clientSecret;
//
//
// let getConfig = async ()=>{
//     return new Promise((resolve, reject)=>{
//         axios.get('/getConfig').then(res=>{
//             if (res.data.clientSecret) {
//                 clientSecret = res.data.clientSecret;
//             }
//             resolve();
//         }, err=>{
//             reject();
//         });
//     });
// };
//
// export default {
//     handleResolve:function(res, resolve) {
//         if (res.status === 200) {
//             resolve(res.data);
//         } else if (res.status === 204) {
//             resolve(res.data);
//         } else {
//             resolve(res.response);
//         }
//     },
//     handleReject:function(reject, handleErr) {
//         if (window.location.href.includes('/cpcn/h5/')) {
//             this.handleRejectH5(reject, handleErr);
//         } else {
//             this.handleRejectZhongjin(reject, handleErr);
//         }
//
//     },
//     handleRejectZhongjin: function(reject, handleErr) {
//         // 中金的逻辑
//         let tempContent = '';
//         if (reject.status === 500) {
//             Modal.confirm(
//                 {
//                     content: reject.data.message ? reject.data.message : '服务器异常，请与管理员联系',
//                     onOk() {
//                         if (reject.data.status === 403) {
//                             console.log('1');
//                         } else {
//                             console.log('OK1');
//                         }
//                     },
//                     onCancel() {
//                         if (reject.data.status === 403) {
//                             console.log('1');
//                         } else {
//                             console.log('Cancel');
//                         }
//                     },
//                 }
//             );
//
//         } else if (reject.status === 401) {
//             tempContent = reject.data.message ? reject.data.message : '服务器异常，请与管理员联系';
//             if (tempContent === 'token无效') {
//                 return;
//             }
//             Modal.confirm(
//                 {
//                     content: tempContent
//                 }
//             );
//         } else if (reject.data && reject.data.errors === "订单已失效") {
//             window.location.href = "/cpcn/status/failure";//跳转订单失效页面
//         } else if (reject.data && reject.data.errors === "订单不存在") {
//             window.location.href = "/cpcn/status/absence";//跳转订单不存在页面
//         } else if (reject.data && reject.data.errors === "订单已支付") {
//             window.location.href = "/cpcn/status/paid";//跳转订单不存在页面
//         } else {
//             tempContent = reject.response ? reject.response.data.message : reject.data.message;
//             // if (tempContent.search(/latiude.notnull/) !== -1) {
//             //     tempContent = "请在设置中允许应用访问您的位置信息";
//             // }
//             Modal.confirm(
//                 {
//                     content: tempContent,
//                     onOk() {
//                         localStorage.clear();
//                         window.location.href = '/cpcn/';
//                     },
//                     onCancel() {
//                         if (reject.data && reject.data.status === 403) {
//                             console.log('1');
//                         } else {
//                             console.log('Cancel');
//                         }
//                     },
//                 }
//             );
//
//         }
//
//         if (reject.data.error) {
//             if (reject.data.error === 'unauthorized' || reject.data.error === 'invalid_token') {
//                 localStorage.clear();
//                 window.location.href = '/cpcn/';
//                 this.pushHistory();
//             } else {
//                 handleErr();
//             }
//         }
//     },
//     handleRejectH5: function(reject, handleErr) {
//         let tempContent = '';
//         if (reject.status === 500) {
//             Modal.confirm(
//                 {
//                     content: reject.data.message ? reject.data.message : '服务器异常，请与管理员联系',
//                     onOk() {
//                         if (reject.data.status === 403) {
//                             console.log('1');
//                         } else {
//                             console.log('OK1');
//                         }
//                     },
//                     onCancel() {
//                         if (reject.data.status === 403) {
//                             console.log('1');
//                         } else {
//                             console.log('Cancel');
//                         }
//                     },
//                 }
//             );
//
//         } else if (reject.status === 401) {
//             message.error('暂无权限401，请退出重新登录');
//             // console.log(reject.data.message ? reject.data.message : '服务器异常，请与管理员联系');
//         } else {
//             tempContent = reject.response ? reject.response.data.message : reject.data.message;
//             Modal.confirm(
//                 {
//                     content: tempContent,
//                     onOk() {
//                         console.log('ok');
//                     },
//                     onCancel() {
//                         if (reject.data && reject.data.status === 403) {
//                             console.log('暂无权限403');
//                         } else {
//                             console.log('Cancel');
//                         }
//                     },
//                 }
//             );
//
//         }
//
//         if (reject.data.error) {
//             if (reject.data.error === 'unauthorized' || reject.data.error === 'invalid_token') {
//                 localStorage.clear();
//                 window.location.href = '/cpcn/';
//                 this.pushHistory();
//             } else {
//                 handleErr();
//             }
//         }
//     },
//
//     pushHistory:function() {
//         history.pushState(null, null, document.URL);
//         window.addEventListener('popstate', function () {
//             history.pushState(null, null, document.URL);
//         });
//     },
//     requestGet:function(url) {
//         let that = this;
//         return new Promise((resolve, reject)=> {
//             axios(url, {
//                 method:'GET',
//                 headers:{
//                     'authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
//                 },
//             }).then(res=>{
//                 that.handleResolve(res, resolve);
//             }, err=>that.handleReject(err.response, reject));
//         });
//     },
//     requestGetWithoutHandle:function(url) {
//         let that = this;
//         return new Promise((resolve, reject)=> {
//             axios(url, {
//                 method:'GET',
//                 headers:{
//                     'authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
//                 },
//             }).then(res=>{
//                 that.handleResolve(res, resolve);
//             }, err=>console.log(err));
//         });
//     },
//
//     requestGetWithHandle:function(url) {
//         let that = this;
//         return new Promise((resolve, reject)=> {
//             axios(url, {
//                 method:'GET',
//                 headers:{
//                     'authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
//                 },
//             }).then(res=>{
//                 that.handleResolve(res, resolve);
//             }, err=>that.handleResolve(err, resolve));
//         });
//     },
//     requestPost:function(url, obj) {
//         let that = this;
//         return new Promise((resolve, reject)=> {
//             axios(url, {
//                 method:'POST',
//                 headers:{
//                     'authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
//                 },
//                 data:obj
//             }).then(res=>{
//                 that.handleResolve(res, resolve);
//                 // that.handleReject(err.response, reject)
//             }, err=>that.handleReject(err, reject));
//         });
//     },
//     requestPostCode:function(url, obj) {
//         let that = this;
//         return new Promise((resolve, reject)=> {
//             axios(url, {
//                 method:'POST',
//                 headers:{
//                     'Content-Type': 'application/json'
//                 },
//                 data:obj
//             }).then(res=>{
//                 that.handleResolve(res, resolve);
//
//             }, err=> that.handleReject(err.response, reject));
//         });
//     },
//     requestPut:function(url, obj) {
//         let that = this;
//         return new Promise((resolve, reject)=> {
//             axios(url, {
//                 method:'PUT',
//                 headers:{
//                     'authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
//                 },
//                 data:obj
//             }).then(res=>{
//                 that.handleResolve(res, resolve);
//             }, err=>that.handleReject(err.response, reject));
//         });
//     },
//     requestPut1:function(url) {
//         let that = this;
//         return new Promise((resolve, reject)=> {
//             axios(url, {
//                 method:'PUT',
//                 headers:{
//                     'authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
//                 },
//             }).then(res=>{
//                 that.handleResolve(res, resolve);
//             }, err=>that.handleReject(err.response, reject));
//         });
//     },
//     requestDELETE:function (url, obj) {
//         let that = this;
//         return new Promise((resolve, reject)=> {
//             axios(url, {
//                 method:'DELETE',
//                 headers:{
//                     'authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
//                 },
//                 data:obj
//             }).then(res=>{
//                 that.handleResolve(res, resolve);
//             }, err=>that.handleReject(err.response, reject));
//         });
//     },
//
//     refreshToken:function () {
//         let that = this;
//         return new Promise((resolve, reject)=>{
//             getConfig().then(res => {
//                 let tempStr = clientId + ':' + clientSecret;
//                 axios('/auth/oauth/token', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/x-www-form-urlencoded',
//                         'Authorization': 'Basic ' + Base64.encode(tempStr)
//                     },
//                     data: qs.stringify({
//                         "grant_type": "refresh_token",
//                         "refresh_token": window.localStorage.getItem('refresh_token')
//                     })
//                 }).then(res => {
//                     if (res.status === 200) {
//                         localStorage.setItem('access_token', res.data.access_token);
//                         localStorage.setItem('refresh_token', res.data.refresh_token);
//                         localStorage.setItem('token_type', res.data.token_type);
//                         resolve({status: 200});
//
//                         // 记录司机位置信息
//                         if (window.localStorage.getItem('latitude')) {
//                             axios('/api/user-center-api/drivers/trucker/registerAddr', {
//                                 method: 'POST',
//                                 headers: {
//                                     'Content-Type': 'application/json',
//                                     'authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
//                                 },
//                                 data: {
//                                     "latitude": window.localStorage.getItem('latitude'),
//                                     "longitude": window.localStorage.getItem('longitude')
//                                 }
//                             });
//                         }
//                     }
//                 }, err => resolve({status: 401}));
//             });
//         });
//     },
//     checkToken:function () {
//         return new Promise((resolve, reject)=>{
//             getConfig().then(res => {
//                 let tempStr = clientId + ':' + clientSecret;
//
//                 axios.get(`/auth/oauth/check_token?token=${window.localStorage.getItem('access_token')}`,
//                     {
//                         headers: {
//                             'Content-Type': 'application/x-www-form-urlencoded',
//                             'Authorization': 'Basic ' + Base64.encode(tempStr)
//                         },
//                     }).then(res => {
//                     resolve({status: 200});
//                 }, err => {
//                     resolve({status: 401});
//                 });
//             });
//         });
//     },
//     login:function (obj) {
//         let that = this;
//         return new Promise((resolve, reject)=>{
//             getConfig().then(res => {
//                 let tempStr = clientId + ':' + clientSecret;
//                 console.log(tempStr, "tempStr", obj);
//                 axios('/auth/oauth/token', {
//                     method:'POST',
//                     headers:{
//                         'Content-Type':'application/x-www-form-urlencoded',
//                         'Authorization': 'Basic ' + Base64.encode(tempStr)
//                     },
//                     data:qs.stringify({
//                         'deviceId': obj.deviceId,
//                         'mobile': obj.mobile,
//                         'smsCode': md5(obj.smsCode),
//                         'grant_type':'sms_code',
//                     })
//                 }).then(res=>{
//                     if (res.status === 200) {
//                         localStorage.setItem('access_token', res.data.access_token);
//                         localStorage.setItem('refresh_token', res.data.refresh_token);
//                         localStorage.setItem('token_type', res.data.token_type);
//                         localStorage.setItem('userId', res.data.userId);
//                         let refreshTokenTime = new Date().getTime().toString();
//                         localStorage.setItem('updateTokenTime', refreshTokenTime);
//                         localStorage.setItem('user_mobile', obj.mobile);
//                         resolve(res);
//
//                         // 记录司机位置信息
//                         if (window.localStorage.getItem('latitude')) {
//                             axios('/api/user-center-api/drivers/trucker/registerAddr', {
//                                 method: 'POST',
//                                 headers: {
//                                     'Content-Type': 'application/json',
//                                     'authorization': localStorage.getItem('token_type') + ' ' + localStorage.getItem('access_token')
//                                 },
//                                 data: {
//                                     "latitude": window.localStorage.getItem('latitude'),
//                                     "longitude": window.localStorage.getItem('longitude')
//                                 }
//                             });
//                         }
//                     }
//                 }, err=>{
//                     reject(err.response);
//                     this.handleReject(err.response);
//                 });
//             });
//         });
//     },
//     logout:function() {
//         axios('/logout/logout/token/evict', {
//             method:'PUT',
//             params:{
//                 token:localStorage.getItem('access_token')
//             }
//         }).then(res=>{
//             console.log(res);
//         });
//     },
//
//     // 跳转前验证token
//     checkTokenAndRefresh:function(url) {
//         let that = this;
//         return new Promise((resolve) => {
//             that.checkToken().then(res=> {
//                 if (res.status === 200) {
//                     if (localStorage.getItem('updateTokenTime') && (new Date().getTime() - localStorage.getItem('updateTokenTime')) / 86400 > 1) {
//                         that.refreshToken().then(res => {
//                             if (res.status === 200) {
//                                 let refreshTokenTime = new Date().getTime().toString();
//                                 localStorage.setItem('updateTokenTime', refreshTokenTime);
//                                 url ? window.location.href = url : resolve('success');
//                             } else {
//                                 window.location.href = '/bindingPhone';
//                                 resolve('error');
//                             }
//                         });
//                     } else {
//                         url ? window.location.href = url : resolve('success');
//                     }
//                 } else {
//                     window.location.href = '/bindingPhone';
//                     resolve('error');
//                 }
//             });
//         });
//     },
//     browserTotal:function ({title = '', url = '', parentUrl = '', appName = '', pageType = '', buttonName = '', itemId = '', longitude = '', latitude = ''} = {}) {
//         let search = window.localStorage.getItem('search');
//         let searchObj = search ? JSON.parse(search) : null;
//         if (searchObj && searchObj.source) {
//             let tempTime = new Date().getTime();
//             let tempUuid = searchObj.uuid;
//             let tempUserId = searchObj.userId;
//             let tempUserAgent = searchObj.userAgent;
//             let targetSystem = searchObj.osSystem;
//             let tempPhone = searchObj.dk_user_mobile;
//             let tempSource = searchObj.source;
//             let tempObj = {
//                 visitTime: tempTime,
//                 uuid: tempUuid ? tempUuid : '',
//                 userId: tempUserId ? tempUserId : '',
//                 userAgent: tempUserAgent ? tempUserAgent : '',
//                 osSystem: targetSystem,
//                 source: tempSource ? tempSource : '',
//                 userPhone: tempPhone ? tempPhone : '',
//             };
//             let tempDefineName = {
//                 title: title,
//                 url: url,
//                 referUrl: parentUrl,
//                 appName: appName,
//                 pageType: pageType,
//                 buttonName: buttonName,
//                 extInfo: {
//                     itemId: itemId
//                 },
//                 longitude: longitude,
//                 latitude: latitude
//             };
//
//             let targetInfo = Object.assign(tempObj, tempDefineName);
//
//             axios('/total/point/log', {
//                 method:'POST',
//                 data:targetInfo
//             }).then(res=>{console.log('');}).catch(err=>{console.log('');});
//         }
//
//     }
// };
