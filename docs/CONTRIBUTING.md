# Contributing Guidelines

We welcome contributions to the Carbon Footprint Awareness Platform! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions. We're building a community focused on sustainability and environmental awareness.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a feature branch
4. Make your changes
5. Push to your fork
6. Submit a pull request

## Development Workflow

### Setting Up Your Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/carbon-footprint-platform.git
cd carbon-footprint-platform

# Create a feature branch
git checkout -b feature/your-feature-name

# Install dependencies for both frontend and backend
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

### Running Tests

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
npm run test
```

### Code Style

We follow standard JavaScript/React conventions:

- **Naming:** camelCase for variables/functions, PascalCase for components/classes
- **Formatting:** Use Prettier (configured in project)
- **Linting:** ESLint rules are configured
- **Comments:** Write clear, concise comments for complex logic

#### Format Your Code
```bash
cd frontend
npm run format

cd backend
npm run lint
```

## Contributing Areas

### Frontend Development
- New React components
- Page improvements
- UI/UX enhancements
- Performance optimizations
- Accessibility improvements

### Backend Development
- New API endpoints
- Database optimizations
- Authentication improvements
- Business logic enhancement
- Testing and quality assurance

### Documentation
- API documentation
- Setup guides
- User guides
- Code examples
- Architecture explanations

### Design & UX
- UI mockups
- User experience suggestions
- Accessibility feedback
- Design system improvements

## Pull Request Process

### Before You Submit

1. **Update your fork's main branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Make your changes**
   - Keep commits focused and descriptive
   - One feature per pull request
   - Include tests for new functionality

3. **Test thoroughly**
   ```bash
   npm run test
   npm run lint
   ```

4. **Update documentation**
   - Update README if needed
   - Document new features
   - Add code comments

### Submitting a Pull Request

1. Push your branch to your fork
2. Open a pull request on GitHub
3. Provide a clear title and description:
   ```
   Title: Add carbon calculation for flight emissions

   Description:
   - Implements calculation logic for flight distances
   - Adds API endpoint POST /api/footprint/flight
   - Includes tests with 95% coverage
   - Updates API documentation

   Closes #123
   ```

4. Link related issues
5. Request reviews from maintainers

### PR Requirements

- ✅ Tests pass
- ✅ Code is linted
- ✅ Documentation is updated
- ✅ No conflicts with main branch
- ✅ Clear commit messages
- ✅ 2+ code reviews approved

## Commit Message Guidelines

Write clear, descriptive commit messages:

```
Format: [type]: [subject]

Examples:
- feat: Add flight emissions calculator
- fix: Correct carbon calculation formula
- docs: Update API documentation
- style: Format code with Prettier
- test: Add unit tests for calculator
- refactor: Simplify carbon calculation logic
```

### Types
- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Code style changes
- **refactor:** Code refactoring
- **test:** Test additions or changes
- **chore:** Build or dependency changes

## Bug Reports

Found a bug? Please report it:

1. Check if the bug already exists
2. Create a new issue with:
   - Clear title
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details
   - Screenshots (if applicable)

### Bug Report Template
```markdown
## Description
Brief description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: 
- Browser:
- Node version:
- Version:

## Screenshots
[if applicable]
```

## Feature Requests

Have a great idea? Share it:

1. Check if it's already requested
2. Create a new issue with:
   - Clear title
   - Detailed description
   - Use cases
   - Potential implementation approach

### Feature Request Template
```markdown
## Description
Brief description of the feature

## Problem It Solves
What problem does this solve?

## Proposed Solution
How should this work?

## Use Cases
- Use case 1
- Use case 2

## Additional Context
[any other context]
```

## Code Review Process

### What Reviewers Look For
- Code quality and best practices
- Test coverage (aim for 80%+)
- Documentation completeness
- Performance implications
- Security considerations
- Backward compatibility

### Responding to Reviews
- Be open to feedback
- Ask questions if unclear
- Make requested changes
- Respond to all comments
- Re-request review after changes

## Project Structure

Familiarize yourself with the project structure before contributing:

```
carbon-footprint-platform/
├── frontend/          # React application
├── backend/           # Express API
├── docs/             # Documentation
└── README.md         # Project overview
```

## Resources

- [API Documentation](docs/API.md)
- [Setup Guide](docs/SETUP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Issues](https://github.com/yourusername/carbon-footprint-platform/issues)
- [Discussions](https://github.com/yourusername/carbon-footprint-platform/discussions)

## Contact

- Email: support@carbonfootprint.com
- Discord: [Join our community](link)
- Twitter: [@CarbonTrack](link)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to making sustainability more accessible! 🌱
