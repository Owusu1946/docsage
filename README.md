## Docsage

<p align="center">
  <img src="https://user-images.githubusercontent.com/25349495/212863234-7a75e2ba-580b-4f61-80a8-27649390461c.png" alt="Docsage Logo" width="300" height="300" />
</p>

Docsage is an AI-powered documentation generator that leverages Google Gemini to swiftly and effortlessly craft sophisticated documentation.

### Installation

1. Clone the repository.
```sh
git clone https://github.com/Okenneth1964/docsage.git
```

2. Install the dependencies.
```sh
npm install
```

### Quick Setup

1. Create a `.env` file from the `.env.example` file in the root directory and fill in your Google Cloud Platform credentials.

2. Run `npm start` to start the Docsage command-line interface (CLI).

### Features

- **Google Gemini Integration:** Seamlessly generates documentation utilizing powerful language models like Gemini.
- **Code Scanning and Analysis:** Thoroughly scans codebases, extracting essential information for documentation.
- **Automated Documentation Generation:** Intelligently generates comprehensive and structured documentation based on code analysis.
- **File Format Support:** Supports generation of documentation in various file formats, including Markdown, HTML, and PDF.
- **Template Customization:** Provides customizable templates to tailor the appearance and content of your documentation.

### API Documentation

Docsage does not have an external API.

### Dependencies

**Runtime Dependencies**
- `@google/generative-ai` - Google Gemini client library
- `commander` - Command-line interface framework
- `dotenv` - Environment variables parser
- `fast-glob` - File globbing library
- `ora` - CLI spinner
- `chalk` - Terminal styling library
- `mermaid` - Graph visualization library
- `badge-maker` - Badge creation library
- `gradient-string` - Colorful string rendering library
- `boxen` - Box drawing library
- `figlet` - ASCII art generation library
- `nanospinner` - CLI progress spinner
- `cli-progress` - CLI progress bar
- `inquirer` - CLI prompt library

**Development Dependencies**
- `esbuild` - JavaScript bundler
- `jest` - Testing framework

### License

Docsage is licensed under the [MIT License](LICENSE).

### Contributing

Contributions to Docsage are welcome! Please follow the [contributing guidelines](CONTRIBUTING.md) to contribute to the project.