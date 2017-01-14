/**
 * Created by scmhzl on 2017/1/3.
 */
import {combineReducers} from 'redux'

import loginReg from "./login";
import errorInfo from "./error"
import getData from "./getContent"
const rootReducer=combineReducers({
    loginReg:loginReg,
    errorInfo:errorInfo,
    getContent:getData
})
export default rootReducer