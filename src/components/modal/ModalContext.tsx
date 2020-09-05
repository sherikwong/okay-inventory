import { createContext, SetStateAction, Dispatch, Context } from "react";

interface IModalContext {
  showModal?: boolean;
  toggleModal?: Dispatch<SetStateAction<boolean>>;
}


const ModalContext: Context<IModalContext> = createContext({});
export default ModalContext;


