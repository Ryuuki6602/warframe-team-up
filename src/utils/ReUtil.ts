export const EmailRegExp = (string:string) => {
    let __mailReg = new RegExp(
        '^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$',
        'iu'
    )
    return __mailReg.test(string)
}

export const TelephoneReg = (string:string) => {
    if (string.length !== 11) {
        return false
    } else {
        let __telephoneReg = new RegExp('^1[345789][0-9]{9}$', 'g')
        return __telephoneReg.test(string)
    }
}

