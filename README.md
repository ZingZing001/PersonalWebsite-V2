# 🌐 Personal Portfolio Website V2

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

This is the second version of my Personal Portfolio Website, completely rebuilt using modern web technologies. The website showcases my projects, skills, and achievements with stunning animations, interactive features, and a beautiful dark/light mode theme.

🌐 **Live Demo**: [zingzing001.github.io/PersonalWebsite-V2](https://zingzing001.github.io/PersonalWebsite-V2/)

## ✨ Features

- **Modern React Architecture** – Built with React 19 and Vite for lightning-fast performance
- **Stunning Dark/Light Mode** – Seamless theme switching with persistent preferences
- **Animated Meteor Background** – Dynamic meteor shower effect with twinkling stars in dark mode
- **Smooth Scroll Animations** – Snap scrolling from Hero to About section with smooth transitions
- **Interactive UI Components** – Glass-morphism effects, hover animations, and smooth transitions
- **Responsive Design** – Fully optimized for desktop, tablet, and mobile devices
- **Project Showcase** – Display your projects with live demo and GitHub repository links
- **Skills Section** – Organized skill categories with proficiency indicators and visual progress bars
- **Contact Form** – Interactive contact form with success animations and social media links
- **Typewriter Effect** – Eye-catching animated text in the hero section
- **Clean Code Architecture** – Well-structured components with reusable hooks

## 🚀 Technologies Used

### Frontend
- **React** 19.1.1 - Modern UI library
- **Vite** 7.1.7 - Next-generation build tool
- **React Router DOM** 7.9.4 - Client-side routing
- **TailwindCSS** 4.1.16 - Utility-first CSS framework

### UI/UX
- **Lucide React** - Beautiful icon library
- **Typewriter Effect** 2.22.0 - Animated typing effect
- **React Hot Toast** - Elegant notifications
- **Custom Animations** - Meteor effects, fade-ins, and smooth transitions

### Deployment
- **GitHub Pages** - Static site hosting
- **gh-pages** - Automated deployment

## 📂 Project Structure

```
/PersonalWebsite-V2
│── /public
│   │── /projects          # Project thumbnails and images
│   │── Runjia_Zhang_Resume.pdf
│── /src
│   │── /assets           # Images and static assets
│   │── /components       # React components
│   │   │── AboutSection.jsx
│   │   │── ContactSection.jsx
│   │   │── HeroSection.jsx
│   │   │── Meteors.jsx
│   │   │── Navbar.jsx
│   │   │── ProjectSection.jsx
│   │   │── SkillSection.jsx
│   │   │── StarBackground.jsx
│   │   │── ThemeToggle.jsx
│   │── /hooks            # Custom React hooks
│   │   │── useSnapScroll.js
│   │── /lib              # Utility functions
│   │   │── utils.js
│   │── /pages            # Page components
│   │   │── Home.jsx
│   │   │── NotFound.jsx
│   │── App.jsx
│   │── main.jsx
│   │── index.css         # Global styles and animations
│── index.html
│── package.json
│── vite.config.js
│── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ZingZing001/PersonalWebsite-V2.git
   cd PersonalWebsite-V2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## 🎨 Key Features Breakdown

### 🌙 Dark/Light Mode
- Persistent theme preference using localStorage
- Smooth color transitions
- Synchronized across all components
- Custom event system for theme updates

### 🌠 Meteor Background Effect
- Realistic meteor animation with glowing heads and blurred tails
- Random positioning and timing for natural appearance
- Fade-in/fade-out transitions
- Only visible in dark mode

### 📱 Responsive Navigation
- Fixed navbar with blur effect on scroll
- Mobile-friendly hamburger menu
- Smooth page transitions
- Integrated theme toggle

### 🎯 Snap Scrolling
- Smooth snap from Hero to About section
- Natural scrolling for remaining sections
- Touch-friendly for mobile devices
- Debounced scroll events to prevent noise

### 💼 Project Showcase
- Dynamic project cards with hover effects
- Live demo and GitHub repository links
- Technology tags
- Glass-morphism effects in dark mode

### 🎓 Skills Section
- Categorized skills display
- Visual proficiency indicators
- Gradient progress bars
- Staggered animations

### 📧 Contact Section
- Interactive form with validation
- Success animations
- Social media links (LinkedIn, GitHub, Instagram)
- Downloadable resume

## 🎨 Customization

### Adding Projects
Edit `src/components/ProjectSection.jsx`:

```javascript
const projects = [
  {
    id: 1,
    title: "Your Project",
    description: "Project description",
    image: `${import.meta.env.BASE_URL}projects/project-image.png`,
    tags: ["React", "TailwindCSS"],
    demoUrl: "https://your-demo-url.com",
    repoUrl: "https://github.com/your-repo"
  },
  // Add more projects...
];
```

### Adding Skills
Edit `src/components/SkillSection.jsx`:

```javascript
const skills = [
  {
    name: "Your Skill",
    category: "Category",
    level: 90, // Proficiency percentage
    icon: YourIcon // Import from lucide-react
  },
  // Add more skills...
];
```

### Updating Colors
Edit theme colors in `src/index.css`:

```css
:root {
  --primary: 250 47% 60%;
  --background: 210 40% 98%;
  /* Customize other colors */
}

.dark {
  --primary: 250 65% 65%;
  --background: 222 47% 4%;
  /* Customize dark mode colors */
}
```

## 🌟 Featured Sections

1. **Hero Section** - Welcome message with typewriter effect
2. **About Section** - Personal introduction and downloadable CV
3. **Skills Section** - Organized technical skills with proficiency levels
4. **Projects Section** - Showcase of featured projects
5. **Contact Section** - Get in touch form and social links

## 📝 License

This project is copyrighted and all rights are reserved. You may not copy, modify, or distribute any part of this project without explicit permission from the owner.

## 📬 Contact

💼 **Portfolio**: [zingzing001.github.io/PersonalWebsite-V2](https://zingzing001.github.io/PersonalWebsite-V2/)

📧 **Email**: [your-email@example.com](mailto:your-email@example.com)

👨‍💻 **GitHub**: [ZingZing001](https://github.com/ZingZing001)

🔗 **LinkedIn**: [Runjia Zhang](https://www.linkedin.com/in/runjiazhangnz/)

## 🙏 Acknowledgments

- Inspired by modern portfolio designs
- ABSOLUTE LEGEND tutorial from PedroTech [Video Made by the legend](https://www.youtube.com/watch?v=ifOJ0R5UQOc)
- Meteor effect tutorial from [freeCodeCamp](https://www.freecodecamp.org/news/how-to-create-a-meteor-effect-with-react-and-tailwindcss/)
- Icons from [Lucide React](https://lucide.dev/)
- Helps from Co-pilot on the visual effects and documentations
---

⭐ If you like this project, please consider giving it a star!

Built with ❤️ by Johnson Zhang
