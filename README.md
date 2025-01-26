<div align="center">

# 🚀 gen-readme

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://www.npmjs.com/package/@okenneth1964/gen-readme)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D16-brightgreen.svg)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> AI-powered README generator

<p align="center">
  <img src="https://raw.githubusercontent.com/your-org/gen-readme/main/assets/demo.gif" alt="gen-readme demo" width="600">
</p>

[Key Features](#-key-features) •
[Installation](#-installation) •
[Usage](#-usage) •
[Documentation](#-documentation) •
[Contributing](#-contributing)

</div>

## ✨ Key Features

- 🤖 **AI-Powered Analysis** - Leverages Google's Gemini model for intelligent code analysis
- 📝 **Smart Generation** - Creates comprehensive README files with all essential sections
- 🔍 **Code Structure Detection** - Automatically detects and documents project structure
- 📊 **Dependency Analysis** - Parses and categorizes project dependencies
- 📈 **Mermaid Diagrams** - Generates architecture and flow diagrams automatically
- 🎨 **Beautiful CLI** - Interactive command-line interface with colorful output
- 🔄 **Merge Support** - Smart merging with existing README files
- ⚡ **Fast & Efficient** - Optimized file scanning and processing

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16
- npm or yarn
- Google Gemini API key

### 📥 Installation

```bash
npm install -g gen-readme
```

### Usage

```bash
gen-readme [path]
```

**Example:**

```bash
gen-readme ./my-project
```

or

```bash
gen-readme # This will scan the current directory
```

### Interactive Mode

```bash
gen-readme -i
```

### Advanced Options

| Option | Description |
|--------|-------------|
| `-c, --codebase` | Specify codebase path |
| `-f, --force` | Force overwrite existing README |
| `-m, --merge` | Merge with existing README |
| `-i, --interactive` | Interactive mode |

## 📖 Documentation

### CLI Architecture

```mermaid
graph TD
A[CLI Entry] --> B{Parse Options}
B --> C[Interactive Mode]
B --> D[Direct Mode]
C --> E[File Scanner]
D --> E
E --> F[Code Analyzer]
F --> G[README Generator]
G --> H{Existing README?}
H -->|Yes| I[Merge Content]
H -->|No| J[Write New File]
```

### Features

- AI-powered code analysis
- Automatic generation of detailed README.md files
- Support for code structure detection and dependency parsing
- Integration with Mermaid for diagram generation
- Customizable templates



### Dependencies

**Runtime:**

- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
- [commander](https://www.npmjs.com/package/commander)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [fast-glob](https://www.npmjs.com/package/fast-glob)
- [ora](https://www.npmjs.com/package/ora)
- [chalk](https://www.npmjs.com/package/chalk)
- [mermaid](https://www.npmjs.com/package/mermaid)
- [badge-maker](https://www.npmjs.com/package/badge-maker)

### Contributing
-Fork the repo
-Create a new branch
-Make your changes
-Commit your changes
-Push your changes
-Create a pull request

Contributions are welcome! Please read the [contributing guidelines](https://github.com/your-org/gen-readme/blob/main/CONTRIBUTING.md) before submitting a pull request.

**Development:**

- [esbuild](https://www.npmjs.com/package/esbuild)
- [jest](https://www.npmjs.com/package/jest)

### License

MIT
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- Google Gemini for AI capabilities
- Osei Ansah
- Expo Ghana Community
- Samuel Agbenyo
- All our [contributors](https://github.com/your-org/gen-readme/graphs/contributors)

<div align="center">

Made with ❤️ by [@Okenneth1964](https://github.com/Okenneth1964)

</div>