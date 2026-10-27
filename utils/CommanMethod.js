exports.CommanMethod = class CommanMethod{
    static async textbox_fill(element,value){
        await element.fill(value)
    }
    static async click_element(element){
        await element.click()
    }
    
}