function isPrimeNumber(num){
        if(num === 0) return false;;
        for(var i = 2; i < Math.sqrt(num); i++){
            if(num % i == 0){
                return true;
            }
        }
        return false ;
    }