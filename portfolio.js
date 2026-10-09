// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});


// Close menu when a link is clicked

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});


// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();


    if (name === "" || message === "") {

        formMessage.textContent =
            "Please fill in all the fields.";

        formMessage.style.color = "red";

        return;
    }


    formMessage.textContent =
        "Thank you! Your message has been submitted.";

    formMessage.style.color = "green";


    contactForm.reset();

});


// ================= CURRENT YEAR =================

const copyright = document.getElementById("copyright");

const currentYear = new Date().getFullYear();

copyright.textContent =
    `© ${currentYear} Preeti Chand. All Rights Reserved.`;