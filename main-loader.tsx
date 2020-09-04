import { createContext, SetStateAction, Dispatch, Context } from "react";

interface IOverlayLoaderContext {
  loadOverlay?: boolean;
  setLoadOverlay?: Dispatch<SetStateAction<boolean>>;
}


const OverlayLoaderContext: Context<IOverlayLoaderContext> = createContext({});
export default OverlayLoaderContext;

