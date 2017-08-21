// @flow

const crypto = require('crypto')

const hash256 = (inputValue: string) : string => {
    const hash : string   = crypto.createHmac('sha256', "")
                    .update(inputValue)
                    .digest('hex')

    return hash
}



module.exports = {
    hash256 : hash256
}

