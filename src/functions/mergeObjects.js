var isPlainObject = function(value) {
    if (value === null || typeof value !== 'object') {
        return false;
    }
    var prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
};

var isSafeKey = function(key) {
    return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
};

var cloneValue = function(value, references) {
    if (value === null || typeof value !== 'object') {
        return value;
    }
    if (references.has(value)) {
        return references.get(value);
    }
    if (Array.isArray(value)) {
        var array = [];
        references.set(value, array);
        value.forEach(function(item) {
            array.push(cloneValue(item, references));
        });
        return array;
    }
    if (isPlainObject(value)) {
        var object = {};
        references.set(value, object);
        mergeInto(object, value, references);
        return object;
    }
    return value;
};

var mergeInto = function(target, source, references) {
    references.set(source, target);
    Object.keys(source).forEach(function(key) {
        if (!isSafeKey(key)) {
            return;
        }

        var value = source[key];
        if (references.has(value)) {
            target[key] = references.get(value);
        }
        else if (Array.isArray(value) && Array.isArray(target[key])) {
            references.set(value, target[key]);
            value.forEach(function(item) {
                target[key].push(cloneValue(item, references));
            });
        }
        else if (isPlainObject(value)) {
            var destination = isPlainObject(target[key]) ? target[key] : {};
            target[key] = destination;
            mergeInto(destination, value, references);
        }
        else {
            target[key] = cloneValue(value, references);
        }
    });
    return target;
};

module.exports = function(target, source) {
    if (source === null || typeof source !== 'object') {
        if (typeof source === 'function') {
            structuredClone(source);
        }
        return target;
    }
    var clonedSource = structuredClone(source);
    return mergeInto(target, clonedSource, new WeakMap());
};
