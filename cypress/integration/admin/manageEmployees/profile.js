import {urls, user, click, shouldBeVisible} from '../../../index';
import {signin} from '../../../helper';
import {urlVisited} from '../../../visitRoutes';

describe('Test profile page', () => {
  it('employees list is loaded on left side panel', () => {
    signin(user.admin);
    cy.wait(4000);
    urlVisited(urls.baseUrl + urls.home);
    shouldBeVisible('.nav > #manage_users a');
    click('.nav > #manage_users');
    shouldBeVisible('.nav-sub > #manage_users a');
    click('.nav-sub  #manage_users a');
    urlVisited(urls.baseUrl + urls.manageUsers);
    shouldBeVisible('.app-body');
    shouldBeVisible('.app-body .padding');
    shouldBeVisible(' #userList');
  });
  it('first employee profile details are shown on right panel', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.wait(3000);
    shouldBeVisible('.nav > #manage_users');
    click('.nav > #manage_users');
    shouldBeVisible('.nav-sub #manage_users');
    click('.nav-sub #manage_users');
    urlVisited(urls.baseUrl + urls.manageUsers);
    shouldBeVisible('.app-body');
    shouldBeVisible('.app-body .padding');
    shouldBeVisible(' #manage-user');
  });
  xit('add new employee form opens when click on Add New Employee button', () => {

  });
});
