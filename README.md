# VoxABox

**VoxABox** is a modern chat application designed for seamless, real-time communication. Built using the PERN (PostgreSQL, Express.js, React.js, Node.js) stack, it features an intuitive interface, group chat capabilities, and a scalable backend. VoxABox prioritizes user experience and is continually evolving with new features to meet user needs.

---

## Features

- **User Authentication**: Secure registration and login system.  
- **Group Chats**: Engage in collaborative conversations with multiple users.  
- **Search Functionality**: Locate users and messages quickly.  
- **User Profiles**: Edit and manage your personal details.  
- **Real-Time Messaging**: Live updates for smooth conversation flow using **Socket.IO**.  
- **Scalability**: Built to handle growth and high traffic.  

**Planned Features**:  
- **Delivery Status**: Add read receipts and message delivery tracking.
- - **Media Sharing**: Share images, videos, and files easily.    
- **Typing Indicators**: Notify users when the other party is typing.  
- **End-to-End Encryption**: Strengthen security with secure message encryption.  
- **Responsive Design**: Fully optimize for mobile and tablet devices.  

---

## Tech Stack

### Frontend:  
- **React.js** with **Vite** for fast development.  
- **TypeScript** for type-safe code.  
- **Socket.IO Client** for live messaging.  
- **CSS Modules** for modular styling.  

### Backend:  
- **Node.js** with **Express.js**.  
- **PostgreSQL** for robust relational data handling.  
- **Socket.IO** for real-time, bidirectional communication.  

---

## Installation

### Prerequisites:  
- **Node.js** installed  
- **PostgreSQL** installed and configured  

### Steps:

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/ammarnadeem01/voxabox.git  
   cd voxabox  
   ```  

2. **Install dependencies**:  
   - Backend:  
     ```bash
     cd Backend  
     npm install  
     ```  
   - Frontend:  
     ```bash
     cd ../Frontend  
     npm install  
     ```  

3. **Environment Variables**:  
   Create a `.env` file in the `Backend` folder with the following:  
   ```env
   DB_URL=your_database_url  
   JWT_SECRET=your_secret  
   PORT=desired_port  
   ```  

4. **Run the backend server**:  
   ```bash
   cd Backend  
   npm start  
   ```  

5. **Run the frontend server**:  
   ```bash
   cd ../Frontend  
   npm run dev  
   ```  

6. **Access the application**:  
   Open `http://localhost:3000` in your browser.  

---

---

Feel free to reach out with questions or suggestions. Happy chatting! 😊

