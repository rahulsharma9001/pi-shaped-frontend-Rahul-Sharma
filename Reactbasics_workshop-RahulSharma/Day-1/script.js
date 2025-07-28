// Theme Toggle
const toggleBtn = document.getElementById('toggle-theme');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
});

// Dynamic Year
document.getElementById('year').textContent = new Date().getFullYear();

// Experience Button
const experienceBtn = document.getElementById('experience-btn');
const experienceText = document.getElementById('experience-text');
experienceBtn.addEventListener('click', () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2020;
  experienceText.textContent = `I have ${currentYear - startYear} years of coding experience.`;
});

// // Dynamic Skills List
// const skills = [
//   "Java", "Selenium", "TestNG", "Postman", "JMeter", "Gatling", "JavaScript",
//   "HTML", "CSS", "Spring Boot", "Docker", "Git", "CI/CD", "Terraform"
// ];
// const skillsList = document.getElementById('skills-list');
// skills.forEach(skill => {
//   const li = document.createElement('li');
//   li.textContent = skill;
//   skillsList.appendChild(li);
// });

// Project Data
const projects = [
  {
    title: "HealX Framework",
    description: "A self-healing test automation framework that uses ML to fix broken locators."
  },
  {
    title: "CI Pipeline Slack Integration",
    description: "Real-time alert system for CI failures with Slack notifications."
  },
  {
    title: "Gatling Performance Test Suite",
    description: "Load testing setup for critical APIs using advanced Gatling strategies."
  }
];

// Render Projects
const projectList = document.getElementById('project-list');
projects.forEach(project => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
  `;
  projectList.appendChild(card);
});

// Contact Form Validation
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();

  if (!name || !email) {
    formMessage.textContent = "Please fill in your name and email.";
    formMessage.style.color = "red";
    return;
  }

  formMessage.textContent = "Thank you! Message sent successfully.";
  formMessage.style.color = "green";
  form.reset();
});
