export function useStorage() {
    return {
        save: (key: string, data: any) => {
            localStorage.setItem(key, JSON.stringify(data));
        }
    };
}
