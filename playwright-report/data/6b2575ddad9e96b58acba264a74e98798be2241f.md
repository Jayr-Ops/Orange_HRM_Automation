# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: PIM.spec.js >> PIM >> Open Employee List
- Location: tests\PIM.spec.js:7:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  getByRole('heading', { name: 'Employee Information' })
Expected: visible
Received: undefined

Call log:
  - Expect "toBeVisible" getByRole('heading', { name: 'Employee Information' }) with timeout 20000ms
  - waiting for getByRole('heading', { name: 'Employee Information' })
  - Protocol error (Runtime.evaluate): Internal server error, session closed.

```

# Test source

```ts
  1  | const { expect } = require('@playwright/test')
  2  | const { AppConstant } = require('../constants/AppConstant')
  3  | const { CommanMethod } = require('../utils/CommanMethod')
  4  | const { Jsonreader } = require('../utils/JsonReader')
  5  | exports.PIM = class PIM{
  6  |     constructor(page){
  7  |         this.page=page
  8  |         this.PIMModule = page.locator('.oxd-main-menu').getByText('PIM')
  9  |         this.wait = page.waitForTimeout(5 * 1000)
  10 |         this.EmployeeList = page.getByRole('navigation',{name:'Topbar Menu'}).getByText('Employee List')
  11 |         this.EmployeeListHeading = page.getByRole('heading',{name:'Employee Information'})
  12 |         this.EmployeeNameInput = page.getByPlaceholder('Type for hints...').nth(0)
  13 |         this.searchButton = page.getByRole('button',{name:'Search'})
  14 |         this.resetButton = page.getByRole('button',{name:'Reset'})
  15 |     }
  16 | 
  17 |     async openPIMModule(){
  18 |         await CommanMethod.click_element(this.PIMModule)
  19 |         await expect(this.PIMModule).toBeVisible()
  20 |         await this.wait
  21 |         return console.log('PIM Module Launched..')
  22 |     }
  23 | 
  24 |     async openEmployeeList(){
  25 |         await CommanMethod.click_element(this.EmployeeList)
  26 |         await this.wait
  27 |         return console.log('EmployeeList Opened..')
  28 |     }
  29 | 
  30 |     async isEmployeeListDisplayed(){
> 31 |         expect(this.EmployeeListHeading).toBeVisible()
     |                                          ^ Error: expect(locator).toBeVisible() failed
  32 |         expect(this.EmployeeNameInput).toBeVisible()
  33 |         expect(this.searchButton).toBeVisible()
  34 |         expect(this.resetButton).toBeVisible()
  35 |     }
  36 | 
  37 | }
```