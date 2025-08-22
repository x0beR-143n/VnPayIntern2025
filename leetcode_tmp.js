var rob = function(nums) {
    if(nums.length <= 2) {
        return Math.max(...nums);
    }  
    let dp = new Array(nums.length).fill(0);
    dp[0] = nums[0];
    dp[1]= Math.max(dp[0], nums[1]);
    for(let i = 2; i<nums.length; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
    }
    console.log(dp);
};

let arr = [1,2,3,1];
rob(arr);