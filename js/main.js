document.addEventListener('contextmenu', event => event.preventDefault()); // Disable right-click
document.addEventListener('keydown', event => {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U (Developer Tools & View Source)
    if (event.keyCode == 123 ||
        (event.ctrlKey && event.shiftKey && event.keyCode == 'I'.charCodeAt(0)) ||
        (event.ctrlKey && event.shiftKey && event.keyCode == 'J'.charCodeAt(0)) ||
        (event.ctrlKey && event.keyCode == 'U'.charCodeAt(0))) {
        event.preventDefault();
    }
});

// Simple script to potentially enhance user experience (e.g., smooth scroll if anchors are used)
// Currently, no specific interactive elements beyond links, but good practice to have.
// You can add more complex JavaScript here if needed in the future.
