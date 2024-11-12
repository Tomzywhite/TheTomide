// Google Form POST URL
const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSektOvdxh5DSJhBERdJ-Lrw2nH4umiDznnkQw6G8FTf4Cg5Fw/formResponse"; // Corrected URL

// Project data
const projects = [
    {
        id: 1,
        title: "Birthday Web",
        description: "A web application created to celebrate my mom's birthday.",
        link: "https://birthtom.vercel.app"
    },
    {
        id: 2,
        title: "Love Web",
        description: "A web application created to celebrate my commitment to my girlfriend.",
        link: "https://livtommy.vercel.app"
    },
    {
        id: 3,
        title: "Dein Web",
        description: "A web application created to celebrate my good friend",
        link: "https://deinty.vercel.app"
    },
    {
        id: 4,
        title: "Portfolio",
        description: "A web application created to showcase my skills and projects.",
        link: "https://deinty.vercel.app"
    }
];

// Function to generate the project gallery dynamically
function generateProjectGallery() {
    const projectGallery = document.querySelector(".projects-gallery");
    projectGallery.innerHTML = ""; // Clear existing content

    projects.forEach((project) => {
        const projectItem = createProjectItem(project);
        projectGallery.appendChild(projectItem);
    });
}

// Function to create a project item element
function createProjectItem(project) {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");

    projectItem.innerHTML = `
        <a href="${project.link}" target="_blank" rel="noopener noreferrer">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        </a>
    `;

    return projectItem;
}

// Handle form submission to Google Forms
async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = gatherFormData();
    if (!formData) return; // Validation failed

    console.log("Form Data Submitted:", formData.toString()); // Log form data

    try {
        await submitForm(formData);
        displayFeedback("Thank you for your message! We'll get back to you soon.", true);
        document.getElementById("contact-form").reset();
    } catch (error) {
        console.error("Form submission error:", error); // Log error
        displayFeedback("Error submitting the form. Please try again later.", false);
    }
}

// Function to gather form data
function gatherFormData() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const number = document.getElementById("number").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (!name || !email || !number || !message) {
        displayFeedback("Please fill in all fields.", false);
        return null; // Return null if validation fails
    }

    // Google Forms entry IDs (confirm each ID with your form)
    const formData = new URLSearchParams();
    formData.append("entry.2005620554", name);     // Name field ID
    formData.append("entry.1045781291", email);    // Email field ID
    formData.append("entry.1166974658", number);   // Phone Number field ID
    formData.append("entry.839337160", message);   // Message field ID

    return formData;
}

// Function to submit form data
async function submitForm(formData) {
    await fetch(googleFormURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData
    });
}

// Feedback function
function displayFeedback(message, isSuccess) {
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.textContent = message;
    feedbackElement.style.color = isSuccess ? "green" : "red";
}

// Run functions on load
document.addEventListener("DOMContentLoaded", () => {
    generateProjectGallery();
    document.getElementById("contact-form").addEventListener("submit", handleFormSubmit);
});
