/**
 * Created by scmhzl on 2017/1/7.
 */
import { GET_CONTENT_SUCCESS,GET_CONTENT_START} from "../action/index";
export default function getData(state=[],action ){
    var newState=state;
    switch (action.type){
        case GET_CONTENT_START:
            return newState
        case GET_CONTENT_SUCCESS:
            return  action.data
        default:
            return state;
    }
}