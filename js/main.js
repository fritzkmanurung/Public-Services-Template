/**
 * Public Service Portal - Main Utilities
 */

// Simple Toast Notification
function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 9999;
        `;
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
        background: var(--bg-card);
        color: var(--text-main);
        padding: 12px 24px;
        border-radius: var(--radius-sm);
        box-shadow: var(--shadow-md);
        border-left: 4px solid var(--color-${type === 'error' ? 'accent' : 'primary'});
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}" style="color: var(--color-${type === 'error' ? 'accent' : 'primary'})"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add keyframes for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Floating Chat Widget
document.addEventListener('DOMContentLoaded', () => {
    // Inject global header/footer styles if needed could go here, but avoiding complexity

    const chatBtn = document.createElement('button');
    chatBtn.innerHTML = '<i class="fas fa-comments"></i>';
    chatBtn.title = "Help Chat";
    chatBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: var(--color-accent);
        color: white;
        border: none;
        box-shadow: var(--shadow-lg);
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 990;
        transition: transform 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    chatBtn.onmouseover = () => chatBtn.style.transform = 'scale(1.1)';
    chatBtn.onmouseout = () => chatBtn.style.transform = 'scale(1)';
    chatBtn.onclick = () => showToast('Chatbot Demo: Hello! How can we help you today?');

    document.body.appendChild(chatBtn);

    // Initial Auth Check
    checkAuth();

    // Mobile Menu Toggle
    setupMobileMenu();
});

// Mobile Menu Handler
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-toggle')) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });

        // Close menu when clicking a nav link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }
}

// Auth Simulation Logic
function checkAuth() {
    const user = localStorage.getItem('user');
    // Target the "Login/Register" button container in header
    // We look for a link that points to login.html or contains "Login" text if possible, but structure is specific
    const loginLink = document.querySelector('a[href*="login.html"]');
    const authContainer = loginLink ? loginLink.parentElement : null;

    if (user && authContainer) {
        // Change "Login/Register" to User Profile
        // We replace the container content to show user dropdown
        authContainer.innerHTML = `
            <div style="position: relative; display: inline-block;">
                <button onclick="toggleProfileMenu()" class="btn btn-outline" style="border: none; padding: 5px 10px; display: flex; align-items: center; gap: 10px;">
                    <img src="https://ui-avatars.com/api/?name=${user}&background=0d9488&color=fff" style="width: 35px; height: 35px; border-radius: 50%;">
                    <span style="font-weight: 500;">${user}</span>
                    <i class="fas fa-chevron-down" style="font-size: 0.8rem;"></i>
                </button>
                <div id="profile-menu" style="display: none; position: absolute; right: 0; top: 120%; width: 220px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-sm); box-shadow: var(--shadow-lg); z-index: 1000; overflow: hidden;">
                    <div style="padding: 15px; border-bottom: 1px solid var(--border-color); background: var(--bg-body);">
                        <small style="text-transform: uppercase; font-size: 0.7rem; color: var(--text-muted); font-weight: 700;">Signed in as</small>
                        <div style="font-weight: 600; text-overflow: ellipsis; overflow: hidden;">${user}</div>
                    </div>
                    <a href="../user/status.html" style="display: block; padding: 12px 15px; color: var(--text-main); transition: background 0.2s;"><i class="fas fa-list-alt" style="margin-right: 8px; color: var(--color-primary);"></i> My Applications</a>
                    <a href="../user/profile.html" style="display: block; padding: 12px 15px; color: var(--text-main); transition: background 0.2s;"><i class="fas fa-user-cog" style="margin-right: 8px; color: var(--text-muted);"></i> Settings</a>
                    <div style="border-top: 1px solid var(--border-color);"></div>
                    <a href="#" onclick="logout()" style="display: block; padding: 12px 15px; color: var(--color-accent); transition: background 0.2s;"><i class="fas fa-sign-out-alt" style="margin-right: 8px;"></i> Sign Out</a>
                </div>
            </div>
        `;
    }
}

function toggleProfileMenu() {
    const menu = document.getElementById('profile-menu');
    if (menu) {
        const isVisible = menu.style.display === 'block';
        menu.style.display = isVisible ? 'none' : 'block';

        // Close when clicking outside
        if (!isVisible) {
            document.addEventListener('click', closeMenuOutside);
        }
    }
}

function closeMenuOutside(e) {
    if (!e.target.closest('#profile-menu') && !e.target.closest('button[onclick="toggleProfileMenu()"]')) {
        const menu = document.getElementById('profile-menu');
        if (menu) menu.style.display = 'none';
        document.removeEventListener('click', closeMenuOutside);
    }
}

function logout() {
    localStorage.removeItem('user');
    showToast('You have been signed out.');
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}
