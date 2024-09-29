import { useSelector } from "react-redux";
import { RootState } from "../Store/store";

export const useAppSelector = useSelector.withTypes<RootState>();
