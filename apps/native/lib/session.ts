import * as SecureStore from 'expo-secure-store';

export interface IUserInfo {
    token: string,
    user: {
        id: number;
        email: string,
        fullName: string,
        password: string,
        createdDate: string,
        updatedDate: string,
    }
}

export async function secureStoreSave(key: string, value: any) {
    await SecureStore.setItemAsync(key, value);
}

export async function secureStoreRemove(key: string) {
    await SecureStore.deleteItemAsync(key);
}

export async function secureStoreGet(key: string) {
    let result = await SecureStore.getItemAsync(key);
    return result
}
