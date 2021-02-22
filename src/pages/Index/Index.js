import React from 'react';
import CSSModules from 'react-css-modules';
import style from './Index.scss';
import { Route, withRouter, Link } from 'react-router-dom';
import { Steps, Button} from 'antd-mobile';
const Step = Steps.Step;

@withRouter
@CSSModules(style, {allowMultiple: true})
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 2, // 从 0 开始

        };
    }

    componentDidMount() {
        window.localStorage.setItem('111', '1');
    }

    render() {
        const {currentStep} = this.state;
        const customIcon = (index, status) => {
            let styles = {
                'wait': 'step-icon-wait',
                'finish': 'step-icon-finish',
                'current': 'step-icon-current',
            };
            return [<div styleName={`custom-step-icon ${styles[status]}`}>{index}</div>];

        };

        const createStepElement = () => {
            let currentStep = this.state.currentStep;
            let r = [];
            ['身份证信息', "个人信息", "入职信息", "银行卡上传"].map((item, index) => {
                r.push(<Step key={0} title={item} icon={customIcon(index + 1, currentStep === index ? 'current' : (currentStep > index ? 'finish' : 'wait'))} status={currentStep === index ? 'finish' : ''}></Step>);
            });
            return r;
        };

        return (
            <div styleName='page'>
                <div styleName='step-box'>
                    <Steps direction="horizontal" current={currentStep}>{createStepElement()}</Steps>
                </div>

                <div stylName='btn-box'>
                    <Button>default</Button>
                    <Button>default</Button>

                </div>
            </div>
        );
    }
}
