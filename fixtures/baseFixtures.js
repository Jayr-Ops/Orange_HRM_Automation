const {test: base,expect} = require('@playwright/test')
const { loginpage } = require('../Page/loginpage')
const { dashboard } = require('../Page/dashboard')
const { admin } = require('../Page/admin')
const { AppConstant } = require('../constants/AppConstant')
const { PIM } = require('../Page/PIM')
exports.test = base.test.extend({
    loginpage1: async ({page}, use) => {
        const loginpage1 = new loginpage(page)
        await use(loginpage1)
    },
    dashboard1: async({page},use) => {
        const dashboard1 = new dashboard(page)
        await use(dashboard1)
    },
    admin1: async({page},use) => {
        const admin1 = new admin(page)
        await use(admin1)
    },
    loginpage2: async ({page}, use) => {
        const loginpage2 = new loginpage(page)
        await loginpage2.login(AppConstant.Username,AppConstant.Password)
        await loginpage2.isDashboardDisplayed()
        await page.waitForTimeout(2000)
        await use(loginpage2)
    },
    PIM2: async({page},use) => {
        const PIM2 = new PIM(page)
        await use(PIM2)
    }
})
exports.expect = expect;