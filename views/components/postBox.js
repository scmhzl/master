/**
 * Created by scmhzl on 2016/12/29.
 */
import React ,{ Component } from 'react';
import {connect} from 'react-redux'
import * as actions from '../../routes/react/action/index.js'
class postBox extends React.Component {
    constructor(props){
        super(props);
        this.submit = this.submit.bind(this)
        this.delArticle = this.delArticle.bind(this)
    }
    componentWillMount(){
        this.props.getContent("posts/getRawArticle/"+this.props.params.id,"get",false,{})
    }
    componentDidUpdate(){//更新框里面的数据
        if(this.props.params.id !== "write"){
            this.refs.title.value = this.props.article[0].title,
            this.refs.content.value = this.props.article[0].content
        }
    }
    delArticle(e){
        e.stopPropagation();
        this.props.getContent("posts/delArticle/"+this.props.params.id,"post",true,{})
    }
    submit(e){
        e.preventDefault();
        var data = {
            title:this.refs.title.value,
            content:this.refs.content.value
        }
        if(this.props.params.id === "write"){
            this.props.getContent("posts/writeArticle","post",true,data)
        }else{
            this.props.getContent("posts/upDataArticle/"+this.props.params.id ,"post",true,data)
        }
    }
    render (){
        var bool = (this.props.params.id === "write") ? true : false;
        return (
          <div className="textareaContent">
             <h2 className="text-center">{bool ? "写文章" :"修改文章"}</h2>
             <form className="Content" onSubmit={this.submit}>
                 <div className="editorCon">
                     <input type="text" placeholder="请输入标题" ref="title" required />
                     <div>
                         <input type="submit"  value={bool ? "发布文章" :"确认修改"}/>
                         {bool ? "": <input type="button" value="删除该文章" onClick = {e => this.delArticle(e)}/>}
                     </div>
                 </div>
                 <textarea name="content" placeholder="请输入内容" ref="content" required></textarea>
             </form>
          </div>
        )
    }
}

export default connect(
    (state)=>({article:state.getContent}),
    actions
)(postBox)