/**
 * Created by scmhzl on 2016/12/29.
 */
import React ,{ Component } from 'react';
import {connect} from 'react-redux';

import * as actions from '../../routes/react/action/index.js'
class Register extends Component {
    constructor(props){
        super(props);
        this.submit = this.submit.bind(this);
    }
    submit(e){
        e.preventDefault();
        var userData = {
            name:this.refs.name.value,
            password:this.refs.password.value,
            //avatar:this.refs.avatar.files[0].name
        }
        //console.log(userData)
        this.props.action_login("sign/up",userData,true);
    }
    render (){
        return (
            <div className ="loginBox">
                <h2 className ="text-center">交流从这里开始！</h2>
                <div className ="login_top">
                    <div>注册</div>
                </div>
                <form  id="regForm"  encType="multipart/form-data"  onSubmit={this.submit}>
                    <div className ="inpTex">
                        <label htmlFor = "name" className ="fa fa-envelope-o labelText text-center"></label>
                        <input type="text" id="name" placeholder="用户名为1-10字符" ref="name" required/>
                    </div>
                    <div className="info">{this.props.errInfo.id == 1? this.props.errInfo.message:""}</div>
                    <div className ="inpTex">
                        <label htmlFor = "text" className ="fa fa-unlock-alt labelText text-center"></label>
                        <input type="password" id="text" placeholder="请输入至少6字符的密码" ref="password" required/>
                    </div>
                    <div className="info">{this.props.errInfo.id == 2? this.props.errInfo.message:""}</div>
                   {/* <div className ="inpTex">
                        <label htmlFor = "pss" className ="fa fa-user labelText text-center"></label>
                        <div className="File">
                            <p>上传头像</p>
                            <input type="file" id="pss" name="avatar" ref="avatar" required
                                   accept="image/*"
                                   multiple="multiple"
                            />
                        </div>
                    </div>
                    <div className="info"></div>*/}
                    <input type="submit" value="注册" id="regBtn"/>
                    <div className ="regText">
                        点击 “注册”，即表示您同意并愿意遵守 <a href="#1">用户协议</a> 和 <a href="#1">隐私政策</a>
                    </div>
                </form>
            </div>
        )
    }
}

//连接
export default connect(
    (state)=>({login:state.loginReg,errInfo:state.errorInfo}),
    actions
)(Register)