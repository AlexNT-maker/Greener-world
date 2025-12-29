document.addEventListener("DOMContentLoaded", function() {

    // ---------------------------------------------------------------------------------------------------------
    // 1. Navbar Logic (Loading + Hamburger)
    // ---------------------------------------------------------------------------------------------------------
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

                updateCartBadge();
            })
            .catch(error => {
                console.error("Error fetching navbar", error);
            });
    }

    //Update for the red cycle on cart button 

    function updateCartBadge(){
     const cart = JSON.parse(localStorage.getItem('myCart')) || [];
     const badge = document.getElementById("cart-count");
     if (badge){
        badge.innerText = cart.length;
     }
    }

    //----------------------------------------------------------------------------------------------------------
    // 2. PRODUCTS PAGE: Add to cart logic
    //----------------------------------------------------------------------------------------------------------

    const addToCartButtons = document.querySelectorAll ('.product-card .btn-success');

    if (addToCartButtons.length > 0){
        addToCartButtons.forEach (button => {
            button.addEventListener('click', function(e) {
                const card = e.target.closest ('.product-card'); 

                const title = card.querySelector('h3').innerText ;
                const priceText = card.querySelector('p').innerText ;
                const price = parseFloat(priceText.replace('$', '')) ;
                const imgSrc = card.querySelector('img').src ; 
                
                const product = {
                    title: title,
                    price: price,
                    image: imgSrc
                };

                let cart = JSON.parse(localStorage.getItem('myCart')) || [];

                cart.push(product);

                localStorage.getItem(myCart), JSON.stringify((cart));

                updateCartBadge();

                alert(`${title} added to cart!`);
                
            });
        });
    }

    
    //-----------------------------------------------------------------------------------------------------------
    // 3.CART-PAGE: Render Items & Calculate Total
    //-----------------------------------------------------------------------------------------------------------
        
      const cartContainer = document.getElementById('cart-items-container');
      const totalPriceElement = document.getElementById('total-price');

      if (cartContainer && totalPriceElement){
        displayCartItems();
      }

      function displayCartItems() {
        let cart = JSON.parse(localStorage.getItem('myCart')) || [];
        cartContainer.innerHTML = ''; 

        if (cart.length === 0) {
            cartContainer.innerHTML = '<tr><td colspan="4" class="empty-cart-msg">Your cart is empty. Go plant something! 🌿</td></tr>';
            totalPriceElement.innerText = 'Total: 0$';
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.image}" class="cart-item-img" alt="${item.title}"></td>
                <td>${item.title}</td>
                <td>${item.price}$</td>
                <td><button class="btn-remove" data-index="${index}">Remove</button></td>
            `;
            cartContainer.appendChild(row);
        });

        totalPriceElement.innerText = `Total: ${total}$`;

        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const indexToRemove = this.getAttribute('data-index');
                cart.splice(indexToRemove, 1); 
                localStorage.setItem('myCart', JSON.stringify(cart)); 
                displayCartItems(); 
                updateCartBadge(); 
            });
        });
    }


    // ----------------------------------------------------------------------------------------------------------
    // 4. Carousel Code
    // ----------------------------------------------------------------------------------------------------------
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

    //---------------------------------------------------------------------------------------------------------

    // ----------------------------------------------------------------------------------
    // 5. Product Card Zoom
    // ----------------------------------------------------------------------------------
    const allProductCards = document.querySelectorAll(".product-card");
    allProductCards.forEach(function(card){
        card.addEventListener("click", function(){
            card.classList.toggle("zoomed");
        });
    });

    // ----------------------------------------------------------------------------------
    // 6. Jobs Description Logic
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
// 7. Loader Hidden
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