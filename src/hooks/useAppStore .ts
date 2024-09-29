import { useStore } from "react-redux";
import { AppStore } from "../Store/store";

export const useAppStore = useStore.withTypes<AppStore>();
