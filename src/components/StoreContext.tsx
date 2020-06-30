import React from 'react';
import { StoreType } from '../redux/redux-store'

//@ts-ignore
const defaultStore: StoreType = null
const StoreContext: React.Context<StoreType> = React.createContext(defaultStore);

export default StoreContext;