const CEP = require('cep-promise')

const getCep = (cep, allowIncomplete = false) => {
  const clean = cep.toString().match(/\d/g).join('')
  if (!allowIncomplete && clean.length !== 8) return Promise.resolve(null)
  return CEP(clean)
}

const Debounce = (callback, params) => {
  const defaultOptions = {
    thisArg: null,
    delay: 300,
    onLoading: () => null,
  }
  const {
    thisArg,
    delay,
    onLoading
  } = {...defaultOptions, ...params}
  if (typeof onLoading !== 'function') throw new Error('A opção onLoading deve ser uma função')

  let timer
  let id
  const call = (myId, result, error) => {
    if (id !== myId) return
    if (thisArg) {
      callback.call(thisArg, result, error)
      onLoading(false)
      return
    }
    callback(result, error)
    onLoading(false)
  }
  return (...args) => {
    clearTimeout(timer)
    const myId = Symbol()
    id = myId
    timer = setTimeout(
      () => {
        onLoading(true)
        getCep(...args)
          .then(result => call(myId, result))
          .catch(error => call(myId, null, error))
      },
      delay
    )
  }
}

CEP.debounce = Debounce

export default CEP
