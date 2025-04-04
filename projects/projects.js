function showContent(section) {
    // Hide all content boxes
    document.querySelectorAll('.content-box').forEach(box => box.style.display = 'none');

    // Show the selected section
    document.getElementById(section).style.display = 'block';

    // Remove 'active' class from all nav boxes
    document.querySelectorAll('.info-box').forEach(box => box.classList.remove('active'));

    // Add 'active' class to the clicked box
    const activeBox = document.querySelector(`.info-box[onclick="showContent('${section}')"]`);
    activeBox.classList.add('active');
}


const image = document.querySelector(".image-box img");
const section = document.querySelector(".image-box");

window.addEventListener("scroll", () => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate scroll progress from 0 to 1
    const scrollProgress = 1 - Math.min(Math.max(rect.top / windowHeight, 0), 1);

    // Apply scaling: from 1 to 1.15 smoothly
    const scaleX = 1 + scrollProgress * 0.35;

    // Combine scaling only in X-axis
    image.style.transform = `scale(${scaleX})`;
    // image.style.transition = "transform 0.3s ease-in-out";
});


// Select both carousels (desktop and mobile)
const carousels = document.querySelectorAll('.carousel-container');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const container = entry.target;
            container.classList.add('active');
            container.classList.remove('inactive');

            // Apply animation class to carousel-track inside the container
            const track = container.querySelector('.carousel-track');
            if (container.classList.contains('mobile')) {
                track.classList.add('animate-mobile');
            } else {
                track.classList.add('animate-desktop');
            }

            observer.unobserve(container); // Run only once
        }
    });
}, { threshold: 0.4 });

carousels.forEach(carousel => observer.observe(carousel));
