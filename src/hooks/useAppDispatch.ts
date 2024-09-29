import { useDispatch } from "react-redux";
import { AppDispatch } from "../Store/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
