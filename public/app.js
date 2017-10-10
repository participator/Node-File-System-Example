(function(undefined) {
    var requestAmount = document.getElementById("requestAmount");
    var count = parseInt(requestAmount.innerHTML);
    
    if(!isNaN(count)){
        count++;
        requestAmount.innerHTML = count;
    } 
    
})();