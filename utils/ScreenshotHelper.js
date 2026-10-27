exports.ScreenshotHelper = class ScreenshotHelper{
    static async capture(page,name){
        await page.screenshot({
            path:`screenshot/${name}.png`, fullPage:true
        })
    }
}