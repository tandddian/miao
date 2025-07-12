var tandddian = {
    compact: function (array) {
        return array.filter(element => {
            return Boolean(element)
        })
    },
    chunk: function (array, size = 1) {
        let patitionSize = Math.ceil(array.length / size);
        let result = []
        let j = 0;
        while (patitionSize) {
            let tmp = []
            let s = patitionSize > 1 || array.length % size == 0 ? size : array.length % size 
            while (s) {
                tmp.push(array[j++])
                s--
            }
            result.push(tmp)
            patitionSize--
        }
        return result 
    },
    fill: function (array, value, start = 0, end = array.length) {
        let result = []
        return result = Array.from(array, (currentValue, index) => {
            if (index >= start && index < end ) {
                currentValue = value
            } 
            return currentValue ? currentValue : ""
        })
    },
    drop: function (array, n = 1) {
        let result = []
        if (n >= array.length) {
            return result;
        } else {
            return array.slice(n);
        }
    },
    findIndex: function (array, predicate,fromIndex = 0) {
        if (typeof predicate === 'function') { 
            for (let i = fromIndex; i < array.length; i++) {
                if (predicate(array[i])) {
                    return i;
                }
            }
        } else if (Array.isArray(predicate)) {
            const [key, value] = predicate;
            for (let i = fromIndex; i < array.length; i++) {
                if (array[i][key] === value) {
                    return i;
                }
            }
        } else if (typeof predicate === 'object') {
            for (let i = fromIndex; i < array.length; i++) {
            let match = true;
            for (const key in predicate) {
                if (array[i][key] !== predicate[key]) {
                    match = false;
                    break;
                }
            }
            if (match) return i;
            }
        } else if (typeof predicate === 'string') {
            for (let i = fromIndex; i < array.length; i++) {
                if (array[i][predicate]) {
                    return i;
                }
            }
        }
            return -1; 
    },
    findLastIndex: function (array, predicate, fromIndex=array.length-1) {
        if (typeof predicate === 'function') { 
            for (let i = fromIndex; i >= 0; i--) {
                if (predicate(array[i])) {
                    return i;
                }
            }
        } else if (Array.isArray(predicate)) {
            const [key, value] = predicate;
            for (let i = fromIndex; i >= 0; i--) {
                if (array[i][key] === value) {
                    return i;
                }
            }
        } else if (typeof predicate === 'object') {
            for (let i = fromIndex; i >= 0; i--) {
            let match = true;
            for (const key in predicate) {
                if (array[i][key] !== predicate[key]) {
                    match = false;
                    break;
                }
            }
            if (match) return i;
            }
        } else if (typeof predicate === 'string') {
            for (let i = fromIndex; i >= 0; i--) {
                if (array[i][predicate]) {
                    return i;
                }
            }
        }
            return -1; 
    },
    flatten: function (array) {
        let result = [];
        for (let i = 0; i < array.length; i++) {
            if(Array.isArray(array[i])) {
                for (let j = 0; j < array[i].length; j++) {
                    result.push(array[i][j])
                }
            } else {
                result.push(array[i])
            }
        }
        return result
    },
    flattenDeep: function (array) {
        let result = [];
        function flattenDeepTmp(array1) {
            for (let i = 0; i < array1.length; i++) {
                if(Array.isArray(array1[i])) {
                    flattenDeepTmp(array1[i]);
                } else {
                    result.push(array1[i]);
                }
            }
        }
        flattenDeepTmp(array);
        return result;
    },
    flattenDepth: function (array, depth=1) {
        let result = [];
        function flattenDepthTmp(array1, depthTmp) {

            for (let i = 0; i < array1.length; i++) {
                if(Array.isArray(array1[i]) && depthTmp !== 1) {
                    flattenDepthTmp(array1[i], --depthTmp);
                } else {
                    result.push(array1[i]);
                }
            }
        }
        //flattenDepthTmp(array, depth);
        for (let s = 0; s < array.length; s++) {
            if(Array.isArray(array[s])) {
                flattenDepthTmp(array[s], depth );
            } else {
                result.push(array[s]);
            }
        }
        
        return result;
    },
    fromPairs: function (pairs) {
        let obj = {};
        for (let i = 0; i < pairs.length; i++) {
            obj[pairs[i][0]] = pairs[i][1];
        }
        return obj;
    },
    toPairs: function (object) {
        let obj = object
        let result = [];
        for (let key in obj) {
            let tmp = [];
            if (obj.hasOwnProperty(key)){
                tmp.push(key, obj[key])
                result.push(tmp);
            }
        }
        return result;
    },
    head: function (array) {
        if(!array.length) {
            return undefined
        }
        return array[0]
    },
    indexOf: function (array, value, fromIndex = 0) {
        let idx = -1
        for (let i = fromIndex; i < array.length; i++) {
            if (array[i] === value) {
                idx = i
                break
            } 
        }
        return idx
    },
    lastIndexOf: function (array, value, fromIndex=array.length-1) {
        let idx = -1
        for (let i = fromIndex; i >= 0; i--) {
            if (array[i] === value) {
                idx = i
                break
            } 
        }
        return idx
    },
    initial: function (array) {
        return array.slice(0, array.length-1)
    },
    join: function(array, separator = ',') {
        let str = ''
        for (let i = 0; i < array.length; i++) {
            str = str + array[i] + separator
        }
        return str.slice(0, str.length - 1)
    },
    last: function (array) {
        return array[array.length - 1]
    },
    pull:  function (array, ...values) {
        for (let j = 0; j < values.length; j++) {
            //values.includes(result[i])
            for (let i = 0; i < array.length; i++) {
                if (array[i] === values[j]) {
                    if (i) {
                        array.splice(i , 1)
                    } else {
                        array.shift()
                    }
                    i--
                }
            }
        }
        return array;
    },
    reverse: function (array) {
        let n = array.length - 1;
        for (let i = 0; i < array.length / 2; i++) {
            let tmp = array[n - i];
            array[n - i] = array[i]
            array[i] = tmp
        }
        return array
    },
    every: function (collection, predicate) {
        let boolTmp = true;
        if (typeof predicate === 'function') { 
            return collection.reduce((bool, cur) => predicate(cur) && bool, 1)
        } else if (Array.isArray(predicate)) {
            for (let k = 0; k < collection.length; k++) {
                if (collection[k].hasOwnProperty(predicate[0])) {
                    boolTmp = boolTmp && (collection[k][predicate[0]] === predicate[1])
                } else {
                    return false
                }
                return boolTmp
            }
        } else if (typeof predicate === 'object') {
            for (let j = 0; j < collection.length; j++) {
                boolTmp = boolTmp && (collection[j] === predicate)
            }
            return boolTmp
        } else if (typeof predicate === 'string') {
            for (let i = 0; i < collection.length; i++) {
                boolTmp = boolTmp && collection[i][predicate]
            }
            return boolTmp
        }
        return false; 
    },
    some: function (collection, predicate) {
        //!every (collection, !predicate) 
        // ruhe实现对函数的取反？
        let boolTmp = false;
        if (typeof predicate === 'function') { 
            return collection.reduce((bool, cur) => predicate(cur) || bool, 0)
        } else if (Array.isArray(predicate)) {
            for (let k = 0; k < collection.length; k++) {
                if (collection[k].hasOwnProperty(predicate[0])) {
                    boolTmp = boolTmp || (collection[k][predicate[0]] === predicate[1])
                }
            }
            return boolTmp
        } else if (typeof predicate === 'object') {
            for (let j = 0; j < collection.length; j++) {
                boolTmp = boolTmp || (collection[j] === predicate)
            }
            return boolTmp
        } else if (typeof predicate === 'string') {
            for (let i = 0; i < collection.length; i++) {
                boolTmp = boolTmp || collection[i][predicate]
            }
            return boolTmp
        }
        return false; 
    },

    countBy: function(collection, iteratee) {
        let obj = {}
        if (typeof iteratee === 'function') {
            for (let item of collection) {
                if (obj.hasOwnProperty(iteratee(item))) {
                    obj[iteratee(item)]++
                } else {
                    obj[iteratee(item)] = 1
                }
            }
        } else {
            for (let item of collection) {
                if (typeof item === 'string') {
                    //字符串实例才有 length， 'string' 没有
                    item = new String(item)
                }
                if (obj.hasOwnProperty(item[iteratee])) {
                    obj[item[iteratee]]++
                } else {
                    obj[item[iteratee]] = 1
                }
            }
        }
        return obj
    },

    groupBy: function(collection, iteratee) {
        let obj = {}
        if (typeof iteratee === 'function') {
            for (let item of collection) {
                if (obj.hasOwnProperty(iteratee(item))) {
                    obj[iteratee(item)].push(item)
                } else {
                    obj[iteratee(item)] = [item]
                }
            }
        } else {
            for (let item of collection) {
                if (typeof item === 'string') {
                    itemTmp = new String(item)
                }
                if (obj.hasOwnProperty(itemTmp[iteratee])) {
                    obj[itemTmp[iteratee]].push(item)
                } else {
                    obj[itemTmp[iteratee]] = [item]
                }
            }
        }
        return obj
    },

    keyBy: function(array, iteratee) {
        let obj = {}
        if (typeof iteratee === 'function') {
            for (let item of array) {
                obj[iteratee(item)] = item
            }
        } else {
            for (let item of array) {
                obj[item[iteratee]] = item
            }
        }
        return obj
    }

}
