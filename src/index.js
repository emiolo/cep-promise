const CEP = require('cep-promise')

const getCep = (cep, allowIncomplete = false) => {
  const clean = cep.toString().match(/\d/g).join('')
  if (!allowIncomplete && clean.length !== 8) return Promise.resolve(null)
  console.log(clean)
  return CEP(clean)
}

const Debounce = (delay, callback, thisArg) => {
  let timer
  let id
  const call = (myId, result, error) => {
    if (id !== myId) return
    if (thisArg !== undefined) {
      callback.call(thisArg, result, error)
      return
    }
    callback(result, error)
  }
  return (...args) => {
    clearTimeout(timer)
    const myId = Symbol()
    id = myId
    timer = setTimeout(
      () => getCep(...args)
        .then(result => call(myId, result))
        .catch(error => call(myId, null, error)),
      delay
    )
  }
}

CEP.debounce = Debounce

export default CEP
