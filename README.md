# Twitch chat clone

## Disclaimer
Please note that I never used React before, so I had to learn it during the test :)

## Technical choices
- Typescript to improve code consistency and readability
- Hexagonal architecture
- Dependency injection as much as possible
- "*The fewer libraries, the better*" reduced as possible the number of dependencies and made stuff by hand

## Requirements
- MongoDB database named "chat"
- Node JS

## Server
- Install the server dependencies
```sh
cd backend
npm install
```

- Update to .env file to match your system requirements

- Start the server in development mode
```sh
npm run dev
```

## Front
- Install the frontend dependencies
```sh
cd frontend
npm install
```

- Start the frontend development server
```sh
npm run start
``` 
