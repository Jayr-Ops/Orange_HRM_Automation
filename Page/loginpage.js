const { expect } = require('@playwright/test')
const { AppConstant } = require('../constants/AppConstant')
const { CommanMethod } = require('../utils/CommanMethod')
const { Jsonreader } = require('../utils/JsonReader')
const login_data = Jsonreader.login_details()
exports.loginpage = class loginpage{
    constructor(page){
        this.page=page;
        this.Loginpage_heading=page.getByRole('Heading',{name:'Login'})
        this.username_input=page.getByPlaceholder('Username')
        this.password_input=page.getByPlaceholder('Password')
        this.login_button=page.getByRole('button',{name:' Login '})
        this.error_message_element=page.getByText('Invalid credentials')
        this.username_required_message=page.getByText('Required').nth(0)
        this.password_required_message=page.getByText('Required').nth(1)
        this.Dashboard_heading=page.getByRole('heading', { name: 'Dashboard' })
    }

    async isLoginPageDisplayed(){
        await expect(this.Loginpage_heading).toBeVisible()
        await expect(this.username_input).toBeVisible()
        await expect(this.password_input).toBeVisible()
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        console.log('Login page is visible and stable')
    }
    async login(username,password){
        await CommanMethod.textbox_fill(this.username_input,username)
        await CommanMethod.textbox_fill(this.password_input,password)
        await CommanMethod.click_element(this.login_button)
        console.log('Logged in to Admin Successfully')
    }
    async isDashboardDisplayed(){
        await expect(this.page).toHaveURL(AppConstant.DASHBOARD)
        console.log('Dashboard Launched')
    }
    async enterUsername(username){
        await CommanMethod.textbox_fill(this.username_input,username)
    }
    async enterPassword(password){
        await CommanMethod.textbox_fill(this.password_input,password)
    }
    async click_login(){
        await CommanMethod.click_element(this.login_button)
    }
    async getLoginErrorMessage(){
        await expect(this.error_message_element).toBeVisible()
        console.log(await this.error_message_element.innerText())
    }
    async getPasswordRequiredMessage(){
        await expect(this.password_required_message).toBeVisible()
        console.log(await this.password_required_message.innerText())
    }
    async getUsernameRequiredMessage(){
        await expect(this.username_required_message).toBeVisible()
        console.log(await this.username_required_message.innerText())
    }
    async isPasswordMasked(){
        if (expect(this.password_input).toHaveAttribute('type','password')){
            console.log('Password is masked')
        }
        else{
            console.log('Password is not masked')
        }
    }
    async press_enter_key(){
        await this.password_input.press('Enter')
    }
}