import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './features/tokenSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            tokens: tokenReducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
