/**
 * Created by scmhzl on 2017/1/3.
 */
import $ from 'jquery';
import {hashHistory} from 'react-router'
// import fetch from 'isomorphic-fetch';

//登录注册 退出
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const ERROR = "ERROR";
export const LOGIN_OUT = "LOGIN_OUT";
export function action_login(url,userData,turn) {
    return dispatch => {
        $.ajax({
            url:"http://localhost/"+url,
            type:"post",
            //cache: false, //设置为 false 将不会从浏览器缓存中加载请求信息
            data:userData,
            dataType:"json",
            xhrFields: {//跨越
                withCredentials: true
            },
            success:function (res) {
                if(res.state === 100){//登录或注册成功
                    dispatch({type:LOGIN_REQUEST,user:res.user});
                    if(turn){
                        hashHistory.push("/");
                    }
                }
                if(res.state === 101){//用户名有问题
                    dispatch({type:ERROR,message:{message:res.message,id:1}})
                }
                if(res.state === 104){//用户名有问题
                    dispatch({type:ERROR,message:{message:res.message,id:4}})
                }
                if(res.state === 102){//密码有问题
                    dispatch({type:ERROR,message:{message:res.message,id:2}})
                }
                if(res.state === 103){//其他问题
                    alert(res.message);
                }
                if(res.state === 200){
                    dispatch({type:LOGIN_OUT});
                    if(turn){
                        hashHistory.push("/");
                    }
                }
            },
            error:function () {
                console.log("登陆有问题")
            }
        });
        /*  return fetch(`http://localhost/${userData.url}`,{
         method: 'post',
         headers: {
         "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
         },
         body: users
         //credentials: 'include'//附带cookie
         })
         .then(response => {
         response.json();
         console.log(response)
         })
         .then(json => {
         dispatch(login_receive(userData,json));
         console.log(json);
         })
         .catch(error =>{
         console.log(34343244345)
         console.log(error);
         })*/
    }
}

//获取相关内容
export const GET_CONTENT_START = "GET_CONTENT_START";
export const GET_CONTENT_SUCCESS = "GET_CONTENT_SUCCESS";
export const GET_CONTENT_ONLYONE_TRUE= "GET_CONTENT_ONLYONE_TRUE";
export const GET_CONTENT_ONLYONE_FALSE= "GET_CONTENT_ONLYONE_FALSE";
export function getContent(url,type,turn,data) {
    return dispatch =>{
        dispatch({type:GET_CONTENT_START})
        $.ajax({
            type:type,
            url:"http://localhost/"+url,
            data:data,
            xhrFields:{
                withCredentials:true
            },
            dataType:"json",
            success:function (res) {
                if(res.data){
                    dispatch({type:GET_CONTENT_SUCCESS,data:res.data})
                }
                if(res.state === 100){//发布内容成功
                    dispatch({type:GET_CONTENT_ONLYONE_FALSE})
                    if(turn){
                        hashHistory.push("/");
                    }
                }
                if(res.state === 200){//单独获取一篇文章 成功   //删除评论成功
                    dispatch({type:GET_CONTENT_ONLYONE_TRUE})
                }
                if(res.state === 101){//发布失败
                    alert(res.message);
                }
                if(res.state === 300){//点赞
                    if(turn){
                        hashHistory.push("/");
                    }
                    alert(res.message)
                }
            },
            error:function (res) {
                console.log("获取内容有问题")
            }
        });
    }
}


