import jwtDecode, { JwtPayload } from "jwt-decode";
import { StorageHelper } from "./storageHelper";

export type Token = {
  idToken: string;
  refreshToken: string;
  accessToken: string;
};

const idTokenStoreKey = 'blog_app.id_token';
const refreshTokenStoreKey = 'blog_app.refresh_token';
const accessTokenStoreKey = 'blog_app.access_token';

export class TokenHandler {
  private storageHelper: StorageHelper;

  constructor(storageHelper = new StorageHelper()) {
    this.storageHelper = storageHelper;
  }

  getToken(): Token | undefined {
    const idToken = this.storageHelper.get(idTokenStoreKey);
    const refreshToken = this.storageHelper.get(refreshTokenStoreKey);
    const accessToken = this.storageHelper.get(accessTokenStoreKey);

    if (!idToken || !refreshToken || !accessToken) {
      return undefined;
    }
    return { idToken, refreshToken, accessToken };
  }

  parseIdToken(idToken: string) {
    // 本来はpayloadの型を正しくする必要があるが、今回必要なのはexpだけなので代用する
    return jwtDecode<Required<JwtPayload>>(idToken);
  }

  storeToken({ idToken, refreshToken, accessToken }: Token) {
    console.debug('storeToken');
    this.storageHelper.set(idTokenStoreKey, idToken);
    this.storageHelper.set(refreshTokenStoreKey, refreshToken);
    this.storageHelper.set(accessTokenStoreKey, accessToken);
  }

  clearToken() {
    console.debug('clearToken');
    this.storageHelper.remove(idTokenStoreKey);
    this.storageHelper.remove(refreshTokenStoreKey);
    this.storageHelper.remove(accessTokenStoreKey);
  }
}
