/**
 * Created by scmhzl on 2017/1/3.
 */
import {createStore} from 'redux'
import reducer from "../reducer/index.js"

export const store = createStore(reducer)