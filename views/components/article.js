/**
 * Created by scmhzl on 2016/12/29.
 */
import React ,{ PropTypes } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import  Comments  from "./comment"
import * as actions from '../../routes/react/action/index.js'
class Article extends React.Component {
    constructor(props){
        super(props)
        this.submit = this.submit.bind(this)
        this.like = this.like.bind(this)
    }

    like(e){
        this.props.getContent("posts/like/"+this.props.data._id+"/"+(this.props.login.only ? 1 :0),"post",false,{})
    }
    submit(e){
        e.preventDefault();
        var data = {
            content:this.refs.commentContent.value
        };
        this.props.getContent("comments/addComment/"+this.props.data._id,"post",false,data)
        this.refs.commentContent.value=""
    }
    render (){
        var bool;
       this.props.login.isLogin ?　(
               (this.props.login.user.name === this.props.data.author.name && this.props.login.user._id 　=== this.props.data.author._id) ? (　bool = true　):(　bool = false)
           ):(　bool = false)
        return (
                <div className ="article_box scrollColor">
                    <div className ="article_author">
                        <img src="public/img/team1.jpg" className="authorImgRight" />
                        <div className ="article_authorInfo">
                            <span className ="article_authorA">作者</span>
                            <span className ="article_authorName">{this.props.data.author.name}</span>
                            <span className ="article_time">{this.props.data.created_at}</span>
                        </div>
                    </div>
                    {this.props.login.only ? (
                            <div>
                                <b  dangerouslySetInnerHTML = {{__html:this.props.data.title}} className="ArticleTitle text-center"></b>
                                <div dangerouslySetInnerHTML = {{__html:this.props.data.content}} className="articleMain"></div>
                                {this.props.data.comments? (this.props.data.comments.length>0 ? <hr/>: ""):""}
                                {this.props.data.comments?
                                    this.props.data.comments.map(function (item,i) {
                                        return  <Comments data={item} author={this.props.data.author} key={this.props.data._id+i} />
                                    }.bind(this)):""
                                }
                                {this.props.data.comments? (this.props.data.comments.length>0 ? <hr/>: ""):""}
                                {this.props.login.isLogin ? <form className="commentBox" onSubmit={this.submit}>
                                        <textarea ref="commentContent" rows="8" required="required"></textarea>
                                        <input type="submit" value="发送评论"/>
                                    </form>:""}
                            </div>
                        ): <Link to={ "/right/posts/"+this.props.data._id }>
                            <b  dangerouslySetInnerHTML = {{__html:this.props.data.title}} className="ArticleTitle title"></b>
                        </Link>
                    }
                    <div className ="article_ctr">
                        <ul>
                            { bool ? (this.props.login.only ? "": <li><Link to={"/right/comment/"+this.props.data._id }>编辑</Link></li>):""}
                            {this.props.login.isLogin ? (this.props.login.only ? "":<li><a>评论{this.props.data.commentsCount}</a><b></b></li>) :""}

                            <li><a>浏览 <b>{this.props.data.pv}</b></a></li>
                            {this.props.login.isLogin ?<li><a href="javascript:" onClick={e =>this.like(e)}>喜欢 <b></b>{this.props.data.like.length}</a></li> :""}
                        </ul>
                    </div>
                </div>
        )
    }
}


export default connect(
    (state)=>({login:state.loginReg,}),
    actions
)(Article)