import React from 'react';
import style from './PasswordModal.scss';
import CSSModules from "react-css-modules";
let canSendPsw = true;

@CSSModules(style, { allowMultiple: true })
export default class PasswordModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            password: '',
        };
    }

    componentDidMount() {
        console.log('密码组件加载');
        canSendPsw = true;
    }

    showPasswordDiv = () => {
        if (this.props.type) {
            this.input.focus();
        }
        this.setState({
            show: true
        });
    }

    hidePasswordDiv = () => {
        this.setState({
            show: false,
            password: '',
        });
        if (this.props.type) {
            this.input.blur();
            this.input.value = '';
        }
    }

    inputChange = (e) => {
        let p = e.currentTarget.value;
        this.setState({
            password: p
        });
        if (p.length >= 6) {
            canSendPsw = false;
            // 可以提交密码啦
            if (this.props.requestConfirm) {
                setTimeout(() => {
                    this.props.requestConfirm(p);
                    this.hidePasswordDiv();
                }, 300);
            }
        } else {
            canSendPsw = true;
        }
    }

    createPswCells = () => {
        let cells = [];
        for (let i = 0; i < 6; i++) {
            cells.push(<span styleName='cell'>
                {
                    this.state.password.length > i && <span>*</span>
                }
            </span>);
        }
        return cells;
    }

    forgetPassword = () => {
        if (this.props.forgetPassword) {
            this.props.forgetPassword();
        }
    }

    createBlocks = () => {
        let keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'blank', '0', 'cancel'];
        let blocks = [];
        keys.map(item => {
            blocks.push(
                <div onClick={this.keyboardInputPassword} data-val={item} styleName={`block button ${!'0123456789'.includes(item) ? item : ''}`}>
                    {'0123456789'.includes(item) ? item : (item === 'cancel' ? 'x' : '')}
                </div>
            );
        });
        return blocks;
    }

    keyboardInputPassword = (e) => {
        let v = e.currentTarget.dataset.val;
        let p = this.state.password;
        if (v === 'cancel' && p.length > 0) { // 点击删除
            p = p.substring(0, p.length - 1);
        } else if ('0123456789'.includes(v)) { // 点击数字
            p += v;
        }
        this.setState({password: p});
        // 样式相关
        if (p.length >= 6) {
            canSendPsw = false;
            // 可以提交密码啦
            if (this.props.requestConfirm) {
                setTimeout(() => {
                    this.props.requestConfirm(p);
                    this.hidePasswordDiv();
                }, 300);
            }
        } else {
            canSendPsw = true;
        }
    }

    render () {
        const {show} = this.state;
        const {title, type} = this.props;

        return (
            <div>
                {
                    this.props.type && <input
                        type="number"
                        style={{position:'absolute', top: '-9999px'}}
                        ref={input => (this.input = input)}
                        onChange={this.inputChange}
                    />
                }
                <div style={{visibility: show ? 'visible' : 'hidden'}}>
                    <div styleName='mask' onClick={this.hidePasswordDiv}></div>
                    <div styleName='pwdDiv' style={{bottom: show ? '0px' : '-900px'}}>
                        <div styleName='top'>{title || '请输入支付密码'}</div>
                        <div styleName='content'>
                            <div styleName='cellBox'>{this.createPswCells()}</div>
                            <div styleName='forgetPsw' onClick={this.forgetPassword}>忘记密码</div>
                        </div>

                        {
                            !type && <div styleName='defaultKeyBoard'>
                                {
                                    this.createBlocks()
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>

        );
    }
}