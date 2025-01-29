## Docsage

Docsage is an AI-powered documentation generator that leverages the power of Google Gemini. It helps you create comprehensive documentation for your projects, saving you time and effort.

## Installation

```bash
npm install -g docsage
```

## Usage

To generate documentation for a project, run the following command:

```bash
docsage init
```

This will create a new project directory with a configuration file. You can edit the configuration file to specify the project settings, such as the input directory, output directory, and the type of documentation you want to generate.

Once the configuration is set up, you can run the following command to generate the documentation:

```bash
docsage build
```

Docsage will generate the documentation in the specified output directory.

## Key Features

- **AI-Powered:** Docsage uses Google Gemini's AI capabilities to analyze your code and generate contextually relevant documentation.
- **Flexible Template System:** Customize the look and feel of your documentation with a variety of templates.
- **Markdown Support:** Document your code using Markdown for a consistent and well-organized output.
- **Diagram Generation:** Automatically generate diagrams, such as sequence diagrams, class diagrams, and UML diagrams, to enhance the understanding of your code.
- **Cloud Documentation Hosting:** Optionally store your generated documentation in the cloud for easy access and sharing.

## API Documentation

Docsage exposes a REST API that allows you to automate the documentation generation process. The API documentation is available at [docs.docsage.com](https://docs.docsage.com).

## Dependencies

Docsage requires the following dependencies:

```json
{
  "dependencies": {
    "@google/generative-ai": "^0.1.0",
    "badge-maker": "^3.3.1",
    "boxen": "^7.1.1",
    "chalk": "^5.3.0",
    "cli-progress": "^3.12.0",
    "commander": "^11.0.0",
    "docsage": "^1.3.2",
    "fast-glob": "^3.3.0",
    "figlet": "^1.7.0",
    "gradient-string": "^2.0.2",
    "inquirer": "^9.2.12",
    "mermaid": "^10.6.0",
    "nanospinner": "^1.1.0",
    "ora": "^7.0.1",
    "@octokit/rest": "^20.0.2"
  },
  "devDependencies": {
    "esbuild": "^0.19.0",
    "jest": "^29.0.0"
  }
}
```

## License

Docsage is licensed under the MIT License.

## Contributing

### Development Setup

```bash
# Clone the repository

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="90" height="20" role="img" aria-label="version: 1.3.2"><title>version: 1.3.2</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="90" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="51" height="20" fill="#555"/><rect x="51" width="39" height="20" fill="#007ec6"/><rect width="90" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="265" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="410">version</text><text x="265" y="140" transform="scale(.1)" fill="#fff" textLength="410">version</text><text aria-hidden="true" x="695" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="290">1.3.2</text><text x="695" y="140" transform="scale(.1)" fill="#fff" textLength="290">1.3.2</text></g></svg> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="78" height="20" role="img" aria-label="license: MIT"><title>license: MIT</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="78" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="47" height="20" fill="#555"/><rect x="47" width="31" height="20" fill="#97ca00"/><rect width="78" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="245" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="370">license</text><text x="245" y="140" transform="scale(.1)" fill="#fff" textLength="370">license</text><text aria-hidden="true" x="615" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="210">MIT</text><text x="615" y="140" transform="scale(.1)" fill="#fff" textLength="210">MIT</text></g></svg> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="82" height="20" role="img" aria-label="node: 22.4.1"><title>node: 22.4.1</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="82" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="37" height="20" fill="#555"/><rect x="37" width="45" height="20" fill="#4c1"/><rect width="82" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="195" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="270">node</text><text x="195" y="140" transform="scale(.1)" fill="#fff" textLength="270">node</text><text aria-hidden="true" x="585" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="350">22.4.1</text><text x="585" y="140" transform="scale(.1)" fill="#fff" textLength="350">22.4.1</text></g></svg>

git clone https://github.com/Okenneth1964/docsage.git
cd docsage

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

### Code Review Process

- All pull requests must be reviewed by at least one other contributor
- Reviewers should focus on the following:
  - Code quality and adherence to coding standards
  - Correctness and thoroughness of documentation
  - Potential performance bottlenecks
  - Security vulnerabilities

### Testing Requirements

- All new features must be accompanied by unit tests
- Unit tests should cover all code paths
- Integration tests should be used to test the interaction between different components

### Documentation Requirements

- All new features must be documented
- Documentation should be clear, concise, and accurate
- Documentation should be written in Markdown using the provided templates

### Community Guidelines

- Be respectful of other contributors
- Be constructive in your criticism
- Be open to compromise

### Code of Conduct Reference

Docsage follows the Contributor Covenant Code of Conduct. Please refer to [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for more details.