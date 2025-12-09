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


//4. Jobs description applied when you click the path from the dropdown menu---------------------------------------

document.addEventListener('DOMContentLoaded', function(){

    const jobData={
        'IT': {
            title: 'IT Specialist',
            description:`We are looking for a tech-savy individual to maintain our websites and servers.
             Nice to have:
             Experience with HTML CSS Js and SQL`,
             btnText:'Apply for this position'
        },
        'Customer':{
            title: 'Customer Service',
            description: `You will be our smiley voice
            Nice to have: Patience and love for the plants`,
            btnText:'Apply for this position'
        },
        'Gardener':{
            title: 'Gardener',
            description: `Get you hands dirty with clean love for the plants`,
            btnText: 'Apply for this position'
        },
        'Agronomist':{
            title: 'Agronomist',
            description: 'Join our scientific team to ensure health and grow of our innovation species. Required: Bsc in Agronomy',
            btnText: 'Apply for this position'
        },
        'Decorator':{
            title: 'Interior Decorator',
            description: 'Help our customer to transform their spaces into a nature paradise',
            btnText:'Apply for this position'
        },
        'CV':{
            title:'Upload your CV',
            description: `Nothing match with your choices, but you want to be part of our team.
            Upload your CV and we will take care for you.`,
            btnText: 'Upload'
        }

    };

    const dropdownItems = document.querySelectorAll('.dropdown-item[data-job]');

    const detailsContainer = document.getElementById('job-details');
    const titleElement = document.getElementById('job-title');
    const descElement = document.getElementById('job-desc');
    const applyBtn = detailsContainer.querySelector('.btn')


dropdownItems.forEach(item=>{
    item.addEventListener('click', function(event){
        event.preventDefault();

        const jobKey = this.getAttribute('data-job');

        const data = jobData[jobKey];

        if (data){
            titleElement.textContent = data.title;
            descElement.textContent = data.description;
            applyBtn.textContent = data.btnText;

            detailsContainer.style.display = 'block'

            detailsContainer.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
        else{
            console.error('No data found for key:', jobKey);
        }
    });
});
});