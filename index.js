const promisify = require('util.promisify')

function promisifyClass(target, suffix = 'Async') {
  target = target.prototype;
  Object.getOwnPropertyNames(target).forEach(key => {
    let descriptor = Object.getOwnPropertyDescriptor(target, key);

    if (!descriptor || typeof descriptor.value !== 'function'
      || key === 'constructor' || key.startsWith('_'))
      return;

    let promisifiedKey = key + suffix;
    target[promisifiedKey] = promisify(target[key]);
  });
}

export {promisify, promisifyClass};
