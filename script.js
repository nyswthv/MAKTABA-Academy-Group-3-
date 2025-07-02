document.addEventListener('DOMContentLoaded', function() {
    // Get the modals
    const loginModal = document.getElementById("loginModal");
    const signupModal = document.getElementById("signupModal");
    const searchResultsModal = document.getElementById("searchResultsModal");

    // Get the buttons that open the modals
    const openLoginBtn = document.getElementById("openLoginModal");
    const openSignupBtn = document.getElementById("openSignupModal");
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById('searchInput'); // Moved here for better scope

    // Get the <span> elements that close the modals
    const closeLoginBtn = document.getElementById("closeLoginModal");
    const closeSignupBtn = document.getElementById("closeSignupModal");
    const closeSearchResultsBtn = document.getElementById("closeSearchResultsModal");

    // Get the switch links
    const switchToSignupLink = document.getElementById("switchToSignup");
    const switchToLoginLink = document.getElementById("switchToLogin");

    // Get search results elements
    const resultsList = document.getElementById('resultsList');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const searchLoadingIndicator = document.getElementById('searchLoadingIndicator'); // New: Loading indicator

    // --- Modal Management Functions ---

    function openModal(modal) {
        modal.style.display = "block";
        // Optional: Add a class to body to prevent scrolling if needed
        // document.body.classList.add('modal-open');
    }

    function closeModal(modal) {
        modal.style.display = "none";
        // Optional: Remove body class
        // document.body.classList.remove('modal-open');
    }

    // --- Event Listeners for Modals ---

    if (openLoginBtn) {
        openLoginBtn.addEventListener('click', function(event) {
            event.preventDefault();
            openModal(loginModal);
        });
    }

    if (openSignupBtn) {
        openSignupBtn.addEventListener('click', function(event) {
            event.preventDefault();
            openModal(signupModal);
        });
    }

    if (closeLoginBtn) {
        closeLoginBtn.addEventListener('click', function() {
            closeModal(loginModal);
        });
    }

    if (closeSignupBtn) {
        closeSignupBtn.addEventListener('click', function() {
            closeModal(signupModal);
        });
    }

    if (closeSearchResultsBtn) {
        closeSearchResultsBtn.addEventListener('click', function() {
            closeModal(searchResultsModal);
        });
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            closeModal(loginModal);
        }
        if (event.target === signupModal) {
            closeModal(signupModal);
        }
        if (event.target === searchResultsModal) {
            closeModal(searchResultsModal);
        }
    });

    // --- Modal Switcher Links ---

    if (switchToSignupLink) {
        switchToSignupLink.addEventListener('click', function(event) {
            event.preventDefault();
            closeModal(loginModal);
            openModal(signupModal);
        });
    }

    if (switchToLoginLink) {
        switchToLoginLink.addEventListener('click', function(event) {
            event.preventDefault();
            closeModal(signupModal);
            openModal(loginModal);
        });
    }

    // --- Basic Search Functionality ---

    // Sample data (consider fetching this dynamically in a real app)
    const contentData = [
        {
            title: "MAKTABA Academy Overview",
            description: "We offer specialized support in English academic writing, including in-text citation, reference list formatting, and other essential academic skills.",
            url: "index.html"
        },
        {
            title: "Digital Literacy Lecture - August 26, 2025",
            description: "The Library will host a special lecture on 'Digital Literacy in the 21st Century' at 2:00 PM in the Main Hall.",
            url: "#"
        },
        {
            title: "New Library Arrivals",
            description: "Explore the latest additions to our collection, including novels, historical archives, and literature classics.",
            url: "#"
        },
        {
            title: "Extended Library Hours - Starting July 1st",
            description: "Starting July 1st, library operating hours will be extended to 9:00 PM on weekdays to accommodate evening study sessions.",
            url: "#"
        },
        {
            title: "About Us - History",
            description: "Learn about the history of Maktaba Academy.",
            url: "History.html"
        },
        {
            title: "About Us - Vision, Mission, Objective",
            description: "Understand our vision, mission, and objectives.",
            url: "VMO.html"
        },
        {
            title: "Directory Staff - Chief Librarian",
            description: "Information about the Chief Librarian.",
            url: "chiefs.html"
        },
        {
            title: "Directory Staff - Organizational Chart",
            description: "View the organizational chart of Maktaba Academy.",
            url: "organization.html"
        },
        // Add more relevant content from your website here
    ];

    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        resultsList.innerHTML = ''; // Clear previous results
        noResultsMessage.style.display = 'none'; // Hide no results message
        searchLoadingIndicator.style.display = 'none'; // Hide loading indicator by default

        if (searchTerm === "") {
            closeModal(searchResultsModal); // Hide modal if search is empty
            return;
        }

        searchLoadingIndicator.style.display = 'block'; // Show loading indicator

        // Simulate a delay for a "real" search experience (remove in production if not needed)
        setTimeout(() => {
            const filteredResults = contentData.filter(item =>
                item.title.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm)
            );

            searchLoadingIndicator.style.display = 'none'; // Hide loading indicator after "search"

            if (filteredResults.length > 0) {
                filteredResults.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <h4><a href="${item.url}">${item.title}</a></h4>
                        <p>${item.description}</p>
                    `;
                    resultsList.appendChild(listItem);
                });
            } else {
                noResultsMessage.style.display = 'block';
            }
            openModal(searchResultsModal); // Show the search results modal
        }, 500); // Simulate 0.5 second search time
    }

    // Handle Sign-up Form Submission
    const signupForm = document.getElementById('signupForm');
    const signupMessage = document.getElementById('signupMessage');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent default form submission

            signupMessage.textContent = ''; // Clear previous messages

            const username = document.getElementById('signupUsername').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;

            if (password !== confirmPassword) {
                signupMessage.textContent = 'Passwords do not match!';
                return;
            }

            try {
                // *** THIS IS WHERE YOU'D SEND DATA TO YOUR BACKEND ***
                // Replace with your actual backend API endpoint
                // For demonstration, we'll just simulate a delay and success/failure.
                console.log('Attempting to sign up:', { username, email, password });
                
                const response = await new Promise(resolve => setTimeout(() => {
                    if (username && email && password) { // Basic client-side check
                        resolve({ ok: true, json: () => Promise.resolve({ message: 'Sign up successful!' }) });
                    } else {
                        resolve({ ok: false, json: () => Promise.resolve({ message: 'Missing required fields.' }) });
                    }
                }, 1000)); // Simulate network delay

                const data = await response.json(); // Assuming your backend returns JSON

                if (response.ok) {
                    signupMessage.style.color = 'green';
                    signupMessage.textContent = data.message || 'Sign up successful! You can now log in.';
                    signupForm.reset();
                    // Optionally, redirect to login or auto-login
                    setTimeout(() => {
                        closeModal(signupModal);
                        openModal(loginModal);
                    }, 2000);
                } else {
                    signupMessage.style.color = 'red';
                    signupMessage.textContent = data.message || 'Sign up failed. Please try again.';
                }
            } catch (error) {
                console.error('Error during sign-up:', error);
                signupMessage.style.color = 'red';
                signupMessage.textContent = 'An error occurred. Please try again later.';
            }
        });
    }

    // Handle Login Form Submission
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent default form submission

            loginMessage.textContent = ''; // Clear previous messages

            const usernameOrEmail = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            try {
                // *** THIS IS WHERE YOU'D SEND DATA TO YOUR BACKEND ***
                // Replace with your actual backend API endpoint
                // For demonstration, we'll just simulate a delay and success/failure.
                console.log('Attempting to log in:', { usernameOrEmail, password });

                const response = await new Promise(resolve => setTimeout(() => {
                    // Simulate successful login for specific credentials
                    if (usernameOrEmail === 'user' && password === 'password123') {
                        resolve({ ok: true, json: () => Promise.resolve({ message: 'Login successful!', token: 'mock-token-123', username: 'user' }) });
                    } else {
                        resolve({ ok: false, json: () => Promise.resolve({ message: 'Invalid credentials.' }) });
                    }
                }, 1000)); // Simulate network delay

                const data = await response.json(); // Assuming your backend returns JSON

                if (response.ok) {
                    loginMessage.style.color = 'green';
                    loginMessage.textContent = data.message || 'Login successful! Redirecting...';
                    // Store user token/session info (e.g., in localStorage)
                    localStorage.setItem('userToken', data.token); // Example
                    localStorage.setItem('username', data.username); // Example

                    // Redirect to a dashboard or home page
                    setTimeout(() => {
                        window.location.href = 'index.html'; // Or a user-specific dashboard
                    }, 1500);
                } else {
                    loginMessage.style.color = 'red';
                    loginMessage.textContent = data.message || 'Login failed. Invalid credentials.';
                }
            } catch (error) {
                console.error('Error during login:', error);
                loginMessage.style.color = 'red';
                loginMessage.textContent = 'An error occurred. Please try again later.';
            }
        });
    }
});