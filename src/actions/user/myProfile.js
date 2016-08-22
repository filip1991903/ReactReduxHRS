import { createAction } from 'redux-actions'
import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'

import {show_loading, hide_loading} from '../generic/frontend'

export const ACTION_SUCCESS_MY_PROFILE = "ACTION_SUCCESS_MY_PROFILE"
export const ACTION_EMPTY_MY_PROFILE = "ACTION_EMPTY_MY_PROFILE"
export const ACTION_ERROR_MY_PROFILE = "ACTION_ERROR_MY_PROFILE"

export function success_my_profile( data ){
	return createAction( ACTION_SUCCESS_MY_PROFILE )( data )
}
export function empty_my_profile( data ){
	return createAction( ACTION_EMPTY_MY_PROFILE )( data )
}
export function error_my_profile( data ){
	return createAction( ACTION_ERROR_MY_PROFILE )( data )
}

function async_getMyProfileDetails( ){
	return fireAjax( 'POST', '', {
		'action' : 'get_user_profile_detail'
	})
}

export function getMyProfileDetails(  ){

	return function (dispatch,getState){

		return new Promise(( reslove, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_getMyProfileDetails( ).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( success_my_profile( json.data ) )
		 			}else{
		 				dispatch( empty_my_profile( json.data.message ) )
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_my_profile( "error occurs!!!" ) )
				}
			)
			
		})

	}
    
}

//-------update profile details
export const ACTION_SUCCESS_UPDATE_PROFILE_DETAILS = "ACTION_SUCCESS_UPDATE_PROFILE_DETAILS"
export const ACTION_ERROR_UPDATE_PROFILE_DETAILS = "ACTION_ERROR_UPDATE_PROFILE_DETAILS"

export function success_update_profile_details( data ){
	return createAction( ACTION_SUCCESS_UPDATE_PROFILE_DETAILS )( data )
}
export function error_update_profile_details( data ){
	return createAction( ACTION_ERROR_UPDATE_PROFILE_DETAILS )( data )
}

function async_updateProfileDetails( n_marital_status, n_address1, n_address2, n_city, n_state, n_zip_postal, n_country, n_home_phone, n_mobile_phone, n_other_email){
	return fireAjax( 'POST', '', {
		'action' : 'update_user_profile_detail',
		'other_email' : n_other_email,
		'home_ph' : n_home_phone,
		'mobile_ph' : n_mobile_phone,
		'country' : n_country,
		'zip_postal' : n_zip_postal,
		'state' : n_state,
		'city' : n_city,
		'address2' : n_address2,
		'address1' : n_address1,
		'marital_status' : n_marital_status
	})
}

export function updateProfileDetails( new_profile_details  ){
	return function (dispatch,getState){

		let n_marital_status = ""
		let n_address1 = ""
		let n_address2 = ""
		let n_city = ""
		let n_state = ""
		let n_zip_postal = ""
		let n_country = ""
		let n_home_phone = ""
		let n_mobile_phone = ""
		let n_other_email = ""
		
		if( typeof new_profile_details.marital_status != 'undefined' ){ 
			n_marital_status = new_profile_details.marital_status
		}		
		if( typeof new_profile_details.address1 != 'undefined' ){ 
			n_address1 = new_profile_details.address1
		}
		if( typeof new_profile_details.address2 != 'undefined' ){ 
			n_address2 = new_profile_details.address2
		}
		if( typeof new_profile_details.city != 'undefined' ){ 
			n_city = new_profile_details.city
		}
		if( typeof new_profile_details.state != 'undefined' ){ 
			n_state = new_profile_details.state
		}
		if( typeof new_profile_details.zip_postal != 'undefined' ){ 
			n_zip_postal = new_profile_details.zip_postal
		}
		if( typeof new_profile_details.country != 'undefined' ){ 
			n_country = new_profile_details.country
		}
		if( typeof new_profile_details.home_ph != 'undefined' ){ 
			n_home_phone = new_profile_details.home_ph
		}
		if( typeof new_profile_details.mobile_ph != 'undefined' ){ 
			n_mobile_phone = new_profile_details.mobile_ph
		}
		if( typeof new_profile_details.other_email != 'undefined' ){ 
			n_other_email = new_profile_details.other_email
		}

		if( n_marital_status === "" ){ return Promise.reject('Marital status is empty') }
		if( n_address1 === "" ){ return Promise.reject('Address1 is empty') }
		if( n_address2 === "" ){ return Promise.reject('Address2 is empty') }
		if( n_city === "" ){ return Promise.reject('City is empty') }
		if( n_state === "" ){ return Promise.reject('State is empty') }
		if( n_zip_postal === "" ){ return Promise.reject('Zip Code is empty') }
		if( n_country === "" ){ return Promise.reject('Country is empty') }
		if( n_home_phone === "" ){ return Promise.reject('Home Phone number is empty') }
		if( n_mobile_phone === "" ){ return Promise.reject('Mobile number is empty') }
		if( n_other_email === "" ){ return Promise.reject('Other email is empty') }
		
		return new Promise(( reslove, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_updateProfileDetails( n_marital_status, n_address1, n_address2, n_city, n_state, n_zip_postal, n_country, n_home_phone, n_mobile_phone, n_other_email).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( getMyProfileDetails(  ) )
						dispatch( success_update_profile_details( json.data.message ) )
		 			}else{
		 				dispatch( error_update_profile_details( json.data.message ) )
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_update_profile_details( "error occurs!!!" ) )
				}
			)
		})
	}
}

//-------update bank details
export const ACTION_SUCCESS_UPDATE_BANK_DETAILS = "ACTION_SUCCESS_UPDATE_BANK_DETAILS"
export const ACTION_ERROR_UPDATE_BANK_DETAILS = "ACTION_ERROR_UPDATE_BANK_DETAILS"

export function success_update_bank_details( data ){
	return createAction( ACTION_SUCCESS_UPDATE_BANK_DETAILS )( data )
}
export function error_update_bank_details( data ){
	return createAction( ACTION_ERROR_UPDATE_BANK_DETAILS )( data )
}

function async_updateBankDetails( n_bank_account_no, n_bank_name, n_bank_address, n_ifsc ){
	return fireAjax( 'POST', '', {
		'action' : 'update_user_bank_detail',
		'bank_account_no' : n_bank_account_no,
		'bank_name' : n_bank_name,
		'bank_address' : n_bank_address,
		'ifsc' : n_ifsc
	})
}

export function updateBankDetails( new_bank_details  ){
	return function (dispatch,getState){
		let n_bank_name = ""
		let n_bank_address = ""
		let n_bank_account_no = ""
		let n_ifsc = ""

		if( typeof new_bank_details.bank_account_no != 'undefined' ){ 
			n_bank_account_no = new_bank_details.bank_account_no 
		}
		if( typeof new_bank_details.bank_name != 'undefined' ){ 
			n_bank_name = new_bank_details.bank_name 
		}
		if( typeof new_bank_details.bank_address != 'undefined' ){ 
			n_bank_address = new_bank_details.bank_address 
		}
		if( typeof new_bank_details.ifsc != 'undefined' ){ 
			n_ifsc = new_bank_details.ifsc 
		}
		if( n_bank_account_no === "" ){ return Promise.reject('Account number is empty') }
		if( n_bank_name === "" ){ return Promise.reject('Bank name is empty') }
		if( n_bank_address === "" ){ return Promise.reject('Bank address is empty') }
		if( n_ifsc === "" ){ return Promise.reject('IFSC is empty') }
		return new Promise(( reslove, reject ) => {
			dispatch( show_loading() ); // show loading icon
			async_updateBankDetails(  n_bank_account_no, n_bank_name, n_bank_address, n_ifsc).then(
				( json ) => {
					dispatch( hide_loading() ) // hide loading icon
					if( json.error == 0 ){
						dispatch( getMyProfileDetails(  ) )
						dispatch( success_update_bank_details( json.data.message ) )
		 			}else{
		 				dispatch( error_update_bank_details( json.data.message ) )
		 			}
				},
				( error ) => {
					dispatch( hide_loading() ) // hide loading icon
					dispatch( error_update_bank_details( "error occurs!!!" ) )
				}
			)
		})
	}
}