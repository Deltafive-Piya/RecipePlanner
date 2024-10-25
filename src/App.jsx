// import NotesPage from "./pages/NotesPage";
// import NotesProvider from "./context/NoteContext";

// function App() {
//   return (
//     <div id="app">
//       <NotesProvider>
//         <NotesPage />
//       </NotesProvider>
//     </div>
//   );
// }

// export default App;

import NotesPage from "./pages/NotesPage";
import NotesProvider from "./context/NoteContext";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div id="app">
      {isAuthenticated ? (
        <>
          <LogoutButton />
          <NotesProvider>
            <NotesPage />
          </NotesProvider>
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}

export default App;
