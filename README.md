# Interactive Home Workout Dashboard

A modern, interactive workout dashboard built with Next.js, Tailwind CSS, and Chart.js. This app provides a Push/Pull/Legs & Abs workout plan using only bodyweight and resistance bands, with interactive charts, exercise details, and AI-powered exercise variations.

## Features

- **Tabbed Navigation:** Switch between Push, Pull, and Legs & Abs days, with sub-tabs for different routines.
- **Interactive Exercise Cards:** Click to expand for details and get AI-powered exercise variations.
- **Charts:** Visualize workout time distribution and muscle group focus using Chart.js.
- **Progression Path:** Clear steps for progressive overload.
- **Responsive Design:** Looks great on all devices.
- **Modern UI:** Built with Tailwind CSS and custom styles.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, React 18)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm (or yarn)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd workout-dashboard
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

- **AI-Powered Variations:**
  - The "✨ More Variations" button uses the Google Gemini API. To enable, replace the placeholder API key in `src/app/page.js` with your own.
- **Styling:**
  - Edit `tailwind.config.js` and `src/app/globals.css` for custom colors and styles.
- **Content:**
  - All exercise data and chart data are in `src/app/page.js` for easy editing.

## Credits
- Workout plan and UI inspired by modern fitness dashboards.
- Built by [Your Name].

## License
[MIT](LICENSE)
