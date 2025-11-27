
function myFunction() {
    var dropDownMenu = document.getElementById("myDropdown")
    dropDownMenu.classList.toggle("show")
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  
  document.getElementById('profile').addEventListener('click', function(){
    window.location.href = "/Profile/signup.html"
})

// Search Functionality
function handleSearch() {
    var searchInput = document.getElementById("search_bar");
    var query = searchInput.value.trim().toLowerCase();

    if (query) {
        var womenKeywords = ["women", "saree", "dress", "kurta", "lehenga", "skirt", "top", "gown"];
        var isWomenSearch = womenKeywords.some(keyword => query.includes(keyword));

        var targetPage = isWomenSearch ? "/womensData/women.html" : "/menspage/mens.html";
        
        // If we are already on the target page, just reload with the new query
        // But since the pages are in different directories, relative paths might be tricky if we don't use absolute or root-relative paths.
        // The current structure seems to rely on relative paths often, but let's try to be robust.
        // Using root-relative paths as defined in the variable `targetPage`.
        
        // However, checking current location to avoid full reload if possible, 
        // but for simplicity and ensuring the filter logic runs on load, a reload/navigation is fine.
        
        window.location.href = targetPage + "?q=" + encodeURIComponent(query);
    }
}

var searchIcon = document.getElementById("search_icon");
if (searchIcon) {
    searchIcon.addEventListener("click", handleSearch);
}

var searchBar = document.getElementById("search_bar");
if (searchBar) {
    searchBar.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    });
}

// Cart Count Functionality
function updateCartCount() {
    var bagData = JSON.parse(localStorage.getItem("BagListObj")) || [];
    var count = bagData.length;

    // Find the bag icon container
    // Based on HTML structure: <div id="right_icon"> ... <div> <i class="fa-solid fa-bag-shopping"></i> ... </div> </div>
    // We need to select the div that contains the bag icon.
    var bagIcon = document.querySelector('.fa-bag-shopping');
    if (bagIcon) {
        var container = bagIcon.parentElement;
        var countElement = container.querySelector('.cart-count');

        if (count > 0) {
            if (!countElement) {
                countElement = document.createElement('span');
                countElement.className = 'cart-count';
                container.appendChild(countElement);
            }
            countElement.innerText = count;
            countElement.style.display = 'flex';
        } else {
            if (countElement) {
                countElement.style.display = 'none';
            }
        }
    }
}

// Update count on load
window.addEventListener('load', updateCartCount);

// Update count when storage changes (e.g. item added in another tab)
window.addEventListener('storage', function(e) {
    if (e.key === 'BagListObj') {
        updateCartCount();
    }
});

// Expose function globally so it can be called from other scripts if needed
window.updateCartCount = updateCartCount;
  