import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as _ from 'lodash'
import {notify} from '../../services/index'

import VisibleHeader from '../../containers/generic/header'
import VisibleMenu from '../../containers/generic/menu'

import * as actions_login from '../../actions/login/index'

import VisibleLoadingIcon from '../../containers/generic/loadingIcon'
import VisibleUserMonthlyAttendance from '../../components/attendance/userMonthlyAttendance'

class MonthlyAttendance extends React.Component {
    constructor( props ){
        super( props );
    }
    componentWillMount(){
        if( this.props.onIsAlreadyLogin() == false ){
          this.props.router.push('/');
        }else{
        }

        let user_id =  this.props.logged_user.userid;
        let d = new Date();
        let year = d.getFullYear()
        let month = d.getMonth() + 1  // +1 since getMonth starts from 0
        this.props.onMonthAttendance( user_id, year, month )
    }
  


    render(){
        return(
        	<div >
				<VisibleMenu/>

        

  				<div id="content" className="app-content box-shadow-z0" role="main">
    				<div className="app-header white box-shadow">
						<div className="navbar">
    						<a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
      							<i className="material-icons">&#xe5d2;</i>
    						</a>
    						<div className="navbar-item pull-left h5" ng-bind="$state.current.data.title" id="pageTitle"> My Calendar</div>
						</div>
    				</div>
					<div className="app-footer" ng-class="{'hide': $state.current.data.hideFooter}">
  						<div ui-include="'../views/blocks/footer.html'"></div>
					</div>
    				<div ui-view className="app-body" id="view">

            <div className="row"><div className="col-12"><VisibleLoadingIcon/></div></div>


              <div className="padding">
                  <VisibleUserMonthlyAttendance {...this.props} />
                  </div>

              </div>

          </div>

    </div>

        )
    }
}


MonthlyAttendance.styles = {
  height100per: {
    'minHeight' : '150px'
  }
};

function mapStateToProps( state ){
	return {
        frontend : state.frontend.toJS(),
        logged_user : state.logged_user.toJS(),
        monthlyAttendance : state.monthlyAttendance.toJS(),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onMonthAttendance : ( userid, year, month ) => {
            return dispatch( actions_monthlyAttendance.get_monthly_attendance( userid, year, month ))
        },
        onIsAlreadyLogin : () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        }
    }
}

const VisibleMonthlyAttendance = connect(
  mapStateToProps,
  mapDispatchToProps
)( MonthlyAttendance )

const RouterVisibleMonthlyAttendance = withRouter( VisibleMonthlyAttendance )

export default RouterVisibleMonthlyAttendance