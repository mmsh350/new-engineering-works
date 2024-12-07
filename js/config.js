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

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const feedback = document.getElementById('form-feedback');
  feedback.classList.add('d-none');
  feedback.textContent = '';

  const formData = new FormData(this);

  // Client-side validation
  for (const [key, value] of formData.entries()) {
    if (!value.trim()) {
      feedback.textContent = 'All fields are required.';
      feedback.classList.remove('d-none');
      return;
    }
  }

  fetch('submit.php', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('Message sent successfully!');
        this.reset();
      } else {
        feedback.textContent = data.error || 'An error occurred. Please try again.';
        feedback.classList.remove('d-none');
      }
    })
    .catch(() => {
      feedback.textContent = 'Failed to send the message. Please check your connection.';
      feedback.classList.remove('d-none');
    });
});



