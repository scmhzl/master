/**
 * Created by scmhzl on 2017/1/4.
 */
import { LOGIN_REQUEST,LOGIN_OUT,GET_CONTENT_ONLYONE_FALSE,GET_CONTENT_ONLYONE_TRUE} from "../action/index";
export default function loginReg(
    state = {
        only:false,
        isLogin:false,
    },action ){
    switch (action.type){
        case LOGIN_REQUEST:
            return  Object.assign({}, state, {
                isLogin: true,//重创一个副本，第一参数为空，不然会变成参数
                user:action.user
        });
        case LOGIN_OUT:
            return  Object.assign({}, state, {
                isLogin: false,//重创一个副本，第一参数为空，不然会变成参数
            });
        case GET_CONTENT_ONLYONE_TRUE:
            return  Object.assign({}, state, {
                only:true,
            });
        case GET_CONTENT_ONLYONE_FALSE:
            return  Object.assign({}, state, {
                only:false,
            });
        default:
            return state;
    }
}