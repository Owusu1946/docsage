# Docsage

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="90" height="20" role="img" aria-label="version: 1.3.2"><title>version: 1.3.2</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="90" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="51" height="20" fill="#555"/><rect x="51" width="39" height="20" fill="#007ec6"/><rect width="90" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="265" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="410">version</text><text x="265" y="140" transform="scale(.1)" fill="#fff" textLength="410">version</text><text aria-hidden="true" x="695" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="290">1.3.2</text><text x="695" y="140" transform="scale(.1)" fill="#fff" textLength="290">1.3.2</text></g></svg> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="78" height="20" role="img" aria-label="license: MIT"><title>license: MIT</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="78" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="47" height="20" fill="#555"/><rect x="47" width="31" height="20" fill="#97ca00"/><rect width="78" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="245" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="370">license</text><text x="245" y="140" transform="scale(.1)" fill="#fff" textLength="370">license</text><text aria-hidden="true" x="615" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="210">MIT</text><text x="615" y="140" transform="scale(.1)" fill="#fff" textLength="210">MIT</text></g></svg> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="82" height="20" role="img" aria-label="node: 22.4.1"><title>node: 22.4.1</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="82" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="37" height="20" fill="#555"/><rect x="37" width="45" height="20" fill="#4c1"/><rect width="82" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="195" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="270">node</text><text x="195" y="140" transform="scale(.1)" fill="#fff" textLength="270">node</text><text aria-hidden="true" x="585" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="350">22.4.1</text><text x="585" y="140" transform="scale(.1)" fill="#fff" textLength="350">22.4.1</text></g></svg>


## Project Overview

Docsage is a powerful documentation generator that utilizes the cutting-edge generative AI capabilities of Google Gemini. It analyzes and generates comprehensive documentation from various codebases.

## Installation

To install Docsage, simply run:

```
npm i -g docsage
```

## Usage

After installation, you can generate documentation for your JavaScript codebases using the following command:

```
docsage <path_to_codebase>
```

For example:

```
docsage ./my-project
```

### CLI Commands

**Command:** `docsage`

| Flag | Description |
|---|---|
| `-c, --config` | Path to a custom configuration file |
| `-o, --output` | Output directory for generated documentation |
| `-f, --format` | Format of the generated documentation (options: markdown, html) |
| `-v, --version` | Print version information |
| `-h, --help` | Display help information |

## Key Features

- **AI-Powered Natural Language Generation:** Docsage leverages Google Gemini to automatically generate human-like documentation from your code.
- **Code Analysis:** It analyzes your codebase to gather information about functions, classes, variables, and their relationships.
- **Dependency Graph Visualization:** Docsage visualizes the dependencies between different parts of your codebase, providing a clear overview of the architecture.
- **API Documentation:** It extracts and documents API specifications, making it easy to understand the functionality of different modules.
- **Seamless Integration:** Docsage seamlessly integrates with GitHub and GitLab, allowing you to generate documentation directly from your code repository.

## API Documentation

The Docsage API provides access to the functionality of the tool via a RESTful interface.

### Endpoints

**POST /docsage**

This endpoint allows you to generate documentation for a given codebase URL or a local path.

**Request Body:**

```json
{
  "codebase_url": "https://github.com/openai/whisper.git",
  "output_format": "markdown",
  "output_directory": "./docs"
}
```

**Response Body:**

```json
{
  "status": "success",
  "message": "Documentation generation started."
}
```

## Dependencies

| Dependency | Version |
|---|---|
| @google/generative-ai | ^0.1.0 |
| badge-maker | ^3.3.1 |
| boxen | ^7.1.1 |
| chalk | ^5.3.0 |
| cli-progress | ^3.12.0 |
| commander | ^11.0.0 |
| docsage | ^1.3.2 |
| fast-glob | ^3.3.0 |
| figlet | ^1.7.0 |
| gradient-string | ^2.0.2 |
| inquirer | ^9.2.12 |
| mermaid | ^10.6.0 |
| nanospinner | ^1.1.0 |
| ora | ^7.0.1 |
| @octokit/rest | ^20.0.2 |

## License

Docsage is released under the MIT License.

## Contributing

### Development Setup

```bash
# Clone the repository
git clone [repository-url]
cd [project-name]

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev
```

### Code Style Guidelines

- Use ESLint and Prettier for code formatting
- Follow JavaScript Standard Style
- Use meaningful variable and function names
- Add JSDoc comments for functions
- Keep functions small and focused

### Commit Message Convention

Follow the Conventional Commits specification:

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update build tasks
```

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Open a Pull Request
6. Wait for review and address feedback

### Bug Reports

- Use the issue tracker
- Include reproduction steps
- Include system information
- Include relevant logs

### Feature Requests

- Use the issue tracker
- Describe the feature in detail
- Explain the use case
- Provide examples if possible