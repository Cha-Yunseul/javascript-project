//observer
let requestingObserver = null;

const observable = (obj) => {
  const observersPerProps = {};

  return new Proxy(obj, {
    get(target, prop) {
      observersPerProps[prop] = observersPerProps[prop] || new Set();
      if (requestingObserver) observersPerProps[prop].add(requestingObserver);
      return target[prop];
    },
    set(target, prop, val) {
      if (target[prop] === val) return true;
      if (JSON.stringify(target[prop]) === JSON.stringify(val)) return true;
      target[prop] = val;
      observersPerProps[prop].forEach((notify) => notify());
      return true;
    },
  });
};

const observe = (notify) => {
  requestingObserver = notify;
  notify();
  requestingObserver = null;
};

export { observable, observe };
