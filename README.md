# 🌈 Prism Chat

<div align="center">
  
  <a href="https://github.com/sioaeko/prism-chat">
    <img src="https://github.com/user-attachments/assets/1b7ef391-ee59-436b-b25f-185bb6ae0d2c" alt="Prism Chat Main" width="100%" />
  </a>

  <p align="center">
    <a href="https://reactjs.org">
      <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    </a>
    <a href="https://www.typescriptlang.org">
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
    <a href="https://tailwindcss.com">
      <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    </a>
    <a href="https://vitejs.dev">
      <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" alt="MIT License" />
    </a>
  </p>

  <h2>🤖 Powerful AI Chat Platform based on Deepseek R1</h2>

  <p align="center">
    <b>
      <a href="#-features">Features</a> •
      <a href="#-getting-started">Getting Started</a> •
      <a href="#-installation">Installation</a> •
      <a href="#-usage">Usage</a> •
      <a href="#-tech-stack">Tech Stack</a>
    </b>
  </p>

  <p align="center">
    <a href="README.md">English</a> | <a href="README.ko.md">한국어</a>
  </p>

  <br />
</div>

## ✨ Features

<div align="center">
  <img src="https://github.com/user-attachments/assets/34c79977-96e8-4570-91b7-0d93b155522e" alt="Model Selection" width="100%" />
</div>

<br />

### 🎯 Key Features

- 🤖 **Multiple Model Sizes**
  | Model | Description | Best For |
  |-------|-------------|----------|
  | 1.5B | Ultra-lightweight model | Basic tasks, quick responses |
  | 7B | Efficient model | Everyday use, general queries |
  | 8B | Enhanced lightweight | Better comprehension |
  | 14B | Balanced model | Diverse tasks, good performance |
  | 32B | Large model | Complex reasoning, detailed responses |
  | 70B | Advanced model | Professional tasks, deep analysis |
  | 671B | Ultimate model | Maximum performance, expert-level tasks |

- 🔄 **Automatic Model Switching**
  - Seamless transition between installed Ollama models
  - Real-time model detection and integration
  - Per-chat model persistence

- 🌟 **Enhanced Features**
  - 🌍 Multilingual Support (Korean/English)
  - 💬 Advanced Chat Management
  - 🎨 Customizable Themes
  - 📱 Responsive Design
  - ⌨️ Smart Input Handling
  - 🔤 Flexible Font Controls

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- [Ollama](https://ollama.ai) with Deepseek R1 model

### Installation

1️⃣ Clone repository
```bash
git clone https://github.com/sioaeko/prism-chat.git
cd prism-chat
```

2️⃣ Install dependencies
```bash
npm install
```

3️⃣ Run Ollama and download models
```bash
# Default model (14B)
ollama run deepseek-r1:14b

# Additional models
ollama run deepseek-r1:1.5b  # Ultra-lightweight
ollama run deepseek-r1:7b    # Efficient
ollama run deepseek-r1:8b    # Enhanced lightweight
ollama run deepseek-r1:32b   # Large
ollama run deepseek-r1:70b   # Advanced
ollama run deepseek-r1:671b  # Ultimate
```

4️⃣ Start development server
```bash
npm run dev
```

## 💻 Usage

### Starting a Chat

<div align="center">
  <img src="https://github.com/user-attachments/assets/c1718f2d-53c6-439e-8eb4-4a108bae907b" alt="Chat Interface" width="100%" />
</div>

1. Click "New Chat" to begin
2. Choose your preferred model
3. Type your message
4. Send using Enter key or button

### Model Selection

<div align="center">
  <img src="https://github.com/user-attachments/assets/0af31ba3-1ec6-4f2d-a8b1-de89eeb71d57" alt="Settings" width="100%" />
</div>

The intelligent model selector offers:
- 🔍 Automatic detection of installed models
- 🔄 Instant model switching
- 💾 Per-chat model memory
- 🎯 Smart default selection

### Settings & Customization

Personalize your experience with:
- 🎨 **Theme Options**
  - Light mode for bright environments
  - Dark mode for low-light conditions
  - System-based automatic switching
- 📏 **Font Sizing**
  - Small for compact viewing
  - Medium for optimal readability
  - Large for enhanced visibility
- 🌐 **Language Selection**
  - English interface
  - Korean interface
- ⚡ **Quick Actions**
  - Enter key configuration
  - Shortcut customization

## 🛠 Tech Stack

<div align="center">
  <table>
    <tr>
      <td align="center" width="96">
        <img src="https://techstack-generator.vercel.app/react-icon.svg" alt="React" width="48" height="48" />
        <br>React
      </td>
      <td align="center" width="96">
        <img src="https://techstack-generator.vercel.app/ts-icon.svg" alt="TypeScript" width="48" height="48" />
        <br>TypeScript
      </td>
      <td align="center" width="96">
        <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/wind.svg" alt="Tailwind" width="48" height="48" />
        <br>Tailwind
      </td>
      <td align="center" width="96">
        <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/zap.svg" alt="Vite" width="48" height="48" />
        <br>Vite
      </td>
    </tr>
  </table>
</div>

## 💬 Chat Sample

<div align="center">
  <img src="https://github.com/user-attachments/assets/68a91c2d-f8d6-47f0-8714-6b23852adab0" alt="Chat Example" width="100%" />
</div>

## 📝 License

This project is [MIT](LICENSE) licensed.

## 🤝 Contributing

We welcome contributions! Here's how:

1. 🍴 Fork the Project
2. 🌿 Create your Feature Branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. 💾 Commit your Changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. 📤 Push to the Branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. 🔍 Open a Pull Request

## 📧 Contact

<div align="center">
  
  **Project Link:** [https://github.com/sioaeko/prism-chat](https://github.com/sioaeko/prism-chat)
  
  <br />
  
  <sub>Built with ❤️ by sioaeko</sub>
</div>
