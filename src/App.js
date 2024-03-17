import { Provider } from "react-redux";
import store from "./utils/store";
import "./App.css";
import AuthDetails from "./components/AuthDetails";
import Chatbody from "./components/Chatbody";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="w-full h-[100dvh] flex">
          {/* <Sidebar /> */}
          {/* <Chatbody /> */}

          <AuthDetails />
        </div>
      </Provider>
    </>
  );
}

export default App;
