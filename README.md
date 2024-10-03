# 🎅 Secret Santa Generator

## Description

The **Secret Santa Generator** is a web-based tool that simplifies the process of randomly assigning Secret Santa pairs for any group of people. Each participant is assigned another person to give a gift to, ensuring that no one is left out, and participants can't be assigned to themselves. This project is built using the **MEAN stack (MongoDB, Express, Angular, Node.js)**.

<p align="left">  <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a><a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a><a href="https://angular.io" target="_blank" rel="noreferrer"> <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" width="40" height="40"/> </a><a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> <a href="https://www.figma.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a></p>

## Features

- Add participants with their names and define budget, date, localisation.
- Randomly assign each participant to their Secret Santa.
- Generate a unique link to share with people for them to find out who they need to buy a gift for.
- Futur features: Set exclusions (e.g., avoiding pairing certain people together), import list (csv file) to generate the list of participants, create wishlists for gifts.

## Demo



![Screenshot of the app](secret-santa-demo.png)

## Technologies Used

- **Frontend**: Angular
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Getting Started

### Prerequisites

To run this project locally, you need to have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Angular CLI](https://angular.io/cli)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/eleonoreeuzenes/secret-santa.git
   ```

2. **Backend setup:**
   - Navigate to the `server` directory and install the dependencies:
     ```bash
     cd server
     npm install
     ```
   - Set up environment variables:
     - Duplicate the `.env.example` file in the `server` directory and fill the following:
       ```
        MONGO_INITDB_ROOT_USERNAME=
        MONGO_INITDB_ROOT_PASSWORD=
        URL_MONGO=
       ```
   - Start the backend server:
     ```bash
     docker-compose up -d
     ```

3. **Frontend setup:**
    coming soon...

4. **Access the app:**
    coming soon...

## Contributions
 Contributions are not open at the moment.

 ## Author
Copyright © 2024 [Eleonore Euzenes](https://github.com/eleonoreeuzenes).
 #### Connect with me
<p align="left">
<a href="https://linkedin.com/in/eleonore-euzenes" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="eleonore-euzenes" height="30" width="40" /></a>
<a href="https://www.behance.net/eleonoreeuzenes" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/behance.svg" alt="eleonoreeuzenes" height="30" width="40" /></a>
</p>