# OneClick Problem Solver

A web application that uses your front-facing camera to capture images of problems (math, puzzles, etc.) and solves them instantly using AI.

## 🚀 Features

- **One-Click Solution**: Simply position a problem in front of your camera and click capture
- **Front-Facing Camera**: Uses your device's front camera for easy problem positioning
- **AI-Powered**: Integrates with OpenRouter API for advanced problem solving
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-Time Preview**: See what your camera captures before solving

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: ShadCN UI + Tailwind CSS
- **Testing**: Vitest + React Testing Library
- **AI**: OpenRouter API with DeepSeek Chat model
- **Deployment**: GitHub Pages

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/oneclick-problem-solver.git
   cd oneclick-problem-solver
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your OpenRouter API key to .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Run tests**
   ```bash
   npm run test
   ```

## 🌐 Live Demo

Visit the live application: [OneClick Problem Solver](https://yourusername.github.io/oneclick-problem-solver/)

## 📝 How It Works

1. **Enable Camera**: Grant camera permissions when prompted
2. **Position Problem**: Hold a problem (on paper or screen) in front of your camera
3. **Capture**: Click the "Capture" button to take a snapshot
4. **Get Answer**: The AI analyzes the image and provides the solution

## 🔧 Configuration

### Environment Variables

- `VITE_OPENROUTER_API_KEY`: Your OpenRouter API key (required)

### Deployment

The app is configured for GitHub Pages deployment with GitHub Actions:

1. **Manual Deployment**
   ```bash
   npm run deploy
   ```

2. **Automatic Deployment**
   - Push to `main` branch triggers automatic deployment
   - Tests must pass before deployment
   - Add `VITE_OPENROUTER_API_KEY` to GitHub repository secrets

## 🧪 Testing

The project uses Test-Driven Development (TDD) with comprehensive test coverage:

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm run test -- --watch
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Ensure all tests pass: `npm run test`
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [OpenRouter API](https://openrouter.ai/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.