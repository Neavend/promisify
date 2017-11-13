export default promisify = (func) => (...args) => {
  return new Promise((resolve, reject) => {
    let callback = (err, data) => err ? reject(err) : resolve(data);
    func.apply(func.prototype, [...args, callback]);
  });
}

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
