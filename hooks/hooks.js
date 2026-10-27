const {AppConstant} = require('../constants/AppConstant')
const { ScreenshotHelper } = require('../utils/ScreenshotHelper')
const {test, expect} = require('@playwright/test')

test.beforeAll(async()=>{
    console.log('======================')
    console.log('Test Execution started')
    console.log('======================')
})

test.beforeEach(async ({page}, testInfo)=>{
    console.log('Opening Application..')
    console.log('executing =>',testInfo.title)
    await page.goto(AppConstant.BASE_URL)
})

test.afterEach(async ({page}, testInfo)=>{
    if (testInfo.status !== testInfo.expectedStatus){
        await ScreenshotHelper.capture(page,testInfo.title.replace(/\s+/g,"_"))
    }
    console.log(testInfo.title,'test execution completed')
})

test.afterAll(async()=>{
    console.log('========================')
    console.log('Test Execution Completed')
    console.log('========================')
})
