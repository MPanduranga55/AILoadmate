// Dashboard data
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
  
  // DOM Elements
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');
  const loadList = document.querySelector('.load-list');
  const deliveryList = document.querySelector('.delivery-list');
  const paymentList = document.querySelector('.payment-list');
  const viewAllLoadsBtn = document.getElementById('view-all-loads');
  const viewAllDeliveriesBtn = document.getElementById('view-all-deliveries');
  const viewAllPaymentsBtn = document.getElementById('view-all-payments');
  const routeForm = document.getElementById('route-form');
  
  // Populate dashboard content
  function populateLoads() {
    if (!loadList) return;
    
    loadList.innerHTML = '';
    
    // Only show 2 top-matching loads on the dashboard
    availableLoads.slice(0, 2).forEach(load => {
      const loadItem = document.createElement('div');
      loadItem.className = 'load-item';
      
      loadItem.innerHTML = `
        <div class="load-header">
          <div>
            <span class="load-type">${load.type}</span>
            <div class="load-route">${load.pickup} → ${load.delivery}</div>
          </div>
          <div class="text-right">
            <div class="load-rate">${load.rate}</div>
            <div class="load-rate-per-km">₹${(parseInt(load.rate.replace(/\D/g, '')) / load.distance).toFixed(2)}/km</div>
          </div>
        </div>
        <div class="load-details">${load.date} • ${load.distance} km • ${load.weight}</div>
        <div class="load-footer">
          <div class="load-match">${load.matchScore}% Match</div>
          <button class="btn btn-outline">View Details</button>
        </div>
      `;
      
      loadList.appendChild(loadItem);
    });
  }
  
  function populateDeliveries() {
    if (!deliveryList) return;
    
    deliveryList.innerHTML = '';
    
    // Only show in-transit deliveries
    upcomingDeliveries.filter(d => d.status === 'In Transit').forEach(delivery => {
      const deliveryItem = document.createElement('div');
      deliveryItem.className = 'delivery-item';
      
      deliveryItem.innerHTML = `
        <span class="delivery-status">${delivery.status}</span>
        <div class="delivery-route">${delivery.pickup} → ${delivery.delivery}</div>
        <div class="delivery-date">Deliver by: ${delivery.deliveryDate}</div>
        <div class="progress-bar">
          <div class="progress" style="width: ${delivery.progress}%"></div>
        </div>
        <div class="progress-text">${delivery.progress}% complete</div>
      `;
      
      deliveryList.appendChild(deliveryItem);
    });
  }
  
  function populatePayments() {
    if (!paymentList) return;
    
    paymentList.innerHTML = '';
    
    recentPayments.forEach(payment => {
      const paymentItem = document.createElement('div');
      paymentItem.className = 'payment-item';
      
      paymentItem.innerHTML = `
        <div>
          <div class="payment-date">${payment.date}</div>
          <div class="payment-ref">Ref: ${payment.ref}</div>
        </div>
        <div>
          <div class="payment-amount">${payment.amount}</div>
          <div class="payment-status ${payment.status.toLowerCase()}">${payment.status}</div>
        </div>
      `;
      
      paymentList.appendChild(paymentItem);
    });
  }
  
  // Tab navigation
  function switchTab(tabId) {
    // Update active nav item
    navItems.forEach(item => {
      if (item.id === tabId + '-tab') {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // Show selected tab content
    tabContents.forEach(content => {
      if (content.id === tabId + '-content') {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
  }
  
  // Route planning form submission
  function handleRouteSubmit(e) {
    e.preventDefault();
    // In a real implementation, this would send the data to a server
    // and update the map with the response
    alert('Route calculated successfully!');
  }
  
  // Initialize dashboard
  document.addEventListener('DOMContentLoaded', () => {
    // Populate dashboard with data
    populateLoads();
    populateDeliveries();
    populatePayments();
    
    // Add event listeners for tab navigation
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = item.id.replace('-tab', '');
        switchTab(tabId);
      });
    });
    
    // View all buttons redirect to respective tabs
    if (viewAllLoadsBtn) {
      viewAllLoadsBtn.addEventListener('click', () => {
        switchTab('loads');
      });
    }
    
    if (viewAllDeliveriesBtn) {
      viewAllDeliveriesBtn.addEventListener('click', () => {
        switchTab('deliveries');
      });
    }
    
    if (viewAllPaymentsBtn) {
      viewAllPaymentsBtn.addEventListener('click', () => {
        switchTab('payments');
      });
    }
    
    // Route form submission
    if (routeForm) {
      routeForm.addEventListener('submit', handleRouteSubmit);
    }
    
    // Animation for dashboard elements
    const scrollElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in');
    
    function displayElement(element) {
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
    }
    
    scrollElements.forEach(element => {
      displayElement(element);
    });
  });