const { expect } = require('@playwright/test')
const { AppConstant } = require('../constants/AppConstant')
const { CommanMethod } = require('../utils/CommanMethod')
const { Jsonreader } = require('../utils/JsonReader')
exports.PIM = class PIM{
    constructor(page){
        this.page=page
        this.PIMModule = page.locator('.oxd-main-menu').getByText('PIM')
        this.wait = page.waitForTimeout(5 * 1000)
        this.EmployeeList = page.getByRole('navigation',{name:'Topbar Menu'}).getByText('Employee List')
        this.EmployeeListHeading = page.getByRole('heading',{name:'Employee Information'})
        this.EmployeeNameInput = page.getByPlaceholder('Type for hints...').nth(0)
        this.searchButton = page.getByRole('button',{name:'Search'})
        this.resetButton = page.getByRole('button',{name:'Reset'})
    }

    async openPIMModule(){
        await CommanMethod.click_element(this.PIMModule)
        await expect(this.PIMModule).toBeVisible()
        await this.wait
        return console.log('PIM Module Launched..')
    }

    async openEmployeeList(){
        await CommanMethod.click_element(this.EmployeeList)
        await this.wait
        return console.log('EmployeeList Opened..')
    }

    async isEmployeeListDisplayed(){
        expect(this.EmployeeListHeading).toBeVisible()
        expect(this.EmployeeNameInput).toBeVisible()
        expect(this.searchButton).toBeVisible()
        expect(this.resetButton).toBeVisible()
    }

}