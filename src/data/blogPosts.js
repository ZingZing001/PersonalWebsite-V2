// Blog posts data - add new posts here
// Posts are sorted by date (newest first) when displayed

export const blogPosts = [
  {
    id: 1,
    slug: "building-my-portfolio-with-react",
    title: "Building My Portfolio with React & Vite",
    date: "2026-01-25",
    excerpt: "A deep dive into how I built this portfolio website using React, Vite, and Tailwind CSS. Learn about the design decisions and challenges I faced.",
    tags: ["React", "Vite", "Tailwind CSS", "Portfolio"],
    readTime: "5 min read",
    image: `${import.meta.env.BASE_URL}projects/project1.png`,
    content: `
## Why I Built a New Portfolio

As a developer, having a personal portfolio is essential. It's not just a place to showcase projects—it's a reflection of who you are as a developer.

### Tech Stack Choice

I chose **React** with **Vite** for several reasons:
- ⚡ Lightning-fast development experience
- 🔥 Hot Module Replacement (HMR)
- 📦 Optimized production builds

### Design Philosophy

I wanted something that felt modern and unique. The cosmic theme with the star background creates an immersive experience while keeping the focus on the content.

### Key Features

1. **Snap Scrolling** - Each section takes the full viewport
2. **Dark/Light Mode** - Respects user preferences
3. **Responsive Design** - Works on all devices
4. **Smooth Animations** - Subtle but engaging

### Lessons Learned

Building this portfolio taught me a lot about:
- Component composition in React
- CSS animations and transitions
- Accessibility considerations
- Performance optimization

### What's Next?

I plan to continue improving this site by adding:
- A blog section (you're reading it!)
- More interactive elements
- Additional project showcases

Thanks for reading! Feel free to reach out if you have any questions.
    `
  },
  {
    id: 2,
    slug: "my-journey-into-software-development",
    title: "My Journey into Software Development",
    date: "2026-01-20",
    excerpt: "From curious beginner to passionate developer—here's my story of how I discovered my love for coding and the path that led me here.",
    tags: ["Career", "Learning", "Personal"],
    readTime: "7 min read",
    image: null,
    content: `
## The Beginning

Everyone has a different path into software development. Mine started with curiosity and a desire to build things.

### First Steps

I remember writing my first "Hello World" program. It was simple, but the feeling of making a computer do what I wanted was magical.

### The Learning Curve

Learning to code isn't easy. There were moments of frustration, confusion, and doubt. But each challenge overcome made the next one easier.

### Key Milestones

- **First Project**: A simple calculator app
- **First Framework**: Learning React changed everything
- **First Contribution**: Open source contributions
- **First Job**: Turning passion into profession

### Advice for Beginners

If you're just starting out, here's what I wish someone had told me:

1. **Be patient** - Learning takes time
2. **Build projects** - Theory only gets you so far
3. **Join communities** - You're not alone
4. **Embrace failure** - Every bug is a lesson

### Looking Forward

The journey never really ends. There's always more to learn, more to build, and more problems to solve. That's what makes this field so exciting.
    `
  },
  {
    id: 3,
    slug: "top-vscode-extensions-for-developers",
    title: "Top VS Code Extensions Every Developer Needs",
    date: "2026-01-15",
    excerpt: "Boost your productivity with these must-have VS Code extensions. From code formatting to AI assistance, these tools will supercharge your workflow.",
    tags: ["VS Code", "Productivity", "Tools"],
    readTime: "4 min read",
    image: null,
    content: `
## Essential VS Code Extensions

VS Code is already powerful out of the box, but extensions take it to the next level.

### Code Quality

- **ESLint** - Catch errors before they happen
- **Prettier** - Consistent code formatting
- **Error Lens** - Inline error highlighting

### Productivity Boosters

- **GitHub Copilot** - AI-powered code suggestions
- **Auto Rename Tag** - Rename paired HTML tags
- **Path Intellisense** - Autocomplete file paths

### Visual Enhancements

- **Material Icon Theme** - Beautiful file icons
- **One Dark Pro** - Popular dark theme
- **Bracket Pair Colorizer** - Colored matching brackets

### Git Integration

- **GitLens** - Supercharged Git capabilities
- **Git Graph** - Visualize your repository

### Language Specific

- **ES7+ React Snippets** - React code snippets
- **Tailwind CSS IntelliSense** - Tailwind autocomplete

### My Setup

I use a combination of these extensions daily. The key is finding what works for your workflow and not overloading VS Code with too many extensions.

What are your favorite extensions? Let me know!
    `
  },
];

// Helper function to get posts sorted by date (newest first)
export const getSortedPosts = () => {
  return [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Helper function to get a post by slug
export const getPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

// Helper function to get latest N posts
export const getLatestPosts = (count = 3) => {
  return getSortedPosts().slice(0, count);
};
