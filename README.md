# Event Booking App

An Expo application enabling users to browse and bookmark events, and join activities.

---

### Features

- 🔖 **Bookmark Events**: Save favorite events for quick access
- ✅ **Join Events**: Mark participation in events, with a responsive UI to reflect status
- 💾 **Local Storage**: Bookmarks and join status are stored using `AsyncStorage`
- 🌙 **Dark Theme**: Clean dark UI with bold accent color following the Tova color scheme
- 🧭 **Custom Navigation**: Tab navigation via Expo Router with custom icons and labels
- 🚫 **"FULL" Badge**: Displays a badge when event capacity is 0
- 🗓️ **Formatted Dates**: Dates and times are human-readable for better UX
- 🌀 **Animations**: Subtle scaling animation on Join button interaction for better responsiveness

---

### Setup Instructions

#### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or newer)
- npm (v6 or newer)
- Expo CLI (`npm install -g expo-cli`)

#### Installation & Run

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run start
   ```

3. **Run in browser (optional):**

   ```bash
   npm run web
   ```

4. **Launch on device:**

   - Scan the QR code using the Expo Go app on your mobile device
   - Or run the app in an Android/iOS simulator via the Expo DevTools

---

### Design Decisions

- **Mobile First:** The UI is tailored for mobile screens with responsive layout and touch feedback
- **Context API**: Used for managing global state (bookmarks and joined events)
- **Persistent Data**: `AsyncStorage` ensures user data is retained between sessions
- **Modular Components**: Components like `EventCard` are reusable and encapsulate logic and UI
- **Performance Considerations**: Minimal external dependencies, optimized component rendering
- **Styling**: Utilizes `StyleSheet` for performance and readability while matching the Tova brand aesthetic

---

### Icons

- Iconography provided via `@expo/vector-icons`
