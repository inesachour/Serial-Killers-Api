// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Initial theme setup
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        document.body.classList.add('dark');
        themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        
        // Update icon
        if (document.body.classList.contains('dark')) {
            themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('ri-sun-line', 'ri-moon-line');
            localStorage.setItem('theme', 'light');
        }
    });
});