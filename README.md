<div align="center">

# 🚀 docsage

[![Version](https://img.shields.io/badge/version-1.7.1-blue.svg)](https://www.npmjs.com/package/docsage)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D16-brightgreen.svg)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![npm](https://img.shields.io/npm/v/docsage)](https://www.npmjs.com/package/docsage)


> AI-powered README generator


[Key Features](#-key-features) •
[Installation](#-installation) •
[Usage](#-Usage) •
[Documentation](#-documentation) •
[Contributing](#-Contributing)

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
- 🔃 **GitHub Integration** - Create pull requests automatically with generated docs
- 🔐 **Secure** - Environment-based configuration for sensitive tokens

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16
- npm or yarn
- Google Gemini API key

### 📥 Installation

```bash
npm install -g docsage
```

### Usage

```bash
docsage [path]
```

**Example:**

```bash
docsage ./my-project
```

or

```bash
docsage # This will scan the current directory
```

### Interactive Mode

```bash
docsage -i
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
- [Osei Ansah](https://github.com/PapaDaCodr)
- [Expo Ghana Community](https://github.com/Sonnysam)
- [Samuel Agbenyo](https://github.com/Sonnysam)
- All our [contributors](https://github.com/your-org/gen-readme/graphs/contributors)

<div align="center">

Made with ❤️ by [@Okenneth1964](https://github.com/Okenneth1964)

</div>
Package Sidebar