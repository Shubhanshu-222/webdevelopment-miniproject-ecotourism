// document.querySelector('.login-btn').addEventListener('click', function(event) {
//   event.preventDefault();

//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//   fetch('useraccounts.json')
//       .then(response => response.json())
//       .then(users => {
//           const user = users.find(user => user.email === email && user.password === password);
//           if (user) {
//               alert("Login successful!");
//               // Redirect or perform further actions here
//           } else {
//               alert("Invalid email or password.");
//           }
//       })
//       .catch(error => {
//           console.error("Error loading user data:", error);
//       });
// });


let inactivityTimer;

// Function to show the popup
function openPopup() {
  document.getElementById("popup").style.display = "flex";
}

// Function to hide the popup
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Reset the inactivity timer
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(openPopup, 15000); // 5000 milliseconds = 15 seconds
}

subscribeBtn.onclick = function () {
  const email = document.getElementById("email").value;
  if (email) {
    alert(`Thank you for subscribing with ${email}!`);
    //localStorage.setItem("isSubscribed", "true"); // Set the subscription flag to remember the subscription
    closePopup(); // Close the popup
  } else {
    alert("Please enter a valid email address.");
  }
};

// Initialize inactivity timer when the page loads
window.onload = function () {
  resetInactivityTimer();

  // Detect user activity (mouse movement, clicks, key presses, scrolls)
  document.addEventListener("mousemove", resetInactivityTimer);
  document.addEventListener("keypress", resetInactivityTimer);
  document.addEventListener("click", resetInactivityTimer);
  document.addEventListener("scroll", resetInactivityTimer);
};

// Close popup button
document.getElementById("closePopup").onclick = closePopup;

const cardsContainer = document.querySelector(".destination-cards");
const cards = document.querySelectorAll(".card");
let currentIndex = 0;
const cardsPerSlide = 3; // Number of cards visible at once
const totalCards = cards.length;

function showNextSlide() {
  currentIndex += 1;
  if (currentIndex > totalCards - cardsPerSlide) {
    currentIndex = 0; // Reset to start when reaching the end
  }
  cardsContainer.style.transform = `translateX(-${currentIndex * 320}px)`; // Adjust for card width + margin
}

// Rotate every 4 seconds
setInterval(showNextSlide, 4000);


document.getElementById("fileInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    createCards(jsonData);
  };

  reader.readAsArrayBuffer(file);
});

// Function to create cards based on the Excel data
function createCards(data) {
  const destinationCards = document.getElementById("destinationCards");
  destinationCards.innerHTML = ""; // Clear any existing content

  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = item.ImageURL; // Ensure your Excel has a column "ImageURL"
    img.alt = item.Title;

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const h3 = document.createElement("h3");
    h3.textContent = item.Title;

    const p = document.createElement("p");
    p.textContent = item.Description;

    cardContent.appendChild(h3);
    cardContent.appendChild(p);
    card.appendChild(img);
    card.appendChild(cardContent);
    destinationCards.appendChild(card);
  });
}

// Auto-rotate carousel showing 3 cards at a time
let currentCardIndex = 0;
function rotateCarousel() {
  const cards = document.querySelectorAll(".destination-cards .card");
  const cardsToShow = 3;
  const totalCards = cards.length;

  // Reset visibility of all cards
  cards.forEach((card) => (card.style.display = "none"));

  // Show only 3 cards
  for (let i = 0; i < cardsToShow; i++) {
    let cardIndex = (currentCardIndex + i) % totalCards;
    cards[cardIndex].style.display = "block";
  }

  // Move to the next card set after 3 seconds
  currentCardIndex = (currentCardIndex + 1) % totalCards;
}

setInterval(rotateCarousel, 3000); // Rotate every 3 seconds




//Our Partners section
// const partnerCarousel = document.querySelector('.partners-carousel');
// const partnerCards = document.querySelectorAll('.partner-card');

// // Clone the first four partner cards and append them to the end
// for (let i = 0; i < 4; i++) {
//     let clone = partnerCards[i].cloneNode(true);
//     partnerCarousel.appendChild(clone);
// }

// let offset = 0;
// const cardWidth = partnerCarousel.querySelector('.partner-card').offsetWidth;
// const visibleCards = 4; // Number of cards visible at once
// const totalCardsPartner = partnerCards.length + 4; // Add 4 clones to the original cards
// let maxOffset = cardWidth * totalCardsPartner; // Total width with the clones

// function slidePartners() {
//     offset += cardWidth;

//     // When the last cloned card is reached, reset the carousel to the start
//     if (offset >= maxOffset - cardWidth * visibleCards) {
//         partnerCarousel.style.transition = 'none'; // Disable transition
//         offset = 0; // Reset to start
//         partnerCarousel.style.transform = `translateX(-${offset}px)`;

//         // Re-enable animation after a short delay
//         setTimeout(() => {
//             partnerCarousel.style.transition = 'transform 0.5s ease';
//         }, 50);
//     } else {
//         partnerCarousel.style.transform = `translateX(-${offset}px)`;
//     }
// }

// setInterval(slidePartners, 3000); // Move every 3 seconds


document.getElementById("partnersFileInput").addEventListener("change", function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        createPartnerCards(jsonData); // Call the corrected function name
    };

    reader.readAsArrayBuffer(file);
});

// Function to create cards based on the Excel data
function createPartnerCards(data) {
    const partnerCards = document.getElementById("partnerCards");
    partnerCards.innerHTML = ""; // Clear any existing content

    data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = item.ImageURL; // Ensure your Excel has a column "ImageURL"
        img.alt = item.Title;

        card.appendChild(img);
        partnerCards.appendChild(card);
    });

    // Start rotating the partner cards if more than 4
    if (data.length > 4) {
        rotatePartnerCarousel(); // Start the carousel
    }
}

// Auto-rotate carousel showing 4 cards at a time
let currentPartnerIndex = 0;
function rotatePartnerCarousel() {
    const cards = document.querySelectorAll(".partner-cards .card");
    const cardsToShow = 4; // Change to 4 cards
    const totalCards = cards.length;

    // Reset visibility of all cards
    cards.forEach((card) => (card.style.display = "none"));

    // Show only 4 cards
    for (let i = 0; i < cardsToShow; i++) {
        let cardIndex = (currentPartnerIndex + i) % totalCards;
        cards[cardIndex].style.display = "block";
    }

    // Move to the next card set after 3 seconds
    currentPartnerIndex = (currentPartnerIndex + 1) % totalCards;
}

// Rotate every 3 seconds if there are enough cards
setInterval(() => {
    const totalCards = document.querySelectorAll(".partner-cards .card").length;
    if (totalCards > 4) {
        rotatePartnerCarousel();
    }
}, 3000);



//CarbonFootprint page opens
function openCarbonFootprint() {
  window.open("carbonfootprint.html", "_blank");
}


//ScrolltoSection function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
      section.scrollIntoView({ behavior: 'smooth'   
});
  }
}



