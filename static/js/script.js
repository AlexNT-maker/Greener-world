const scrollLeftButton = document.getElementById("scroll-left");
const scrollRightButton = document.getElementById("scroll-right");
const row = document.querySelector(".figure-wrapper");

if (scrollLeftButton && scrollRightButton && row){

    const scrollAmount = 300; 

    scrollRightButton.addEventListener("click", () => {
        row.scrollLeft += scrollAmount ;
    });   //300px right

    scrollLeftButton.addEventListener("click", () => {
        row.scrollLeft -= scrollAmount;
    });  //300px left

} else{
    console.error("Not found the details of carousel")
}