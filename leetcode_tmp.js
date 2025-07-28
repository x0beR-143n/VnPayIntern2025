/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var count_nonzero = function(arr) {
    let count = 0;
    let index = 0;
    while(index < arr.length - 1) {
        if(arr[index] === 1) {
            let tmp_count = 0;
            while(arr[index] === 1) {
                tmp_count++;
                index++;
            }
            count = Math.max(count,tmp_count);
        }
        index++;
    }
    console.log(count);
    return count;
}

var fillThenCount = function(arr, k) {
    let max = 1;
    let have_zero = false;
    for(let i = 0; i <= arr.length - k; i++) {
        if(arr[i] === 1) {
            continue;
        }
        have_zero = true;
        let tmp = k;
        let current_index = i;
        let tmp_arr = [...arr];
        while(current_index < arr.length && tmp > 0) {
            if(tmp_arr[current_index] === 0) {
                tmp_arr[current_index] = 1;
                tmp--;
            }
            current_index++;
        }
        console.log('tmp_arr:' + tmp_arr)
        max = Math.max(max, count_nonzero(tmp_arr));
    }
    return have_zero ? max : arr.length;
}

var characterReplacement = function(s, k) {
    if(s.length === 1) {
        return 1;
    }
    let char_set = new Set();
    let max = 1;
    for(let i = 0; i < s.length - 1; i++) {
        if(char_set.has(s[i])) {
            continue;
        } else {
            char_set.add(s[i]);
        }
        let tmp_s = new Array(s.length);
        tmp_s.fill(0);
        
        for(let j = 0; j < s.length; j++) {
            if(s[j] === s[i]) {
                tmp_s[j] = 1;
            } else {
                tmp_s[j] = 0;
            }
        }
        console.log('tmp_s: ' + tmp_s);
        max = Math.max(max, fillThenCount(tmp_s, k));
    }
    return max;
};

let string = "AAAA";
console.log(characterReplacement(string, 2));