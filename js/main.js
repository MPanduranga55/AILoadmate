// DOM elements
const scrollElements = document.querySelectorAll('.animate-on-scroll');
const mobileMenuButton = document.querySelector('.mobile-menu-btn');
const navbarMenu = document.querySelector('.navbar-menu');
const loginBtn = document.getElementById('loginBtn');
const driverLoginBtn = document.getElementById('driverLoginBtn');
const loginModal = document.getElementById('loginModal');
const modalClose = document.querySelector('.modal-close');
const tabBtns = document.querySelectorAll('.tab-btn');
const loginForms = document.querySelectorAll('.login-form');
const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.testimonial-nav-btn.prev');
const nextBtn = document.querySelector('.testimonial-nav-btn.next');
const indicators = document.querySelectorAll('.indicator');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// Scroll animation
const elementInView = (el, scrollOffset = 0) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= 
    (window.innerHeight || document.documentElement.clientHeight) * (1 - scrollOffset)
  );
};

const displayScrollElement = (element) => {
  element.classList.add('animate-visible');
};

const hideScrollElement = (element) => {
  element.classList.remove('animate-visible');
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 0.25)) {
      displayScrollElement(el);
    } else {
      hideScrollElement(el);
    }
  });
};

// Mobile menu toggle
const toggleMobileMenu = () => {
  const isVisible = navbarMenu.style.display === 'block';
  
  if (isVisible) {
    navbarMenu.style.display = 'none';
  } else {
    navbarMenu.style.display = 'block';
  }
};

// Modal functionality
const openModal = () => {
  loginModal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  loginModal.classList.remove('active');
  document.body.style.overflow = '';
};

// Tab functionality
const switchTab = (e) => {
  const tabName = e.target.getAttribute('data-tab');
  
  // Update active tab button
  tabBtns.forEach(btn => {
    btn.classList.remove('active');
  });
  e.target.classList.add('active');
  
  // Show selected form
  loginForms.forEach(form => {
    if (form.getAttribute('data-form') === tabName) {
      form.classList.add('active');
    } else {
      form.classList.remove('active');
    }
  });
};

// Testimonial slider
let currentTestimonial = 0;

const showTestimonial = (index) => {
  // Update indicator
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
  });
  
  // If it's a desktop view with all testimonials shown, don't do anything
  if (window.innerWidth >= 768) return;
  
  // For mobile view, show only one testimonial at a time
  testimonialCards.forEach((card, i) => {
    if (i === index) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};

const nextTestimonial = () => {
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
  showTestimonial(currentTestimonial);
};

const prevTestimonial = () => {
  currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
  showTestimonial(currentTestimonial);
};

// Form submission
const handleContactSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  
  const name = formData.get('name');
  const email = formData.get('email');
  const company = formData.get('company');
  const message = formData.get('message');
  
  // In a real implementation, you would send this data to a server
  console.log('Contact form submitted:', { name, email, company, message });
  
  // Show success message
  alert('Thank you for your message! We will get back to you soon.');
  contactForm.reset();
};

const handleNewsletterSubmit = (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  
  // In a real implementation, you would send this data to a server
  console.log('Newsletter subscription:', email);
  
  // Show success message
  alert('Thank you for subscribing to our newsletter!');
  e.target.reset();
};

// Driver Dashboard Data (for demonstration)
const availableLoads = [
  {
    id: 1,
    type: 'Full Truckload',
    pickup: 'Mumbai, MH',
    delivery: 'Delhi, DL',
    date: 'Apr 10, 2023',
    distance: 1415,
    weight: '18 tonnes',
    rate: '₹55,000',
    matchScore: 96
  },
  {
    id: 2,
    type: 'LTL',
    pickup: 'Bangalore, KA',
    delivery: 'Chennai, TN',
    date: 'Apr 11, 2023',
    distance: 350,
    weight: '12 tonnes',
    rate: '₹22,000',
    matchScore: 92
  },
  {
    id: 3,
    type: 'Container',
    pickup: 'Ahmedabad, GJ',
    delivery: 'Pune, MH',
    date: 'Apr 12, 2023',
    distance: 545,
    weight: '20 tonnes',
    rate: '₹35,000',
    matchScore: 87
  }
];

const upcomingDeliveries = [
  {
    id: 1,
    pickup: 'Kolkata, WB',
    delivery: 'Hyderabad, TS',
    deliveryDate: 'Apr 08, 2023',
    status: 'In Transit',
    progress: 65
  },
  {
    id: 2,
    pickup: 'Jaipur, RJ',
    delivery: 'Lucknow, UP',
    deliveryDate: 'Apr 14, 2023',
    status: 'Scheduled',
    progress: 0
  }
];

const recentPayments = [
  {
    id: 1,
    date: 'Apr 02, 2023',
    ref: 'PMT-2023-001',
    amount: '₹42,500',
    status: 'Completed'
  },
  {
    id: 2,
    date: 'Mar 28, 2023',
    ref: 'PMT-2023-002',
    amount: '₹38,750',
    status: 'Completed'
  },
  {
    id: 3,
    date: 'Mar 22, 2023',
    ref: 'PMT-2023-003',
    amount: '₹29,800',
    status: 'Completed'
  }
];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Initial scroll animation check
  handleScrollAnimation();
  
  // For mobile testimonial view
  if (window.innerWidth < 768) {
    testimonialCards.forEach((card, i) => {
      if (i === 0) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  // Event listeners
  window.addEventListener('scroll', handleScrollAnimation);
  
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
  }
  
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      openModal();
      tabBtns[0].classList.add('active');
      tabBtns[1].classList.remove('active');
      loginForms[0].classList.add('active');
      loginForms[1].classList.remove('active');
    });
  }
  
  if (driverLoginBtn) {
    driverLoginBtn.addEventListener('click', () => {
      openModal();
      tabBtns[1].classList.add('active');
      tabBtns[0].classList.remove('active');
      loginForms[1].classList.add('active');
      loginForms[0].classList.remove('active');
    });
  }
  
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  // Close modal when clicking outside the content
  window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      closeModal();
    }
  });
  
  // Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', switchTab);
  });
  
  // Testimonial navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
  }
  
  // Indicator click events
  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
      currentTestimonial = i;
      showTestimonial(i);
    });
  });
  
  // Form submissions
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});