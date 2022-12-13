function validateArguments(params) {
  if (Object.prototype.toString.call(params).slice(8, -1).toLocaleLowerCase() != 'array') {
    console.error('arguments must be an array')
    return
  }
  for (const iterator of params) {
    if (!iterator.key) {
      console.error('must provide a key')
      return
    }
    if (Object.prototype.toString.call(iterator.key).slice(8, -1).toLocaleLowerCase() != 'string') {
      console.error('key must be a string')
      return
    }
    if (iterator.value === undefined) {
      console.error('must provide a value')
      return
    }
  }
}


function overrideXMLHttpRequest(list) {
  validateArguments(list)
  const OriginXHR = window.XMLHttpRequest
  const originOpen = OriginXHR.prototype.open
  window.XMLHttpRequest = function () {
    const realXHR = new OriginXHR()
    realXHR.open = function (method, url, async) {
      originOpen.call(realXHR, method, url, async)
      list.forEach(element => {
        element.condition || element.condition === undefined && realXHR.setRequestHeader(element.key, element.value)
      })
    }
    return realXHR
  }

}

function once(fn) {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    } else {
      console.error('can not config header again')
      return
    }
  }
}

export function nanoid() {
  return ((t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce(((t, e) => t += (e &= 63) < 36 ? e.toString(36) : e < 62 ? (e - 26).toString(36).toUpperCase() : e > 62 ? "-" : "_"), ""))()
}

export const addRequestHeader = once(overrideXMLHttpRequest)