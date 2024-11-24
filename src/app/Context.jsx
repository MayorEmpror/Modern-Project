import { createContext,useContext } from "react"; 
const ConfigContext = createContext(null);

const useConfig = () => useContext(ConfigContext);

export { ConfigContext, useConfig };
