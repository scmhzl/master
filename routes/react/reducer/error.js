/**
 * Created by scmhzl on 2017/1/6.
 */
import { ERROR } from "../action/index";
export default function errorInfo(state = "",action ){
    switch (action.type){
        case ERROR:
            return  action.message
        default:
            return state;
    }
}