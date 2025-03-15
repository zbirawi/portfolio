const list = document.querySelectorAll('.list');

function activate() {
    list.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
}

list.forEach(item => item.addEventListener('click', activate));


function createStars() {
    const starsContainer = document.getElementById('stars-container');
    const numStars = 250; // Adjust number of stars as needed

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        // Random size
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Random twinkle delay
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animation = 'twinkle 3s infinite';

        starsContainer.appendChild(star);
    }
}

class Star {
    constructor(container) {
        this.element = document.createElement('div');
        this.container = container;
        this.init();
    }

    init() {
        this.element.classList.add('star');
        
        // Randomize star properties
        const size = Math.random() * 3;
        this.element.style.width = `${size}px`;
        this.element.style.height = `${size}px`;

        // Initial positioning
        this.element.style.left = `${Math.random() * 100}%`;
        this.element.style.top = `${Math.random() * 100}%`;

        // Opacity and twinkle
        this.element.style.animationDelay = `${Math.random() * 5}s`;
        this.element.style.animation = 'twinkle 3s infinite';

        this.container.appendChild(this.element);
    }

    createFallingStar() {
        const fallingStar = document.createElement('div');
        fallingStar.classList.add('falling-star');

        // Randomize falling star properties
        const angle = Math.random() * Math.PI / 4 + Math.PI / 6; // 30-45 degree angle
        const length = Math.random() * 200 + 100; // 100-300px length
        const speed = Math.random() * 3 + 2; // 2-5 seconds duration
        const brightness = Math.random() * 0.5 + 0.5; // 50-100% brightness

        fallingStar.style.cssText = `
            position: absolute;
            width: ${length}px;
            height: 1px;
            background: linear-gradient(to right, rgba(255,255,255,${brightness}) 0%, rgba(255,255,255,0) 100%);
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            transform: rotate(${angle}rad);
            animation: falling-star ${speed}s linear;
            z-index: 1;
        `;

        this.container.appendChild(fallingStar);

        // Remove the falling star after animation
        setTimeout(() => {
            fallingStar.remove();
        }, speed * 1000);
    }
}

function createStarfield() {
    const starsContainer = document.getElementById('stars-container');
    const numStars = 250;
    const stars = [];

    // Create regular stars
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star(starsContainer));
    }

    // Falling star mechanism
    function spawnFallingStar() {
        const randomStar = stars[Math.floor(Math.random() * stars.length)];
        randomStar.createFallingStar();

        // Random interval between falling stars
        setTimeout(spawnFallingStar, Math.random() * 5000 + 3000);
    }

    // Start spawning falling stars
    spawnFallingStar();
}

// Initialize starfield when page loads
window.addEventListener('load', createStarfield);


      
      // Add mouse movement effect
      projectCard.addEventListener('mousemove', (e) => {
        const rect = projectCard.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top; // y position within the element
        
        // Calculate rotation based on mouse position
        const rotateY = ((x / rect.width) - 0.5) * 20; // -10 to 10 degrees
        const rotateX = ((y / rect.height) - 0.5) * -20; // 10 to -10 degrees
        
        // Apply the rotation
        projectCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.05)`;
      });
      
      // Reset transform on mouse leave
      projectCard.addEventListener('mouseleave', () => {
        projectCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        setTimeout(() => {
          projectCard.style.transform = '';
        }, 300);
      });
      
      projectsContainer.appendChild(projectCard);

  
  // Handle navigation active state
  function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav a');
    const sections = document.querySelectorAll('section');
    
    // Add click event to smooth scroll
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // Update active class
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
      });
    });
    
    // Update active class on scroll
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
  
  // Enhanced parallax effect for galaxy background
  function setupParallax() {
    document.addEventListener('mousemove', (e) => {
      const stars = document.querySelectorAll('.star');
      const shootingStars = document.querySelectorAll('.shooting-star');
      const nebula = document.querySelector('.nebula');
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Move stars at different speeds for parallax effect
      stars.forEach((star, index) => {
        // Different layers of stars move at different speeds
        let speed;
        if (star.classList.contains('star-small')) {
          speed = 0.01;
        } else if (star.classList.contains('star-medium')) {
          speed = 0.02;
        } else {
          speed = 0.03;
        }
        
        const offsetX = (x - 0.5) * speed * 100;
        const offsetY = (y - 0.5) * speed * 100;
        
        star.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
      
      // Move nebula slowly for a deep space effect
      nebula.style.transform = `translate(${(x - 0.5) * -20}px, ${(y - 0.5) * -20}px)`;
    });
  }
  
  // Contact form submission (just placeholder)
  function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (name && email && message) {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
      } else {
        alert('Please fill in all fields.');
      }
    });
  }
  
  // Periodically add new shooting stars
  function addPeriodicShootingStars() {
    setInterval(() => {
      const galaxyBackground = document.getElementById('galaxyBackground');
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      
      // Random position and angle
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const angle = 45 + (Math.random() * 30 - 15);
      
      shootingStar.style.left = `${startX}px`;
      shootingStar.style.top = `${startY}px`;
      shootingStar.style.transform = `rotate(${angle}deg)`;
      
      // Animation duration
      const duration = 2 + Math.random() * 4;
      shootingStar.style.animationDuration = `${duration}s`;
      
      galaxyBackground.appendChild(shootingStar);
      
      // Remove shooting star after animation completes
      setTimeout(() => {
        shootingStar.remove();
      }, duration * 1000);
    }, 3000); // Add new shooting star every 3 seconds
  }
  
  // Initialize everything when the DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    createGalaxyBackground();
    setupSkillsCircle();
    createProjects();
    setupNavigation();
    setupParallax();
    setupContactForm();
    addPeriodicShootingStars();
  });
  document.addEventListener("DOMContentLoaded", function () {
    const skills = document.querySelectorAll(".skill");

    skills.forEach(skill => {
        skill.addEventListener("mouseenter", () => {
            let fire = document.createElement("div");
            fire.classList.add("fire-effect");
            fire.innerHTML = "🔥";
            fire.style.position = "absolute";
            fire.style.fontSize = "2em";
            fire.style.top = Math.random() * 50 + "%";
            fire.style.left = Math.random() * 100 + "%";
            fire.style.opacity = 1;
            fire.style.transition = "opacity 1s ease, transform 1s ease";
            skill.appendChild(fire);

            setTimeout(() => {
                fire.style.opacity = 0;
                fire.style.transform = "translateY(-20px)";
                setTimeout(() => fire.remove(), 1000);
            }, 500);
        });
    });
});
