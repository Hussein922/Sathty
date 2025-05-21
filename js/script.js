document.addEventListener('contextmenu', event => {
    event.preventDefault(); // Disable right-click
    console.log('Right-click is disabled for this page.');
});

document.addEventListener('keydown', event => {
    // Disable F12 (Developer Tools)
    if (event.keyCode === 123) {
        event.preventDefault();
        console.log('F12 (Developer Tools) is disabled.');
    }

    // Disable Ctrl+Shift+I (Developer Tools - Chrome/Edge/Firefox)
    if (event.ctrlKey && event.shiftKey && event.keyCode === 'I'.charCodeAt(0)) {
        event.preventDefault();
        console.log('Ctrl+Shift+I (Developer Tools) is disabled.');
    }

    // Disable Ctrl+Shift+J (Developer Tools Console - Chrome/Edge)
    if (event.ctrlKey && event.shiftKey && event.keyCode === 'J'.charCodeAt(0)) {
        event.preventDefault();
        console.log('Ctrl+Shift+J (Developer Tools Console) is disabled.');
    }

    // Disable Ctrl+U (View Page Source)
    if (event.ctrlKey && event.keyCode === 'U'.charCodeAt(0)) {
        event.preventDefault();
        console.log('Ctrl+U (View Page Source) is disabled.');
    }
});

// Optional: Add a simple console log to confirm script is running
console.log('Website scripts loaded successfully.');

// Note: Client-side JavaScript cannot provide 100% security against determined users.
// These measures are primarily to deter casual copying and viewing source code.
