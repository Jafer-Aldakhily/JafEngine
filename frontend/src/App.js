import React,{useState} from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RoutesList from "./components/RoutesList";
import Search from "./components/Search";

function App() {
  const [darkTheme,setDarkTheme] = useState(false)
  return (
    
    <div className={darkTheme ? "dark" : ""}>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <div className="my-20 flex justify-center items-center border-b dark:border-gray-700 border-gray-200">
        <Search />
        </div>
        <RoutesList />
        <Footer />
      </div>
    </div>
  );
}

export default App;
