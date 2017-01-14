/**
 * Created by scmhzl on 2016/12/29.
 */
import React ,{ PropTypes } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../routes/react/action/index.js'
class Comments extends React.Component {
    constructor(props){
        super(props)
        this.delComment = this.delComment.bind(this)
    }
   delComment(e){
        e.stopPropagation();
        this.props.getContent("comments/delComment/"+this.props.data.postId+"/"+this.props.data._id+"/"+this.props.data.author._id,"post",false)
    }
    render (){
        var bool;
        this.props.login.isLogin ?　(
                (this.props.login.user.name === this.props.author.name && this.props.login.user._id 　=== this.props.author._id) ? (　bool = true　):(　bool = false)
            ):(　bool = false)
        return(
                <div className="commentAuthor">
                    <div>
                        {/*author*/}
                        <div>
                            <b>{this.props.data.author.name}</b>
                            <i>{this.props.data.created_at}</i>
                        </div>
                        {
                            bool ? <a href="javascript:" onClick={e=>(this.delComment(e))}>删除该条评论</a>:""
                        }

                    </div>
                    {/*content*/}
                    <p dangerouslySetInnerHTML={{__html:this.props.data.content}}></p>
                </div>
            )
    }
}


export default connect(
    (state)=>({login:state.loginReg,}),
    actions
)(Comments)