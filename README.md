# Metaverse Food – React Native Prototype

This repository now hosts an Expo-powered React Native experience for **Metaverse Food**, a concept that pairs immersive metaverse taste simulations with healthier real-world habits. The application mirrors the original single-page pitch but is optimized for mobile devices.

## Features

- **Hero message** outlining the "Cravings without the damage" vision on a dark, modern canvas.
- **Key statistics grid** summarizing global diet and nutrition challenges with quick reference footnotes.
- **Comparative impact chart** rendered with `react-native-chart-kit`, displaying five major health metrics on a base-10 logarithmic scale so smaller counts remain visible next to billion-scale values.
- **Coming soon preview** showing an embedded prototype mockup (base64 image) and bullet list of planned capabilities.
- **Contact and source listings** with tappable links for outreach and data verification.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Expo development server:
   ```bash
   npm run start
   ```
3. Use the QR code or platform-specific commands that Expo prints to launch the app on iOS, Android, or web (Expo Go recommended for mobile testing).

## Project Structure

- `App.js` – main React Native interface and layout.
- `app.json` – Expo configuration.
- `babel.config.js` – Babel preset configuration for Expo.
- `package.json` – dependencies and npm scripts.

## Notes

- The bar chart applies a logarithmic transform before rendering; axis labels are converted back into human-readable K/M/B shorthand for clarity.
- External links open the relevant authority sources in the device browser.
