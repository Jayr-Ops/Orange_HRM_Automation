const { expect } = require('@playwright/test')
const { AppConstant } = require('../constants/AppConstant')
const { CommanMethod } = require('../utils/CommanMethod')
const { Jsonreader } = require('../utils/JsonReader')

exports.dashboard = class dashboard{
    constructor(page){
        this.page=page
        this.dashboardHeader = page.getByRole('heading',{name: 'Dashboard'})
        this.sideMenu = page.locator('.oxd-sidepanel')
        this.widgets = page.locator('.orangehrm-dashboard-widget').nth(0)
        this.sideMenuItems = page.locator('.oxd-main-menu-item')
        this.adminModule = page.getByRole('link',{name:'Admin'})
        this.adminHeading = page.getByRole('heading',{name:'Admin'})
        this.PIMModule = page.getByRole('link',{name:'PIM'})
        this.PIMHeading = page.getByRole('heading',{name:'PIM'})
        this.LeaveModule = page.getByRole('link',{name:'Leave'})
        this.LeaveHeading = page.getByRole('heading',{name:'Leave', exact:true})
        this.userMenu= page.locator('.oxd-userdropdown')
        this.logout= page.getByRole('menuitem',{name:'Logout'})
        this.wait = page.waitForTimeout(2000)
    }

    async isDashboardDisplayed(){
        await expect(this.dashboardHeader).toBeVisible()
        await expect(this.sideMenu).toBeVisible()
        await expect(this.widgets).toBeVisible()
    }

    async getDashboardHeader(){
        return await this.dashboardHeader.textContent()
    }

    async getVisibleMenuItems(){
            return await this.sideMenuItems.allTextContents()
    }
    async isSideMenuDisplayed(){
        await expect(this.sideMenu).toBeVisible()
    }

    async openAdminModule(){
        await this.wait
        await CommanMethod.click_element(this.adminModule)
        await this.wait
    }

    async  isAdminPageDisplayed(){
        await expect(this.adminHeading).toBeVisible()
        console.log("Admin page loaded")
    }

    async openPIMModule(){
         await CommanMethod.click_element(this.PIMModule)
    }

    async isPIMPageDisplayed(){
        await expect(this.PIMHeading).toBeVisible()
        console.log("PIM page loaded")
    }

    async openLeaveModule(){
         await CommanMethod.click_element(this.LeaveModule)
    }

    async isLeavePageDisplayed(){
        await expect(this.LeaveHeading).toBeVisible()
        console.log("Leave page loaded")
    }

    async openUserMenu(){
        await CommanMethod.click_element(this.userMenu)
        console.log("UserMenu opened")
    }

    async clickLogout(){
        await CommanMethod.click_element(this.logout)
        console.log("User Logged out successfully")
    }

}