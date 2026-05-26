# Property Tax Analytics Dashboard

> A modern AI-powered analytics platform designed for the UPYOG multi-tenant ecosystem

![React](https://img.shields.io/badge/React-19.2.6-blue)
![Vite](https://img.shields.io/badge/Vite-8.0.12-purple)
![Node](https://img.shields.io/badge/Node-Express-green)
![AI](https://img.shields.io/badge/AI-Anthropic-orange)

## 🎯 Overview

Property Tax Analytics Dashboard is an advanced analytics platform that provides comprehensive insights into property tax data across multiple cities. It features real-time analytics, interactive visualizations, and an AI-powered chat assistant for intelligent data analysis.

**Key Features:**
- 📊 Real-time property tax analytics
- 🤖 AI-powered chat assistant (Claude)
- 📈 Interactive data visualizations
- 🏙️ Multi-city performance tracking
- 💰 Collection analytics and insights
- 🎨 Modern, responsive UI with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 19.2.6** - UI library
- **Vite 8.0.12** - Build tool
- **Tailwind CSS 4.3.0** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express 4.18.2** - Web framework
- **CORS** - Cross-origin support
- **Dotenv** - Environment management

### AI Integration
- **Anthropic Claude** - AI chat assistant
- **Claude 3.5 Sonnet** - Default model

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- Anthropic API key ([Get one here](https://console.anthropic.com/))

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/alookik27/Property-Tax-Analytics.git
cd Property-Tax-Analytics
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=sk-ant-your-actual-api-key
PORT=5000
VITE_API_URL=http://localhost:5000
```

### 4. Run Development Servers

**Terminal 1 - Backend Server:**
```bash
npm run server
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend Dev Server:**
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

### 6. Preview Production Build

```bash
npm run preview
```

## 🏗️ Project Structure

```
Property-Tax-Analytics/
├── src/
│   ├── Components/
│   │   ├── AIChat.jsx              # AI chat interface
│   │   ├── Analytics.jsx           # Analytics dashboard
│   │   └── ...                     # Other components
│   ├── App.jsx
│   └── main.jsx
├── server.js                        # Express backend (API proxy)
├── package.json
├── .env.example
├── vite.config.js
└── README.md
```

## 🤖 AI Integration

### How It Works

1. **Frontend Request** - User sends a question through the chat interface
2. **Backend Proxy** - Request sent to `/api/chat` endpoint on backend
3. **Secure API Call** - Backend adds API key and forwards to Anthropic
4. **AI Response** - Claude processes the request with property tax dataset context
5. **Display Result** - Response displayed in chat interface

### Why Backend Proxy?

✅ **Security** - API key never exposed in browser  
✅ **CORS** - Handles cross-origin requests properly  
✅ **Flexibility** - Easy to add caching, rate limiting, etc.  
✅ **Scalability** - Can add middleware and logging  

### API Endpoint

**POST** `/api/chat`

Request body:
```json
{
  "systemPrompt": "You are an AI assistant for...",
  "messages": [
    {
      "role": "user",
      "content": "Which city has the highest collection?"
    }
  ]
}
```

Response:
```json
{
  "content": [
    {
      "text": "Based on the analytics..."
    }
  ]
}
```

## 📊 Features

### Analytics Dashboard
- City-wise performance metrics
- Property status breakdown (Approved/Rejected/Pending)
- Collection amount tracking
- Real-time data filtering

### AI Chat Assistant
- Context-aware responses using dataset
- Natural language queries
- Example questions for quick access
- Loading states and error handling
- Beautiful animated UI

### Data Analytics
- Calculate city statistics
- Aggregate property statuses
- Collection totals
- Comparative analysis

## 🔐 Security

- ✅ API keys stored securely in backend `.env`
- ✅ No sensitive data exposed in frontend
- ✅ CORS properly configured
- ✅ Environment variables for sensitive data
- ✅ Backend proxy for all external API calls

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Anthropic API key | `sk-ant-...` |
| `PORT` | Backend server port | `5000` |
| `VITE_API_URL` | Frontend API URL | `http://localhost:5000` |

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000
# Kill the process if needed
kill -9 <PID>
```

### API key error
- Verify `ANTHROPIC_API_KEY` is set correctly in `.env`
- Ensure `.env` is in the root directory
- Restart backend server after updating `.env`

### CORS errors
- Ensure backend is running on `http://localhost:5000`
- Check `VITE_API_URL` matches backend URL
- Clear browser cache and restart

### Chat not responding
- Check browser console for errors
- Verify backend logs for API errors
- Ensure Anthropic API key is valid and has quota

## 📈 Performance Optimization

- ✅ React 19 with automatic memoization
- ✅ Vite for fast module replacement (HMR)
- ✅ Tailwind CSS for optimized styling
- ✅ Framer Motion for smooth animations
- ✅ Code splitting via Vite

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Alookik Gupta**
- GitHub: [@alookik27](https://github.com/alookik27)

## 🙏 Acknowledgments

- [Anthropic](https://www.anthropic.com/) - Claude AI
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [UPYOG](https://www.upyog.org/) - Multi-tenant ecosystem

## 📞 Support

For support, email or open an issue on GitHub.

---

**Happy analyzing! 🚀**
