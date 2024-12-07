window.onload = function () {
    setTimeout(function () {
        document.getElementById('preloader').style.display = 'none';
        document.querySelector('.body-inner').style.display = 'block';
    }, 1000);
};

document.addEventListener("DOMContentLoaded", () => {
  // Load navigation
  const navContainer = document.getElementById("navigation");
  if (navContainer) {
    fetch("includes/navigation.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch navigation: ${response.statusText}`);
        }
        return response.text();
      })
      .then((html) => {
        navContainer.innerHTML = html;
      })
      .catch((error) => {
        console.error("Error loading navigation:", error);
      });
  }

  // Load footer
  const footerContainer = document.getElementById("footer-main");
  if (footerContainer) {
    fetch("includes/footer-main.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch footer: ${response.statusText}`);
        }
        return response.text();
      })
      .then((html) => {
        footerContainer.innerHTML = html;
      })
      .catch((error) => {
        console.error("Error loading footer:", error);
      });
  }

  // Load copyright
  const copyrightContainer = document.getElementById("site-copyright");
  if (copyrightContainer) {
    fetch("includes/site-copyright.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch footer: ${response.statusText}`);
        }
        return response.text();
      })
      .then((html) => {
        copyrightContainer.innerHTML = html;
      })
      .catch((error) => {
        console.error("Error loading footer:", error);
      });
  }
});

