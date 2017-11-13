const promisify = require('util.promisify')

function promisifyAll(target, suffix = 'Async') {
  Object.getOwnPropertyNames(target.prototype).forEach(key => {
    var descriptor = Object.getOwnPropertyDescriptor(target, key);

    if (typeof descriptor.value !== 'function' || key === 'constructor')
      return;
    console.log(key);

    var promisifiedKey = key + suffix;
    target[promisifiedKey] = promisify(target[key]);
  });

  return target; // Not necessary
}

export {promisify, promisifyAll};
