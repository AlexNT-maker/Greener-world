document.addEventListener("DOMContentLoaded", function() {

    // ----------------------------------------------------------------------------------
    // 1. Navbar Logic (Loading + Hamburger)
    // ----------------------------------------------------------------------------------
    const placeholder = document.getElementById("navbar-placeholder");

    if (placeholder) {
        fetch("navbar.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Something went wrong with the network");
                }
                return response.text();
            })
            .then(data => {
                placeholder.innerHTML = data;

                
                const hamburger = document.querySelector(".hamburger");
                const navMenu = document.querySelector(".nav-bar");

                if(hamburger && navMenu){
                    
                    hamburger.addEventListener("click", () => {
                        hamburger.classList.toggle("active");
                        navMenu.classList.toggle("active");
                    });

                   
                    document.querySelectorAll(".nav-bar a").forEach(n => n.addEventListener("click", () => {
                        hamburger.classList.remove("active");
                        navMenu.classList.remove("active");
                    }));
                }
            })
            .catch(error => {
                console.error("Error fetching navbar", error);
            });
    }

    // ----------------------------------------------------------------------------------
    // 2. Carousel Code
    // ----------------------------------------------------------------------------------
    const scrollLeftButton = document.getElementById("scroll-left");
    const scrollRightButton = document.getElementById("scroll-right");
    const row = document.querySelector(".figure-wrapper");

    if (scrollLeftButton && scrollRightButton && row){
        const scrollAmount = 300; 
        scrollRightButton.addEventListener("click", () => {
            row.scrollLeft += scrollAmount ;
        });
        scrollLeftButton.addEventListener("click", () => {
            row.scrollLeft -= scrollAmount;
        });
    }

    // ----------------------------------------------------------------------------------
    // 3. Product Card Zoom
    // ----------------------------------------------------------------------------------
    const allProductCards = document.querySelectorAll(".product-card");
    allProductCards.forEach(function(card){
        card.addEventListener("click", function(){
            card.classList.toggle("zoomed");
        });
    });

    // ----------------------------------------------------------------------------------
    // 4. Jobs Description Logic
    // ----------------------------------------------------------------------------------
    const jobData={
        'IT': { title: 'IT Specialist', description:`We are looking for a tech-savy individual...`, btnText:'Apply for this position' },
        'Customer':{ title: 'Customer Service', description: `You will be our smiley voice...`, btnText:'Apply for this position' },
        'Gardener':{ title: 'Gardener', description: `Get you hands dirty with clean love...`, btnText: 'Apply for this position' },
        'Agronomist':{ title: 'Agronomist', description: `Join our scientific team...`, btnText: 'Apply for this position' },
        'Decorator':{ title: 'Interior Decorator', description: 'Help our customer to transform their spaces...', btnText:'Apply for this position' },
        'CV':{ title:'Upload your CV', description: `Nothing match with your choices...`, btnText: 'Upload' }
    };

    const dropdownItems = document.querySelectorAll('.dropdown-item[data-job]');
    const detailsContainer = document.getElementById('job-details');
    
    if(detailsContainer && dropdownItems.length > 0) {
        const titleElement = document.getElementById('job-title');
        const descElement = document.getElementById('job-desc');
        const applyBtn = detailsContainer.querySelector('.btn');

        dropdownItems.forEach(item=>{
            item.addEventListener('click', function(event){
                event.preventDefault();
                const jobKey = this.getAttribute('data-job');
                const data = jobData[jobKey];

                if (data){
                    titleElement.textContent = data.title;
                    descElement.textContent = data.description;
                    applyBtn.textContent = data.btnText;
                    detailsContainer.style.display = 'block';
                    detailsContainer.scrollIntoView({behavior: 'smooth', block: 'start'});
                }
            });
        });
    }
});

// ----------------------------------------------------------------------------------
// 5. Loader Hidden
// ----------------------------------------------------------------------------------
window.addEventListener("load", function(){
    const loader = document.getElementById("loader");
    if(loader){
        loader.classList.add("loader-hidden");
        loader.addEventListener("transitionend", function(){
            if(document.body.contains(loader)){
                document.body.removeChild(loader);
            }
        });
    }
});