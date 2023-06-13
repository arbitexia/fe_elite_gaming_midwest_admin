# Elite Gaming Admin

A modern and efficient web application built with Next.js.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Project Description

**Purpose:** The purpose of this project is to develop an administration panel with different levels of privileges for managing a rewards program. The rewards program is designed for a gaming or entertainment establishment where players can redeem coupons and rewards.

**The system will have two levels of user access:** Super Admin and Admin. The Super Admin will have full control over the system, including the ability to grant or revoke access for other admins, send email and text message campaigns to players, create reports on player activities, redeem coupons and rewards on behalf of customers, override transactions made by other admins, customize coupon distribution, and manage rewards for each location easily. The Admin users will have limited privileges compared to the Super Admin. They will be able to redeem coupons and rewards for customers, create reports on player activities, and view player information.

The system will provide valuable insights through comprehensive reports, streamline the reward redemption process for cashiers, and enable the Super Admin to have full control and customization of the program.

## Features

- Next.js for Static Site Generator
- Integrate with MUI 5.0
- Type checking TypeScript
- Strict Mode for TypeScript and React 18
- Linter with ESLint
- Code Formatter with Prettier
- Husky for Git Hooks
- Lint-staged for running linters on Git staged files
- Hot module replacement (HMR) for instant updates during development.

## Installation

1. Start by cloning the repository:

   ```bash
   git clone https://github.com/gate4devs/fe_elite_gaming_midwest_admin.git

   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   #or
   yarn dev
   ```

## Usage

- Run the development server: `npm run dev #or yarn dev`
- Open your browser and visit: `http://localhost:3000`

## Deployment

To deploy the application to a production environment, follow these steps:

- Build the production-ready code: `npm run build`
- Deploy the app using github action to AWS S3

## Contributing

- Fork the repository on GitHub.
- Clone your forked repository to your local machine.
- Create a new branch for your feature or bug fix.
- Make the necessary changes in your branch.
- Commit your changes with descriptive commit messages.
- Push your changes to your forked repository.
- Submit a pull request to the main repository.
- Please make sure to follow our code style guidelines and provide tests for your contributions if applicable.

## License

The Elite Gaming Admin project is licensed under the [MIT License](https://opensource.org/license/mit/).
