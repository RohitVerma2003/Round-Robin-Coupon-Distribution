# Round-Robin Coupon Distribution System

A MERN application that implements a fair coupon distribution system with abuse prevention mechanisms.

## Project Overview

This system distributes coupons in a round-robin fashion while preventing abuse through IP tracking and cookie-based session monitoring. Built with Vite + React.js, MongoDB, and Node.js.

## Features

### 1. Coupon Distribution
- Sequential coupon assignment ensuring fair distribution
- Automatic tracking of coupon usage and limits
- Support for coupon expiration dates

### 2. Abuse Prevention
- IP-based tracking with cooldown periods
- Browser session monitoring via cookies
- Rate limiting for claim attempts

### 3. User Experience
- No login required for claiming coupons
- Clear feedback messages
- Responsive design
- Real-time coupon availability status

## Technology Stack

- **Frontend**: Vite + React
- **Backend**: Node.js
- **Database**: MongoDB
- **State Management**: React Hooks
- **Styling**: CSS Modules

## Installation

1. Clone the repository:
```bash
git clone https://github.com/RohitVerma2003/Round-Robin-Coupon-Distribution.git
cd Round-Robin-Coupon-Distribution
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/coupon-system?retryWrites=true&w=majority
```

4. Seed the database with initial coupons:
```bash
npm run seed
```

5. Start the backend development server:
```bash
npm run dev
```

6. Start the frontend development server:
```bash
cd frontend
npm run dev
```

## Security Measures

1. **IP Tracking**
   - 5 Minutes cooldown between claims
   - IP address validation

2. **Session Management**
   - Secure cookie settings
   - HTTP-only cookies
   - SameSite cookie policy

3. **Rate Limiting**
   - Request rate limiting
   - Abuse prevention mechanisms

## Development

### Building for Production
```bash
npm run build
```

### Starting Production Server
```bash
npm run dev
```

## Acknowledgments

- React.js team for the amazing libraray
- MongoDB team for the reliable database
- All contributors and maintainers

## Support

For support, please create an issue in the repository or contact [RohitVerma2003](https://github.com/RohitVerma2003).

---

Built with ❤️ by [RohitVerma2003](https://github.com/RohitVerma2003)
