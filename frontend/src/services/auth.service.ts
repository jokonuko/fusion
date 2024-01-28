import { nip19, nip04, Sub } from "nostr-tools";

import { api } from "~/config";

interface AuthResponse {
  userNpub: string;
  authToken: string;
}

class AuthService {
  async completeNostrLogin(authSubscription: Sub, publicKey: string, privateKey?: string): Promise<AuthResponse | null> {
    try {
      console.log("completeNostrLogin", authSubscription, publicKey, privateKey);
      const res = await api.post(`/nostrlogin`, { pubkey: publicKey });

      console.log(res);

      const authToken: string = await (async () => {
        return new Promise((resolve) => {
          authSubscription.on("event", async (event) => {
            // @ts-ignore
            const decoded = privateKey ? await nip04.decrypt(privateKey, serverPublicKey!, event.content) : await window.nostr?.nip04.decrypt(serverPublicKey!, event.content);
            resolve(decoded);
          });
        });
      })();

      console.log("posting lofin", authToken)

      if (res.status == 200 && authToken) {
        return {
          userNpub: nip19.npubEncode(publicKey),
          authToken: authToken,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const authService = Object.freeze(new AuthService());
