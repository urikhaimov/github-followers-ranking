# GitHub Followers Ranking Report

This web application generates a ranking report of GitHub users based on their follower graph (direct and indirect), up to a specified depth.

## 📌 Features

* Fetches mock follower data (simulating GitHub API)
* Recursive graph traversal up to user-defined depth
* Displays user profiles with:

  * Avatar
  * Username
  * Profile creation date
  * Link to GitHub profile
  * Followers-rank (direct + indirect)
* Sortable columns: username, creation date, followers-rank
* Pagination-ready structure

## 🚀 How to Run

### Prerequisites

* Node.js (v16+ recommended)
* npm or yarn

### Setup Instructions

```bash
# Clone the repository
$ git clone <your-repo-url>
$ cd github-followers-ranking

# Install dependencies
$ npm install
# or
yarn

# Run the development server
$ npm start
# or
yarn start
```

The app will open in your default browser at `http://localhost:3000`.

## 📁 Project Structure

```
├── src
│   ├── components
│   │   ├── Dashboard.jsx
│   │   └── UserCard.jsx
│   ├── mock-data
│   │   └── mockApi.js
│   ├── utils
│   │   ├── helpers.js
│   └── App.jsx
├── public
├── package.json
└── README.md
```

## 🧪 Mock API

To avoid GitHub API rate limits, this app uses a local mock data file in `src/mock-data/mockApi.js` that simulates GitHub follower responses.

## 📌 Technologies Used

* React.js
* JavaScript (ES6+)
* CSS Modules / Plain CSS

## 🧠 Design Considerations

* Modular component-based architecture for easy extension
* Clear separation between logic, presentation, and API handling
* Descriptive function names and professional comments for readability

## ✅ Quality Principles Demonstrated

* Clean, readable, and documented code
* Clear naming conventions
* Stateless, reusable components
* Simple and extendable logic for ranking and traversal

## 👤 Author

Uri Khaimov

---

For any questions, please contact the author or submit issues via the repository page.
