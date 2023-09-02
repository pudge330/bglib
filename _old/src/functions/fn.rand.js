bglib.fn.rand = function(max) {
    max = max || 100000000;
    return Math.floor((Math.random() * max) + 1);
};