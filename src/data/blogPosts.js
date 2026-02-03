// Blog posts data - add new posts here
// Posts are sorted by date (newest first) when displayed

export const blogPosts = [
  {
    id: 7,
    slug: "spotto-hackathon-building-under-pressure",
    title: "Spotto Hackathon: Building Under Pressure",
    date: "2026-01-28",
    excerpt: "Participating in the Spotto Hackathon at EROAD—a day of intense coding, creative problem-solving, and team collaboration.",
    tags: ["Hackathon", "EROAD", "Team Building", "Innovation"],
    readTime: "4 min read",
    image: `${import.meta.env.BASE_URL}blog/SpottoHackathon.JPG`,
    content: \`
## The Thrill of a Hackathon

Hackathons are a unique beast. Take tight deadlines, add a dash of creativity, mix in some caffeine, and you get an environment where innovation thrives under pressure.

![Spotto Hackathon](${import.meta.env.BASE_URL}blog/SpottoHackathon.JPG)
*Our team at the Spotto Hackathon—focused, caffeinated, and ready to build!*

### What is Spotto?

The Spotto Hackathon was an internal event at EROAD where teams competed to build innovative solutions in a limited timeframe. It was a fantastic opportunity to step outside our regular work and let creativity take the lead.

### The Experience

What made this hackathon special wasn't just the coding—it was the collaboration. Working intensively with teammates, bouncing ideas off each other, and iterating rapidly showed me the power of focused teamwork.

**Key Takeaways:**

1. **Constraints breed creativity** - Limited time forced us to prioritize ruthlessly
2. **Prototyping > Perfection** - A working demo beats a perfect plan
3. **Team dynamics matter** - Good communication can accelerate development exponentially
4. **Fun fuels productivity** - When you're enjoying the work, you produce better results

### Why Hackathons Matter

Beyond the immediate outcomes, hackathons are incredible learning experiences. You get to:

- Try new technologies without the pressure of production
- Work with people you might not normally collaborate with
- Practice pitching ideas and solutions
- Build something tangible in a short time

### Looking Forward

I hope to participate in more hackathons—both internal and external. There's something magical about that concentrated burst of creativity and building. If you ever get the chance to join one, do it. You won't regret it!
    \`
  },
  {
    id: 6,
    slug: "eroad-internship-reflections-more-than-just-code",
    title: "EROAD Internship Reflections: More Than Just Code",
    date: "2026-02-03",
    excerpt: "Looking back on my AI & Business Internship at EROAD—the lessons learned, the amazing people, and how this experience shaped me as both a developer and a person.",
    tags: ["Internship", "Career", "EROAD", "Personal Growth"],
    readTime: "8 min read",
    image: `${import.meta.env.BASE_URL}blog/InternLunch.JPG`,
    content: \`
## Looking Back on an Incredible Journey

As my internship at EROAD comes to an end, I find myself reflecting on what has been one of the most transformative experiences of my career so far. What started on November 26th, 2025 has turned into so much more than just a work placement—it's been a masterclass in professional growth, teamwork, and what it truly means to be part of a great company.

![Intern team lunch](${import.meta.env.BASE_URL}blog/InternLunch.JPG)
*Our intern team enjoying lunch together—moments like these made the internship special.*

### The People Make the Difference

If there's one thing I'll take away from EROAD, it's the incredible people I've had the privilege to work with. Our manager, Olivier Fransolet, gave us opportunities I never expected as an intern—from attending seminars and conferences to working on real, impactful projects.

But what really stood out was seeing EROAD's core values come to life every single day:

**"We Play as a Team"**

When we were working on a critical P1 issue with tight deadlines, the squad truly came together. Travis and Mike doubled their workload to peer-review solutions, ensuring quality while keeping us moving fast. Ramy supported us by expediting everything outside of development, making our work incredibly smooth.

**"We Learn and Grow"**

Mike exemplified this perfectly. Despite having tens—if not hundreds—of meetings and events to attend, he always made time to help us understand the Power Automate system. He never made us feel like a burden; instead, he treated every question as an opportunity for us to learn.

**"We Get It Done" and "We Do What's Right"**

These values really shone during the billing issue we tackled. Mike would always consult with Ramy, even when time was tight, to ensure the work we were doing was correct. As he put it, we were there to correct data, not generate more problems for others to deal with.

### Beyond Technical Skills

Through this experience, I didn't just learn about Power Automate, AI agents, or enterprise systems. I learned about:

- **Empathy in engineering** - Standing in others' shoes when solving problems
- **The importance of doing things right** - Even under pressure
- **True teamwork** - Where everyone lifts each other up
- **The business side of tech** - Seeing engineering from a different perspective

### Friendships That Last

One unexpected gift from this internship has been the friendships I've made—not just with colleagues, but with fellow interns who I know will be part of my journey for years to come. We went through challenges together, celebrated wins together, and grew together.

![Running the barista station at company BBQ](${import.meta.env.BASE_URL}blog/RunningBristaForCompanyBBQ.JPG)
*Running the barista station at the company BBQ—getting involved in the EROAD community beyond just coding!*

From intern lunches to company BBQs where I got to run the barista station, every event was an opportunity to connect with amazing people. These weren't just networking opportunities—they were genuine moments of fun and connection that made EROAD feel like a second home.

![The 2026 EROAD Intern Team](${import.meta.env.BASE_URL}blog/InternAtEroad2026.JPG)
*The 2026 EROAD Intern Team—friends for life!*

### Thank You, EROAD

To everyone at EROAD who made this experience possible—thank you. You've not only helped me become a better developer but a better person. The lessons I've learned here will stay with me throughout my career.

Here's to new beginnings, armed with everything this incredible team has taught me. 🚀
    \`
  },
  {
    id: 5,
    slug: "tackling-a-p1-incident-lessons-from-the-trenches",
    title: "Tackling a P1 Incident: Lessons from the Trenches",
    date: "2026-01-20",
    excerpt: "What happens when billing data goes wrong? A deep dive into my experience working on a critical production issue and the valuable lessons learned about system architecture.",
    tags: ["Engineering", "Problem Solving", "EROAD", "Architecture"],
    readTime: "5 min read",
    image: null,
    content: \`
## When Things Go Wrong in Production

After completing our work on AI agents, our team was pulled into something completely different—a P1 incident. Customer billing data was incorrect or corrupted, caused by potential data loss in a previous layer of our system.

### The Challenge

This wasn't a simple bug fix. We were dealing with:
- **Corrupted data** affecting real customer bills
- **Multiple system layers** to investigate
- **Tight deadlines** to resolve the issue
- **High stakes** - incorrect billing directly impacts customers

### What I Learned

#### 1. The Importance of System Architecture

This experience gave me a front-row seat to why good architecture matters. When data flows through multiple layers, each layer needs to be reliable. A problem in one layer cascades down, and untangling it becomes exponentially harder.

\`\`\`
Data Flow:
Source → Processing Layer → Billing System → Customer
         ↑
    (Issue originated here)
\`\`\`

#### 2. The Business Side of Engineering

As engineering students, we often focus purely on the technical side—algorithms, data structures, clean code. But this experience showed me the **other side of the business**. When billing is wrong, it's not just a technical bug; it affects customer trust and company reputation.

#### 3. Moving Fast Without Breaking Things

The pressure was on to fix things quickly, but our team never compromised on quality. Every change was reviewed, every solution validated. We were correcting data, not creating more chaos.

### The Power of Automation

One silver lining: the automation solutions we built saved significant time. What could have been weeks of manual data correction became manageable through the tools we developed.

### Key Takeaways

- **Architecture matters** - Invest in it early
- **Data integrity is critical** - Especially for billing systems
- **Teamwork accelerates everything** - Multiple eyes catch more issues
- **Pressure reveals character** - And our team's character was exceptional

This experience was invaluable. It's one thing to learn about production incidents in theory; it's another to be in the trenches solving them.
    \`
  },
  {
    id: 4,
    slug: "building-ai-agents-from-conferences-to-production",
    title: "Building AI Agents: From Conferences to Production",
    date: "2026-01-10",
    excerpt: "My journey learning Microsoft Copilot and building AI agents for enterprise use—applying software engineering principles to a brand new technology.",
    tags: ["AI", "Microsoft Copilot", "Agents", "Software Engineering"],
    readTime: "7 min read",
    image: `${import.meta.env.BASE_URL}blog/MicrosoftAIConference.JPG`,
    content: \`
## Diving Into the World of AI Agents

When I started my AI & Business Internship at EROAD, I had no idea I'd be working with cutting-edge technology like Microsoft Copilot agents. Thanks to opportunities provided by my manager Olivier, I got to attend numerous seminars and conferences—both online and in-person—that opened my eyes to what's possible with AI in the enterprise.

![Microsoft AI Conference](${import.meta.env.BASE_URL}blog/MicrosoftAIConference.JPG)
*Attending the Microsoft AI Conference—learning directly from the experts.*

### Learning From the Experts

The conferences were incredible. Getting to hear directly from Microsoft and industry experts about Copilot agents gave us insights that you simply can't get from documentation alone. We learned about:

- Agent architecture and design patterns
- Best practices for enterprise deployment
- Real-world use cases and success stories
- Common pitfalls and how to avoid them

![Microsoft AI Conference networking](${import.meta.env.BASE_URL}blog/MicrosoftAiConference2.JPG)
*Networking and learning at the conference—invaluable experiences for any aspiring AI developer.*

### From Learning to Building

The real magic happened when we took that knowledge and applied it at EROAD. I had the opportunity to build several agents for different departments:

#### 1. Enterprise System Agent
Built for the Enterprise Systems team to streamline their workflows and automate routine queries.

#### 2. Email Manager Agent
Developed for Mark to help manage and organize email communications more efficiently.

#### 3. Employee Travel Agent
An agent to assist with employee travel arrangements and related queries.

### Applying Software Engineering Principles

What surprised me most was how much my university coursework applied to building AI agents. This wasn't just about prompting—it was real software engineering:

**Requirements Engineering**

We started with thorough requirements gathering. What exactly does the client need? The goal was to understand the true requirements without limiting the scope to just what we initially discussed. This is a common pitfall in software projects—building exactly what was asked for instead of what was actually needed.

**MVP and Prototyping**

\`\`\`
Development Flow:
Requirements → MVP Design → Prototype → User Testing → Feedback → MLP
\`\`\`

After understanding requirements, we designed a Minimum Viable Product (MVP) and built prototypes for testing. This iterative approach allowed us to validate ideas quickly.

**Feedback Loop**

Once we had a working prototype, we brought stakeholders back into the loop. Their feedback helped polish our MVP into a Minimum Lovable Product (MLP)—something users actually enjoy using.

### The Bigger Picture

Building these agents taught me that AI isn't magic—it's engineering. The same principles that make software projects successful apply here:

1. **Understand the problem** before jumping to solutions
2. **Iterate quickly** with feedback loops
3. **Test with real users** early and often
4. **Document everything** for future maintainability

### What's Next?

The AI agent space is evolving rapidly. What we built today will likely look primitive in a year. But the engineering principles? Those are timeless. I'm excited to see where this technology goes and to continue building solutions that make people's work lives easier.

If you're interested in AI agents, my advice: start with the fundamentals of good software engineering. The AI part is just another tool in your toolkit.
    \`
  },
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

Here's how simple it is to create a component in React:

\`\`\`jsx
import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
};
\`\`\`

### Design Philosophy

I wanted something that felt modern and unique. The cosmic theme with the star background creates an immersive experience while keeping the focus on the content.

For the star animation, I used CSS keyframes with \`animation-delay\` for a staggered effect:

\`\`\`css
@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.star {
  animation: twinkle 3s ease-in-out infinite;
}
\`\`\`

### Key Features

1. **Snap Scrolling** - Each section takes the full viewport
2. **Dark/Light Mode** - Respects user preferences
3. **Responsive Design** - Works on all devices
4. **Smooth Animations** - Subtle but engaging

The theme toggle uses a simple \`localStorage\` approach:

\`\`\`javascript
const toggleTheme = () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};
\`\`\`

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
