/**
 * Created by scmhzl on 2016/12/29.
 */

import React,{PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../routes/react/action/index.js'
class Login extends React.Component {
    constructor(props){
        super(props);
        this.submit = this.submit.bind(this);
    }
    submit(e){
        e.preventDefault();
        var userData = {
            name:this.refs.useName.value,
            password:this.refs.usePas.value
        }
        this.props.action_login("sign/in",userData,true)
    }
    render (){
        return (
            <div className ="loginBox">
                <h2 className ="text-center">交流从这里开始！</h2>
                <div className ="login_top">
                    <div>登陆</div>
                </div>
                <form id="logForm" onSubmit={this.submit}>
                    <div className ="inpTex">
                        <label htmlFor = "text" className ="fa fa-user labelText text-center"></label>
                        <input type="text" id="text" placeholder="请输入您的用户名" ref="useName" required />
                    </div>
                    <div className="info">{this.props.errInfo.id == 4? this.props.errInfo.message:""}</div>
                    <div className ="inpTex">
                        <label htmlFor = "pass" className ="fa fa-unlock-alt labelText text-center"></label>
                        <input type="password" id="pass" placeholder="请输入密码" ref="usePas" required/>
                    </div>
                    <div className ="login_bottom">
                        <input type="submit" value="登陆" className ="loginBtn"/>
                    </div>
                </form>
            </div>
        )
    }
}

// 连接
export default connect(
    (state)=>({login:state.loginReg,errInfo:state.errorInfo}),
    actions
)(Login)