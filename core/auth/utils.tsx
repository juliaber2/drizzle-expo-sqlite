import useStore from "@/core/storage";

const TOKEN = 'token';

export type TokenType = {
  access: string;
  refresh: string;
};

export const getToken = () => {
  const { getItem } = useStore();
  return getItem(TOKEN);
};
export const removeToken = () => {
  const { removeItem } = useStore();
  removeItem(TOKEN);
}
export const setToken = (value: TokenType) => {
  const { setItem } = useStore();
  setItem(TOKEN, value);
}


