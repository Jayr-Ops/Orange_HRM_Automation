const {test,expect} = require('../fixtures/baseFixtures')
const { AppConstant } =  require('../constants/AppConstant')
const { CommanMethod } = require('../utils/CommanMethod')
require('../hooks/hooks')

test.describe('PIM',()=>{
    test('Open Employee List',{tag: '@smoke'},async({PIM2,loginpage2,page})=>{
        await PIM2.openPIMModule()
        await PIM2.openEmployeeList()
        await PIM2.isEmployeeListDisplayed()
    })
})