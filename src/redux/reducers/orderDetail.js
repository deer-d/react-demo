import {ORDER_NODATA, ORDER_SUCCESS} from '../actions/orderDetail.js';
import {createReducer} from 'redux-immutablejs';
import Immutable from 'immutable';
const initState = Immutable.fromJS({
    reqSuccess:false,
    data:{},

});

export default createReducer(initState, {
    [ORDER_NODATA]:state=>state.merge({
        reqSuccess:false,
        data:[],
    }),
    [ORDER_SUCCESS]:(state, action)=>state.merge({
        reqSuccess:true,
        data:action.data,
    }),

});