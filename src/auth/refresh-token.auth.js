// @flow
const RefreshTokenLogic = require('../commons/logics/refresh-token.logic')
const constants = require('../constants')


async function saveRefreshToken(refreshToken: string, clientId: string, expires: Date, user:RequestUser, callback: (err:mixed) => any){
  try {
   await RefreshTokenLogic.add(refreshToken, clientId, expires, user.id)
   callback(false)
  }
  catch(error){
    callback(Error("Error when add refresh token to db."))
  }
}

async function getRefreshToken(tokenStr: string, callback: (err:mixed, token: ?RefreshToken) => any){
    const dbToken = await RefreshTokenLogic.getByRefreshToken(tokenStr)
    if(dbToken == null) 
        callback(Error("Token not found"), null)
    else {
        callback(false, { expires: new Date(dbToken.expires), userId: dbToken.userId, clientId: dbToken.clientId})
        await RefreshTokenLogic.remobveById(dbToken._id)
    }
}

module.exports = {
    saveRefreshToken: saveRefreshToken,
    getRefreshToken: getRefreshToken,
}