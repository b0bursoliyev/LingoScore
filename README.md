# 🌊 LingoScore: AI-Powered English Proficiency Assessment

LingoScore is a modern, full-stack web application designed to help English learners assess their proficiency level (A1-C2) using advanced AI analysis. Simply paste a writing sample, and get a detailed report across all four language domains.

![LingoScore UI](https://raw.githubusercontent.com/jules/lingoscore/main/public/preview.png) *(Placeholder for actual preview image)*

## ✨ Features

- **Instant CEFR Grading**: Get an immediate assessment from A1 (Beginner) to C2 (Proficient) based on your writing.
- **4-Domain Analysis**: Simulated scoring for Reading, Listening, Writing, and Speaking based on text complexity and lexical variety.
- **Detailed Feedback**:
  - **Core Strengths**: Highlights what you're doing well.
  - **Priority Improvements**: Actionable tips to reach the next proficiency level.
  - **Grammar & Vocabulary**: Insights into error rates and lexical diversity.
- **Professional PDF Export**: Download a beautifully formatted report of your results to track your progress or share with teachers.
- **Beautiful, Minimalist UI**: A "Deep Sea Blue" professional theme built for focus and clarity.

## 🚀 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router), [React](https://reactjs.org/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Backend**: Next.js API Routes (Node.js)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF), [html2canvas](https://html2canvas.hertzen.com/)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/lingoscore.git
   cd lingoscore
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   GOOGLE_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

The project includes unit and component tests to ensure reliability.

```bash
# Run all tests
npm test
```

## 📝 Usage Guidelines

- **Minimum Word Count**: To ensure an accurate assessment, the engine requires a minimum of **50 words**.
- **Assessment Logic**: Currently, the application uses a sophisticated heuristic-based mock engine. It is designed to be easily connected to the Google Gemini API or OpenAI API for production-grade AI analysis.

## 🗺️ Roadmap

- [ ] Integration with Google Gemini API for real-time LLM analysis.
- [ ] User accounts to track assessment history over time.
- [ ] Support for multiple languages (Spanish, French, German, etc.).
- [ ] Speech-to-text integration for actual speaking assessment.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for English learners everywhere.
