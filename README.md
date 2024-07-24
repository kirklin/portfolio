# Kirklin Portfolio

This is a [Next.js](https://nextjs.org/) project for Kirklin's personal portfolio.

## Tech Stack

This project uses the following technologies:

- [Next.js](https://nextjs.org/) - React framework
- [UnoCSS](https://github.com/unocss/unocss) - Instant On-demand Atomic CSS Engine
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) - JavaScript library for interactive, customizable vector maps

## Getting Started

### Prerequisites

Ensure you have the following installed on your development environment:

- Node.js (LTS version recommended)
- pnpm

### Environment Setup Guide for Users in China

If you're setting up this project in China, you may encounter issues with downloading packages from the default npm registry. Follow these steps to use a faster mirror and set up the required tools:

#### 1. Install nrm (Node Registry Manager)

nrm is a registry manager for npm, allowing you to easily switch between different npm registries.

```bash
npm install -g nrm
```

#### 2. Switch to the Taobao registry

The Taobao registry is a fast mirror of the npm registry for users in China.

```bash
nrm use taobao
```

#### 3. Install pnpm

pnpm is the package manager used in this project. Install it globally:

```bash
npm install -g pnpm
```

#### 4. Verify the installation

Ensure that pnpm is correctly installed:

```bash
pnpm --version
```

#### 5. Continue with project setup

Now that you have the necessary tools installed, you can proceed with the project installation steps outlined in the "Installation" section above.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/kirklin/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Available Scripts

In the project directory, you can run:

- `pnpm dev`: Starts the development server
- `pnpm build`: Builds the app for production
- `pnpm start`: Runs the built app in production mode
- `pnpm lint`: Runs ESLint to check code
- `pnpm lint:fix`: Runs ESLint and automatically fixes issues
- `pnpm test`: Runs unit tests

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the [MIT License](LICENSE).
