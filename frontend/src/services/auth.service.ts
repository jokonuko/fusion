import dayjs from "dayjs";
import { get } from "http";
import { Relay, nip19, nip04, Sub } from "nostr-tools";

import { api } from "~/config";

interface AuthResponse {
  userNpub: string;
  authToken: string;
}

export class AuthService {
  private relay: Relay;

  constructor(relay: Relay) {
    this.relay = relay;
  }

  async completeNostrLogin(publicKey: string, privateKey?: string): Promise<AuthResponse | null> {
    const serverPublicKey = process.env.NEXT_PUBLIC_FUSION_NOSTR_PUBLIC_KEY;

    try {
      const filter =
      {
        authors: [serverPublicKey!],
        kinds: [4],
        "#p": [publicKey],
        since: dayjs().unix(),
        limit: 1,
      };

      const getToken = async (): Promise<string> => {
        const event = await this.relay.get(filter);
        if (event) {
          // @ts-ignore
          const decoded: string = privateKey ? await nip04.decrypt(privateKey, serverPublicKey!, event.content) : await window.nostr?.nip04.decrypt(serverPublicKey!, event.content);
          return decoded;
        }
        return '';
      }

      const res = await api.post(`/nostrlogin`, { pubkey: publicKey });

      if (res.status === 200) {
        return new Promise((resolve, reject) => {
          let retryCount = 0;
          let interval = setInterval(async () => {
            let authToken = '';
            if (!authToken && retryCount < 10) {
              authToken = await getToken();
              console.log('authToken', authToken);
              console.log('retryCount', retryCount);
              if (authToken) {
                clearInterval(interval);
                resolve({
                  userNpub: nip19.npubEncode(publicKey),
                  authToken,
                });
              }
              retryCount++;
            } else {
              clearInterval(interval);
              reject(null);
            }
          }, 100);
        });
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

