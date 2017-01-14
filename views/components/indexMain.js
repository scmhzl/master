/**
 * Created by scmhzl on 2016/12/29.
 */
import React ,{ Component } from 'react';
import { Link} from 'react-router';
import {connect} from 'react-redux'
import * as actions from '../../routes/react/action/index.js'

class IndexMain extends Component{
    constructor(props){
        super(props);
        this.SignOut = this.SignOut.bind(this)
    }
    componentWillMount(){//进入状态之前调用
        this.props.action_login("sign/autoLogin",{},false)
    }
    SignOut(e){
        e.preventDefault();
        this.props.action_login("sign/out",{},false)
    }
    render (){
        var len = this.props.data.length,
            commentsCount = 0,
            like = 0
        for(var i=0;i<len;i++){
            commentsCount+=this.props.data[i].commentsCount
            like+=this.props.data[i].like.length
        }
        return (
            <div className="ContentMain">
                {this.props.login.isLogin ? (
                        <div className="topNav">
                            <span className="welcome">欢迎您&nbsp;{this.props.login.user.name}</span><a href="javascript:" onClick={e =>this.SignOut(e)}><i className ="fa fa-sign-out">退出</i></a>
                        </div>
                    ):(
                        <div className="topNav">
                            <sapn className="welcome">欢迎您,游客</sapn><Link to="/right/register"><i className ="fa fa-user"></i>注册</Link>
                        </div>)
                }
                <div className="mainBox">
                    <div className="leftContent">
                        { !this.props.login.isLogin ?(
                                <div className ="pre_author">
                                    <div className ="pre_login">
                                        <div className ="go">从这里开始</div>
                                        <div className ="to">--基于分享</div>
                                        <button className ="button"><Link to="/right/login">写博客</Link></button>
                                    </div>
                                </div>
                            ):(
                                <div className ="text-center loginAuthor">
                                    <img src="public/img/team1.jpg" className ="authorImg" />
                                    <h3 className ="author_name">{this.props.login.user.name}</h3>
                                    <div className ="author_content">
                                        <a href="javascript:void(0)"><b>{this.props.data.length}</b><span>文章</span></a>
                                        <a href="javascript:void(0)"><b>{commentsCount}</b><span>评论</span></a>
                                        <a href="javascript:void(0)"><b>{like}</b><span>点赞</span></a>
                                    </div>
                                    <div className ="articleS">
                                        <Link to={"/right/comment/write"}>发表文章</Link>
                                    </div>
                                </div>
                            )}
                    </div>
                    <div className="rightContent">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    (state)=>({login:state.loginReg,data:state.getContent}),
    actions
)(IndexMain)