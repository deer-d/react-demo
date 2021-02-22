import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import Thunk from 'redux-thunk';
import {BrowserRouter, Route, Redirect, withRouter, Switch} from 'react-router-dom';
import { LocaleProvider } from 'antd';
import ZhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { composeWithDevTools } from 'redux-devtools-extension';
import Immutable from 'immutable';
import reducer from '../redux/reducer.js';
import Index from '../pages/Index';
import 'antd/dist/antd.css';
import './index.less';
import commonUtils from '../utils/commonUtils';

const composeEnhancers = composeWithDevTools({});


const initState = Immutable.fromJS({});
const store = createStore(reducer, initState, composeEnhancers(applyMiddleware(Thunk)));
@withRouter
export default class In extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        console.log(2);
    }

    // 在所有子页面加载之前， 更新 token 等信息
    componentWillMount() {
        console.log(1);
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path='/' exact component={Index} />
                </Switch>
            </React.Fragment>
        );

    }
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <LocaleProvider locale={ZhCN}>
                <In/>
            </LocaleProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);

