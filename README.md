# Docsage: AI-Powered Documentation Generator 📚🤖

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="90" height="20" role="img" aria-label="version: 1.3.2"><title>version: 1.3.2</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="90" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="51" height="20" fill="#555"/><rect x="51" width="39" height="20" fill="#007ec6"/><rect width="90" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="265" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="410">version</text><text x="265" y="140" transform="scale(.1)" fill="#fff" textLength="410">version</text><text aria-hidden="true" x="695" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="290">1.3.2</text><text x="695" y="140" transform="scale(.1)" fill="#fff" textLength="290">1.3.2</text></g></svg> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="78" height="20" role="img" aria-label="license: MIT"><title>license: MIT</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="78" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="47" height="20" fill="#555"/><rect x="47" width="31" height="20" fill="#97ca00"/><rect width="78" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="245" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="370">license</text><text x="245" y="140" transform="scale(.1)" fill="#fff" textLength="370">license</text><text aria-hidden="true" x="615" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="210">MIT</text><text x="615" y="140" transform="scale(.1)" fill="#fff" textLength="210">MIT</text></g></svg> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="82" height="20" role="img" aria-label="node: 22.4.1"><title>node: 22.4.1</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="82" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="37" height="20" fill="#555"/><rect x="37" width="45" height="20" fill="#4c1"/><rect width="82" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="195" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="270">node</text><text x="195" y="140" transform="scale(.1)" fill="#fff" textLength="270">node</text><text aria-hidden="true" x="585" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="350">22.4.1</text><text x="585" y="140" transform="scale(.1)" fill="#fff" textLength="350">22.4.1</text></g></svg>


Docsage is an innovative documentation generator that harnesses the power of Google Gemini's AI capabilities. It helps developers effortlessly create comprehensive and high-quality documentation with just a few simple commands.

## Installation ⚙️

1. Ensure you have Node.js installed on your system.
2. Run the following command to install Docsage globally:
```
npm install -g docsage
```
3. Create a `.env` file in your project directory and set the following environment variables:
  - `DOCSAGE_API_KEY`: Your Google Gemini API key

## Usage ⚡️

Docsage offers a suite of powerful commands to streamline the documentation generation process:

### docsage generate

Generates documentation for a given project. Use the `-p` or `--project-dir` option to specify the project directory.

```
docsage generate -p /path/to/project-directory
```

### docsage analyze

Analyzes a project to gather insights and generate dependency graphs. Accepts the same `-p` option as `generate`.

```
docsage analyze -p /path/to/project-directory
```

### docsage scan

Scans a project for potential documentation improvements. Use the `-p` option to specify the project directory.

```
docsage scan -p /path/to/project-directory
```

## Key Features 🚀

- **AI-Powered Generation:** Google Gemini's AI provides natural language processing to generate clear and informative documentation from code comments, source code, and external resources.
- **Detailed Dependency Graphs:** Docsage creates visual dependency graphs to illustrate the relationships between different components in your project.
- **Integration with GitHub:** Docsage seamlessly integrates with GitHub, allowing for easy documentation updates and versioning.
- **Markdown and HTML Output:** Generates documentation in both Markdown and HTML formats, providing flexibility for various use cases.
- **Advanced Templates:** Provides customizable templates to ensure documentation aligns with your unique project requirements.

## API Documentation 💻

Docsage exposes an API for programmatic access to its functionality:

```typescript
import Docsage from 'docsage';

const docsage = new Docsage();

docsage.generate({
  projectDir: '/path/to/project-directory',
});

docsage.analyze({
  projectDir: '/path/to/project-directory',
});

docsage.scan({
  projectDir: '/path/to/project-directory',
});
```

## Dependencies 📦

- `@google/generative-ai`: ^0.1.0
- `badge-maker`: ^3.3.1
- `boxen`: ^7.1.1
- `chalk`: ^5.3.0
- `cli-progress`: ^3.12.0
- `commander`: ^11.0.0
- `docsage`: ^1.3.2
- `fast-glob`: ^3.3.0
- `figlet`: ^1.7.0
- `gradient-string`: ^2.0.2
- `inquirer`: ^9.2.12
- `mermaid`: ^10.6.0
- `nanospinner`: ^1.1.0
- `ora`: ^7.0.1
- `@octokit/rest`: ^20.0.2

## License ⚖️

Docsage is licensed under the MIT License.

## Contributing 🤝

### Development Setup
```bash
git clone [repository-url]
cd [project-name]

npm install

npm test

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