import requestManage from '../../utils/requestManage';

export const ORDER_NODATA = 'ORDER_NODATA';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';

export function getOrder(sn) {//订单详情
    return (dispatch)=>{
        let tempUrl = `/api/taurus-pay/payments/getPayment?transNo=${sn}&telephone=${window.localStorage.getItem("user_mobile")}`;
        // let tempUrl = `/taurus-pay/payments/getPayment?transNo=${sn}`;
        requestManage.requestGet(tempUrl).then(res=>{
            if (res.data) {
                dispatch({
                    type:ORDER_SUCCESS,
                    data:res.data,
                });
            } else {
                dispatch({
                    type:ORDER_NODATA,
                    data:{},
                });
            }
        });
    };
}
//中金支付
export function getPayStatus(orderSn, bankCode) {
    let tempUrl = `/api/taurus-pay/payments/getZjPay?transNo=${orderSn}&telephone=${window.localStorage.getItem("user_mobile")}&bankCode=${bankCode}`;
    // let tempUrl = `/taurus-pay/payments/getZjPay?transNo=${orderSn}`;
    // return ()=>(requestManage.requestPost(tempUrl, obj));
    return ()=>(requestManage.requestGet(tempUrl));
}
//中金支付页面
export function getZjPayPlatform(outTransNo) {
    let tempUrl = `/api/taurus-pay/payments/zjPayPlatform?outTransNo=${outTransNo}`;
    // let tempUrl = `/taurus-pay/payments/getZjPay?transNo=${orderSn}`;
    // return ()=>(requestManage.requestPost(tempUrl, obj));
    return ()=>(requestManage.requestGet(tempUrl));
}


