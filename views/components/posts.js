/**
 * Created by scmhzl on 2017/1/8.
 */
/**
 * Created by scmhzl on 2016/12/29.
 */

import React ,{ PropTypes } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../routes/react/action/index.js'
import Article from "./article"
class Posts extends React.Component {
    constructor(props){
        super(props)
    }
    componentWillMount(){
        this.props.getContent("posts/getOneArticle/"+this.props.params.id,"get",false,{})
    }
    render (){
        return(
            this.props.Posts.length ? (
                this.props.Posts[0].comments ? (
                    <div className="viewDiv">
                        <h3 className ="text-center">查看文章</h3>
                        <hr/>
                        <Article data={this.props.Posts[0]}/>
                    </div>
                    ):(
                        <div></div>
                    )
                ):(
                   <div></div>
                )
        )
    }
}


export default connect(
    (state)=>({Posts:state.getContent}),
    actions
)(Posts)