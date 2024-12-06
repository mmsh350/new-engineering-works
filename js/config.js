window.onload = function () {
    setTimeout(function () {
        document.getElementById('preloader').style.display = 'none';
        document.querySelector('.body-inner').style.display = 'block';
    }, 1000);
};

// script.js
document.addEventListener("DOMContentLoaded", () => {
    const navContainer = document.getElementById("navigation");

    // Fetch the navigation HTML
    fetch("includes/navigation.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch navigation: ${response.statusText}`);
            }
            return response.text();
        })
        .then((html) => {
            // Inject the navigation HTML into the container
            navContainer.innerHTML = html;
        })
        .catch((error) => {
            console.error("Error loading navigation:", error);
        });
});

