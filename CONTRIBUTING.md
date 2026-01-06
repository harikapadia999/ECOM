# Contributing to ECOM

Thank you for your interest in contributing to ECOM! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)

## 🤝 Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL >= 14
- Redis >= 6.0

### Setup

\`\`\`bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ECOM.git
cd ECOM

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env

# Run database migrations
pnpm db:migrate

# Start development
pnpm dev
\`\`\`

## 💻 Development Workflow

1. **Create a branch** from `main`
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

2. **Make your changes** with clear commits

3. **Test your changes**
   \`\`\`bash
   pnpm test
   pnpm lint
   pnpm type-check
   \`\`\`

4. **Push and create PR**
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Tests
- `chore:` - Maintenance

**Examples:**
\`\`\`
feat(cart): add persistent cart storage
fix(auth): resolve token expiration issue
docs(api): update endpoint documentation
\`\`\`

## 🔍 Pull Request Process

1. Update documentation for any new features
2. Add tests for new functionality
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers
6. Address feedback promptly

### PR Checklist

- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console errors
- [ ] Follows code style
- [ ] Commits follow convention
- [ ] PR description is clear

## 🎨 Coding Standards

### TypeScript

- Use strict mode
- Define proper types (avoid `any`)
- Use interfaces for objects
- Document complex functions

### React

- Use functional components
- Implement proper error boundaries
- Follow hooks best practices
- Keep components small and focused

### Testing

- Write unit tests for utilities
- Integration tests for API endpoints
- E2E tests for critical flows
- Aim for 80%+ coverage

## 🏗️ Project Structure

\`\`\`
ECOM/
├── apps/
│   ├── web/          # Frontend Next.js app
│   └── api/          # Backend Express API
├── packages/
│   ├── ui/           # Shared UI components
│   ├── database/     # Prisma schema
│   └── config/       # Shared configs
└── docs/             # Documentation
\`\`\`

## 🐛 Reporting Bugs

Use GitHub Issues with:
- Clear title
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

## 💡 Feature Requests

Open an issue with:
- Clear description
- Use case explanation
- Proposed solution
- Alternative approaches

## 📞 Questions?

- Open a GitHub Discussion
- Check existing issues
- Review documentation

Thank you for contributing! 🚀