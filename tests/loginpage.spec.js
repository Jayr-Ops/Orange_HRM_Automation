const { AppConstant } = require('../constants/AppConstant')
const {test,expect} = require('../fixtures/baseFixtures')
require('../hooks/hooks')
const {Jsonreader} = require('../utils/JsonReader')
const login_data = Jsonreader.login_details()

test.describe('loginPage',()=>{

    test('Verify login page loads successfully', {tag: '@smoke'} , async({loginpage1,page})=>{
        await loginpage1.isLoginPageDisplayed()
    })
    test('Login with valid Admin credentials',{tag: '@smoke'},async({loginpage1})=>{
        await loginpage1.login(login_data.Valid_Credentials.Username,login_data.Valid_Credentials.Password)
        await loginpage1.isDashboardDisplayed()
    })

    test('Login with invalid username and valid password',{tag: ['@smoke', '@regression']},async({loginpage1})=>{
        await loginpage1.enterUsername(login_data.Invalid_Credentials.Username)
        await loginpage1.enterPassword(login_data.Valid_Credentials.Password)
        await loginpage1.click_login()
        await loginpage1.getLoginErrorMessage()
    })

    test('Login with valid username and invalid password',{tag: ['@smoke','@regression']}, async({loginpage1})=>{
        await loginpage1.enterUsername(login_data.Valid_Credentials.Username)
        await loginpage1.enterPassword(login_data.Invalid_Credentials.Password)
        await loginpage1.click_login()
        await loginpage1.getLoginErrorMessage()
    })
    test('Login with both username and password blank',{tag: ['@smoke','@regression']},async({loginpage1})=>{
        await loginpage1.enterUsername('')
        await loginpage1.enterPassword('')
        await loginpage1.click_login()
        await loginpage1.getUsernameRequiredMessage()
        await loginpage1.getPasswordRequiredMessage()
    })
    test('Login with username blank and password populated',{tag: ['@smoke','@regression']},async({loginpage1})=>{
        await loginpage1.enterUsername('')
        await loginpage1.enterPassword(login_data.Valid_Credentials.Password)
        await loginpage1.click_login()
        await loginpage1.getUsernameRequiredMessage()
    })
    test('Login with username populated and password blank',{tag: ['@smoke','@regression']},async({loginpage1})=>{
        await loginpage1.enterUsername(login_data.Valid_Credentials.Username)
        await loginpage1.enterPassword('')
        await loginpage1.click_login()
        await loginpage1.getUsernameRequiredMessage()
    })
    test('Verify password field masks entered text',{tag: ['@smoke','@regression']},async({loginpage1})=>{
        await loginpage1.enterUsername(login_data.Valid_Credentials.Username)
        await loginpage1.enterPassword(login_data.Valid_Credentials.Password)
        await loginpage1.isPasswordMasked()
    })
    test('Verify pressing Enter submits login',{tag: ['@smoke','@regression']},async({loginpage1})=>{
        await loginpage1.enterUsername(login_data.Valid_Credentials.Username)
        await loginpage1.enterPassword(login_data.Valid_Credentials.Password)
        await loginpage1.press_enter_key()
        await loginpage1.isDashboardDisplayed()
    })
    test('Verify login page remains stable after repeated failed attempts',{tag: ['@smoke','@regression']},async({loginpage1,page})=>{
        for(let attempt=1; attempt <= AppConstant.FAILED_ATTEMPTS; attempt++){
            await loginpage1.login(login_data.Invalid_Credentials.Username,login_data.Invalid_Credentials.Password)
            await expect(loginpage1.error_message_element).toHaveText(AppConstant.INVALID_CREDENTIALS_MESSAGE)
            await loginpage1.isLoginPageDisplayed()
        }
    })
})