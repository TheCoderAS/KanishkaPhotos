import {combineReducers} from 'redux'

import user from './user'
import dishes from './dishes'

export const  reducers=combineReducers({user,dishes})