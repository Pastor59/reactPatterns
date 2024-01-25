import { createContext } from 'react';
import { Subscribable } from "../subscribe";

type ContextType = {
    subscribable: Subscribable
};

const Context = createContext<ContextType | null>(null);

export default Context;