## About
Steam equipment enchanter is my pet project for tracking and calculating prices for items in CS 2 that are in you'r account.

## Features
* See users CS 2 equipment
* Pick skins that you want to track
* Track how price changed through time with abar chart
* Automatically track of skins price
* Track prices form stram market

## Installation
```bash
# Clone the repo
git clone https://github.com/PabloPicas0/Steam-eq-enchanter.git

# Install client dependencies
cd Steam-eq-enchanter
npm install

# Install server dependencies
cd Steam-eq-enchanter/proxy
npm install

# Start development servers
cd ..
npm run dev
npm run proxy

The app should be running at: http://localhost:3000
```