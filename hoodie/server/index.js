module.exports = function (server, options, next) {
  var api = server.plugins.account.api

  api.accounts.add({
    username: 'test',
    password: 'test'
  })

  .then(function (account) {
    console.log('test account created')

    return api.account(account.id).tokens.add({
      id: 'MY_SECRET_TOKEN',
      type: 'login',
      timeout: 7200 // 2h
    })
  })

  .then(function (token) {
    console.log('token added to test account: ' + token.id)
    next()
  })

  .catch(function (error) {
    console.log(error)
    next()
  })
}

module.exports.attributes = {
  name: 'test'
}
