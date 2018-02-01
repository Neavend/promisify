import promisify from './implementation';

function promisifyClass(target, suffix = 'Async') {
  target = target.prototype || target;

  Object.getOwnPropertyNames(target).forEach(key => {
    let descriptor = Object.getOwnPropertyDescriptor(target, key);

    if (!descriptor || typeof descriptor.value !== 'function'
      || key === 'constructor' || key.startsWith('_'))
      return;

    let promisifiedKey = key + suffix;
    target[promisifiedKey] = promisify(target[key]);
  });
}

export default promisify;
export {promisify, promisifyClass};
