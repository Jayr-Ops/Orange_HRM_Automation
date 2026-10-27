const { expect } = require('@playwright/test');
const { AppConstant } = require('../constants/AppConstant');
const { CommanMethod } = require('../utils/CommanMethod');
const { Jsonreader } = require('../utils/JsonReader');
const userDetails = Jsonreader.User_Details()
exports.admin = class admin{
    constructor(page){
        this.page=page
        this.UserManagement = page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management')
        this.Users = page.getByRole('menuitem',{name:'Users'})
        this.UserManagementHeading = page.getByRole('heading',{name:'User Management'})
        this.UserNameinput = page.locator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/input');
        this.SearchButton = page.getByRole('button',{name:'Search'})
        this.userSearchTable = page.locator('.oxd-table')
        this.user_rows = page.locator('.oxd-table-body .oxd-table-row')
        this.TosterMessage = page.locator('#oxd-toaster_1')
        this.Resetbutton = page.getByRole('button',{name:'Reset'})
        this.employeeNameInput = page.getByPlaceholder('Type for hints...')
        this.userRoleDropdown  = page.locator('.oxd-form-row .oxd-select-text').nth(0)
        this.statusDropdown = page.locator('.oxd-form-row .oxd-select-text').nth(1)
        this.AddUserButton = page.getByRole('button',{name:'Add'})
        this.AddUserHeading = page.getByRole('heading',{name:'Add User'})
        this.AddUser_UserRole = page.getByText('-- Select --').nth(0)
        this.AddUserUsernameInput = page.locator('input[autocomplete="off"]').nth(0)
        this.AddUserPasswordInput = page.locator('input[type="password"]').nth(0)
        this.AddUserConfirmPasswordInput = page.locator('input[type="password"]').nth(1)
        this.AddUserSaveButton = page.getByRole('button',{name:'Save'})
        this.requiredMessages = page.locator('.oxd-input-group__message')
        this.AddUser_CancleButton = page.getByRole('button',{name:'Cancel'})
        this.AdminConfigurationTab = page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Configuration')
        this.ConfigurationDropdown = page.locator('.oxd-dropdown-menu').getByRole('menuitem')
    }
    async openUserManagement(){
        await CommanMethod.click_element(this.UserManagement)
        await CommanMethod.click_element(this.Users)
    }

    async isUserManagementPageDisplayed(){
        await expect(this.UserManagementHeading).toBeVisible()
        console.log('User Management Page Loaded')
    }
    async searchUser(username){
        await CommanMethod.textbox_fill(this.UserNameinput,username)
        await CommanMethod.click_element(this.SearchButton)
    }
    async isUserSearchResultDisplayed(){
        await expect(this.userSearchTable).toBeVisible()
        await expect(this.user_rows.first()).toBeVisible()
        console.log('User Found')
    }
    async isNoUserResultDisplayed(){
        await expect(this.user_rows).not.toBeVisible()
        await expect(this.TosterMessage).toBeVisible()
        await expect(this.TosterMessage).toContainText('No Records Found')
        console.log('User Not Found')
    }
    async resetUserSearchFilters(){
        await CommanMethod.click_element(this.Resetbutton)
    }

    async areUserSearchFiltersCleared(){
        await expect(this.UserNameinput).toHaveValue('')
        await expect(this.employeeNameInput).toHaveValue('')
        await expect(this.userRoleDropdown).toContainText('-- Select --')
        await expect(this.statusDropdown).toContainText('-- Select --')
        console.log('Search Filter are reset now')
    }

    async clickAddUser(){
        await CommanMethod.click_element(this.AddUserButton)
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/saveSystemUser')
        console.log('Add User page launched')
    }

    async isAddUserFormDisplayed(){
        await expect(this.AddUserHeading).toBeVisible()
        await expect(this.AddUser_UserRole).toBeVisible()
        await expect(this.AddUserUsernameInput).toBeVisible()
        await expect(this.AddUserPasswordInput).toBeVisible()
        await expect(this.AddUserConfirmPasswordInput).toBeVisible()
        console.log('Add User form is visible')
    }

    async clickSaveUser(){
        await CommanMethod.click_element(this.AddUserSaveButton)
        console.log('clicked on Save Button')
    }

    async getRequiredFieldMessages(){
        return await this.requiredMessages.allTextContents()
    }

    async clickCancelAddUser(){
        await CommanMethod.click_element(this.AddUser_CancleButton)
        console.log('Clicked on Cancle Button')
    }

    async openConfigurationMenu(){
        await CommanMethod.click_element(this.AdminConfigurationTab)
    }
    async getConfigurationOptions(){
        return await this.ConfigurationDropdown.allTextContents()
    }
}
