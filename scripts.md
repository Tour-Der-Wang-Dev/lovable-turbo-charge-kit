
# Project Scripts Documentation

This document provides details about available npm scripts in the project and how to use them.

## Available Scripts

### Development Scripts

#### `npm run dev`

Starts the development server with hot-reloading enabled.

```bash
npm run dev
```

This will:
- Start the Vite development server
- Enable hot module replacement
- Open the application on port 8080
- Watch for file changes and rebuild automatically

**Use this when**: You're actively developing the application and need to see changes in real-time.

#### `npm run build`

Builds the application for production deployment.

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Optimize and bundle all assets
- Generate production-ready files in the `dist/` directory
- Apply minification and other optimizations

**Use this when**: You're ready to deploy the application to production.

#### `npm run preview`

Serves the production build locally for testing before deployment.

```bash
npm run preview
```

This will:
- Build the application (if not already built)
- Serve the build files locally
- Allow you to test the production build before actual deployment

**Use this when**: You want to test the production build locally before deploying.

### Linting and Type Checking

#### `npm run lint`

Runs ESLint to check for code quality issues.

```bash
npm run lint
```

**Use this when**: You want to ensure your code follows the project's coding standards.

#### `npm run lint:fix`

Automatically fixes ESLint issues where possible.

```bash
npm run lint:fix
```

**Use this when**: You want to automatically fix linting issues.

#### `npm run type-check`

Runs TypeScript compiler to check for type errors without emitting files.

```bash
npm run type-check
```

**Use this when**: You want to verify that your TypeScript code is type-safe.

### Testing

#### `npm test`

Runs Jest tests in watch mode.

```bash
npm test
```

**Use this when**: You're developing and want to continuously run tests as you make changes.

#### `npm run test:ci`

Runs tests once with coverage report, suitable for CI environments.

```bash
npm run test:ci
```

**Use this when**: Running tests in a continuous integration pipeline.

### Utility Scripts

#### `npm run clean`

Removes build artifacts and cache directories.

```bash
npm run clean
```

This will:
- Delete the `dist/` directory
- Delete the `.cache/` directory
- Delete the `node_modules/.vite/` directory

**Use this when**: You want to start with a clean slate, especially if you're experiencing strange build issues.

## Script Combinations

For a complete development cycle, you might use:

```bash
npm run clean        # Clean up previous builds
npm run lint:fix     # Fix linting issues
npm run type-check   # Ensure types are correct
npm test            # Run tests
npm run dev          # Start development server
```

Before deployment:

```bash
npm run lint         # Check for code issues
npm run type-check   # Verify types
npm run test:ci      # Run all tests once
npm run build        # Create production build
npm run preview      # Preview before deployment
```
