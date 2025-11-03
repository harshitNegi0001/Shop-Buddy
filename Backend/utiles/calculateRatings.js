function calculateRating (prod_cmnt){
    let one = 0;
    let two =0;
    let three =0;
    let four =0;
    let five=0;
    let totalRating=prod_cmnt.length;
    
    let totaStar = 0;
    let totalReview =0;
    for (const cmnt of prod_cmnt) {
        const star = cmnt.star;
        if(cmnt.comment){
            totalReview++;

        }
        totaStar+=star
        five+=(star==5)?1:0;
        four+=(star==4)?1:0;
        three+=(star==3)?1:0;
        two+=(star==2)?1:0;
        one+=(star==1)?1:0;
    }
    // console.log(totalRating)
    const avgRating = (totalRating>0)?totaStar/totalRating:0;
    const ratingObj = {
        totalStars:totalRating,
        totalReview:totalReview,
        avgRating:avgRating.toFixed(1),
        ratingDetail:{
            five,
            four,
            three,
            two,
            one
        }
    }
    return ratingObj
}

export default calculateRating;