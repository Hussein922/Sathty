/* Custom Properties for Colors */
:root {
    --primary-color: #000033; /* Dark Blue */
    --secondary-color: #000066; /* Slightly Lighter Dark Blue for Gradient */
    --accent-color: #00FF00; /* Green */
    --text-color: #FFFFFF; /* White */
    --footer-text-color: #CCCCCC; /* Light Grey for Footer */
}

/* Base Styles */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: var(--text-color);
    line-height: 1.6;
    direction: rtl; /* Right-to-left for Arabic */
    text-align: right; /* Align text to the right */
    overflow-x: hidden; /* Prevent horizontal scroll */
    min-height: 100vh; /* Ensure full viewport height */
    display: flex;
    flex-direction: column;
}

/* Prevent text selection (copy-paste) */
body {
    -webkit-user-select: none;  /* Safari */
    -moz-user-select: none;     /* Firefox */
    -ms-user-select: none;      /* IE 10+ */
    user-select: none;          /* Standard */
}

/* Header */
header {
    background-color: rgba(0, 0, 0, 0.3);
    padding: 2rem 0;
    text-align: center;
    border-bottom: 2px solid var(--accent-color);
}

header h1 {
    margin: 0;
    font-size: 3rem;
    color: var(--accent-color);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

header p {
    font-size: 1.2rem;
    color: var(--text-color);
    margin-top: 0.5rem;
}

/* Main Content */
main {
    flex: 1; /* Allow main content to grow and push footer down */
    padding: 2rem;
    max-width: 1000px;
    margin: 0 auto;
    box-sizing: border-box; /* Include padding in element's total width and height */
}

.services {
    background-color: rgba(0, 0, 0, 0.4);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.services h2 {
    font-size: 2.5rem;
    color: var(--accent-color);
    text-align: center;
    margin-bottom: 2rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.service-item {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 8px;
    border-left: 5px solid var(--accent-color);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
}

.service-item h3 {
    color: var(--accent-color);
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 0.8rem;
}

.service-item p {
    color: var(--text-color);
    font-size: 1.1rem;
}

/* Footer */
footer {
    background-color: rgba(0, 0, 0, 0.3);
    color: var(--footer-text-color);
    text-align: center;
    padding: 1.5rem 0;
    border-top: 2px solid var(--accent-color);
    margin-top: auto; /* Push footer to the bottom */
}

footer a {
    color: var(--footer-text-color);
    text-decoration: none;
    transition: color 0.3s ease;
}

footer a:hover {
    color: var(--accent-color);
    text-decoration: underline;
}

/* Floating Buttons */
.floating-buttons {
    position: fixed;
    bottom: 20px;
    left: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    z-index: 1000;
}

.floating-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.floating-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 255, 0, 0.5);
}

.floating-btn img {
    width: 35px;
    height: 35px;
    filter: invert(1); /* Makes icons white if they are black */
}

.call-btn {
    background-color: #25D366; /* WhatsApp Green for consistency, or a blue for call */
}

.whatsapp-btn {
    background-color: #25D366; /* Official WhatsApp Green */
}

/* Responsive Design */
@media (max-width: 768px) {
    header h1 {
        font-size: 2.5rem;
    }

    header p {
        font-size: 1rem;
    }

    .services h2 {
        font-size: 2rem;
    }

    .service-item {
        padding: 1rem;
    }

    .service-item h3 {
        font-size: 1.5rem;
    }

    .service-item p {
        font-size: 1rem;
    }

    .floating-buttons {
        bottom: 15px;
        left: 15px;
        gap: 10px;
    }

    .floating-btn {
        width: 50px;
        height: 50px;
    }

    .floating-btn img {
        width: 30px;
        height: 30px;
    }
}

@media (max-width: 480px) {
    header h1 {
        font-size: 2rem;
    }

    header p {
        font-size: 0.9rem;
    }

    .services {
        padding: 1.5rem;
    }

    .services h2 {
        font-size: 1.8rem;
    }
}
