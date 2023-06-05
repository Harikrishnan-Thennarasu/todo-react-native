import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOAD_ALL_DATA } from "./action";
import { store } from "./store";

export const onLoadAllDataFromLocal = async () => {
    const localState = await AsyncStorage.getItem('state') || "";
    if (localState) {
        store.dispatch({ type: LOAD_ALL_DATA, data: JSON.parse(localState) });
    }
}

export const onSetAllDataToLocalStorage = async (data: any) => {
    await AsyncStorage.setItem('state', JSON.stringify(data))
}