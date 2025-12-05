document.addEventListener("DOMContentLoaded", function() {

    const placeholder = document.getElementById("navbar-placeholder");


    if (placeholder) {
        fetch("navbar.html")
            .then(response => {
                // check if the file is founded
                if (!response.ok) {
                    throw new Error("Something went wrong with the network");
                }
                return response.text(); // Takes HTML as a text
            })
            .then(data => {
                placeholder.innerHTML = data;
            })
            .catch(error => {
                console.error("Error fetching navbar", error);
                placeholder.innerHTML = "<p> Error loading menu </p>"; 
            });
    }
});


//2.carousel code---------------------------------------------------------------------------------------------------
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


//3. product card transformation ease-in-out on click pick the image-----------------------------------------------

const allProductCards= document.querySelectorAll(".product-card");

allProductCards.forEach(function(card){
    card.addEventListener("click", function(){
        card.classList.toggle("zoomed");
    });
});
