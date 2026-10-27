const loginDetails = require('../testdata/login_details.json')
const UserDetails = require('../testdata/admin_page.json')
exports.Jsonreader = class Jsonreader{
    static login_details(){
        return loginDetails
    }
    static User_Details(){
        return UserDetails
    }
}