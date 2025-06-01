document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("video-bg"); // Get the video element
    video.pause(); // Pause the video initially
    
    // Door sound effect element
    const doorSound = document.getElementById("door-sound");
    
    // Video popup elements
    const videoPopupContainer = document.getElementById("video-popup-container");
    const popupVideo = document.getElementById("popup-video");
    const closeButton = document.getElementById("video-popup-close");
    
    // Video sources for each card
    const cardVideos = {
        0: "assets/images/card1-video.mp4", // Change these paths to your actual video files
        1: "assets/images/card2-video.mp4",
        2: "assets/images/card3-video.mp4",
        3: "assets/images/card4-video.mp4",
        4: "assets/images/card5-video.mp4"
    };

    // Door Animation
    const door = document.getElementById("door");
    door.addEventListener("click", function () {
        door.classList.add("open"); // Start door opening animation
        
        // Play the video when the door starts opening
        video.play();

        // Add event listener to handle custom looping
        video.addEventListener("timeupdate", handleVideoLoop);
        
        // Play door sound effect after 2 seconds
        setTimeout(() => {
            doorSound.currentTime = 0; // Reset sound to beginning
            doorSound.play(); // Play the door sound
        }, 2000); // 2 second delay

        // Remove the door from view after animation completes (5s)
        setTimeout(() => {
            door.style.display = "none";
        }, 5000);

        // Show the diver after 3 seconds
        setTimeout(() => {
            const diver = document.getElementById("diver");
            diver.style.opacity = "1"; // Make the diver visible
            diver.classList.add("dive"); // Start diving animation
        }, 7500); // 3 seconds delay

        // Show the flip card images after 13 seconds
        setTimeout(() => {
            const slider = document.querySelector(".slider");
            slider.style.opacity = "1"; // Make the slider visible
            slider.style.visibility = "visible"; // Ensure it's not hidden
        }, 13000); // 13 seconds delay
    });

    // Handle custom video looping
    function handleVideoLoop() {
        // When the video finishes the first 12 seconds, jump to 12 second mark on subsequent loops
        if (video.currentTime >= 65) {
            video.currentTime = 12; // Jump to 12 second mark to start the loop
        }
    }

    // Image Flip Animation (unchanged)
    const images = document.querySelectorAll(".sea img");
    let index = 0; // Start from the first image
    let isFlipping = false;

    function animateImages() {
        if (isFlipping) return; // Prevent overlapping animations

        // Get the current image at front-center
        const currentImage = images[index];
        const flipImageSrc = currentImage.parentElement.dataset.flip;

        // Fade out before flipping
        setTimeout(() => {
            isFlipping = true;
            currentImage.classList.add("fade-out");

            setTimeout(() => {
                currentImage.src = flipImageSrc; // Change to Flip image
                currentImage.classList.remove("fade-out");
                currentImage.classList.add("fade-in");

                // Hold Flip image for 2 seconds
                setTimeout(() => {
                    currentImage.classList.remove("fade-in");
                    currentImage.classList.add("fade-out");

                    setTimeout(() => {
                        currentImage.src = `assets/images/Sea_ani${index + 1}.jpeg`; // Change back to Sea_ani image
                        currentImage.classList.remove("fade-out");
                        currentImage.classList.add("fade-in");

                        // Move to the next image (left to right)
                        index = (index + 1) % images.length;
                        isFlipping = false;
                        setTimeout(animateImages, 1000); // Delay before next transition
                    }, 500); // Smooth fade-in effect
                }, 2000);
            }, 500); // Smooth fade-in effect
        }, 1000);
    }

    animateImages(); // Start animation loop

    // Move Diver to Clicked Flip Card and Show Video Popup
    const flipCards = document.querySelectorAll(".sea");
    flipCards.forEach((card, cardIndex) => {
        card.addEventListener("click", () => {
            const diver = document.getElementById("diver");
            const cardRect = card.getBoundingClientRect();

            // Calculate the center of the flip card
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;

            // Move the diver smoothly to the flip card
            diver.classList.add("move");
            diver.style.left = `${cardCenterX}px`;
            diver.style.top = `${cardCenterY}px`;
            
            // After diver reaches the card, show the video popup
            setTimeout(() => {
                // Set the video source based on which card was clicked
                popupVideo.src = cardVideos[cardIndex];
                
                // Show the video popup
                videoPopupContainer.classList.remove("video-popup-hidden");
                videoPopupContainer.classList.add("video-popup-visible");
                
                // Load and play the video
                popupVideo.load();
                popupVideo.play();
                
                // Pause the background video while popup is active
                video.pause();
            }, 1000); // Time for diver to reach the card

            // Reset diver position after popup is shown
            setTimeout(() => {
                diver.classList.remove("move");
                diver.style.left = "50%";
                diver.style.top = "20%";
            }, 2000);
        });
    });
    
    // Close popup when close button is clicked
    closeButton.addEventListener("click", function() {
        closeVideoPopup();
    });
    
    // Close popup when clicking outside the video
    videoPopupContainer.addEventListener("click", function(e) {
        if (e.target === videoPopupContainer) {
            closeVideoPopup();
        }
    });
    
    // Function to close the video popup
    function closeVideoPopup() {
        // Hide the popup
        videoPopupContainer.classList.add("video-popup-hidden");
        videoPopupContainer.classList.remove("video-popup-visible");
        
        // Pause the video
        popupVideo.pause();
        
        // Resume the background video
        video.play();
    }
});