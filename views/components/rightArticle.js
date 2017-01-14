/**
 * Created by scmhzl on 2016/12/29.
 */
import React ,{ PropTypes } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../routes/react/action/index.js'
import Article from "./article"
class RightArticle extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.getContent("posts/getAllArticle","get",false,{})
    }
    render (){
        return (
            <div className="div">
                <h3 className ="text-center">最新文章</h3>
                <hr/>
                <div className="upData scrollColor">
                    {
                        this.props.Posts.length ? this.props.Posts.map(function (post,item) {
                                return <Article data={post} key={item}/>}):""
                    }
                </div>
           </div>
        )
    }
}

export default connect(
    (state)=>({Posts:state.getContent,login:state.loginReg}),
    actions
)(RightArticle)