import { Relay } from "nostr-tools";


/** An interface for Nostr NIP 46 Signer
 * Ref: https://github.com/nostr-protocol/nips/blob/master/46.md
 */
interface Nip46Signer {
  connect: (sPubKey: string, sPrivKey: string) => Promise<void>;
  getPublicKey: () => Promise<string>;
  signEvent: (event: object) => Promise<object>;
  getRelays: () => Promise<string[]>;
  nip04Encrytpt: (rPubKey: string, plaintext: string) => Promise<string>;
  nip04Decrypt: (rPubKey: string, cypher: string) => Promise<string>;
  nip44GetKey: (rPubkey: string) => Promise<string>;
  nip44Encrypt: (rPubkey: string, plaintext: string) => Promise<string>;
  nip44Decrypt: (rPubkey: string, cypher: string) => Promise<string>;
  ping: () => Promise<"pong">;
}

const unimplemented = () => {
  throw new Error("unimplemented!");
}

export class Signer implements Nip46Signer {
  private relay: Relay;

  constructor(relay: Relay) {
    this.relay = relay;
  }

  async connect(sPubKey: string, sPrivKey: string): Promise<void> {
    return unimplemented();
  }

  async getPublicKey(): Promise<string> {
    return unimplemented();
  }

  async signEvent(event: object): Promise<object> {
    return unimplemented();
  }

  async getRelays(): Promise<string[]> {
    return unimplemented();
  }

  async nip04Encrytpt(rPubKey: string, plaintext: string): Promise<string> {
    return unimplemented();
  }

  async nip04Decrypt(rPubKey: string, cypher: string): Promise<string> {
    return unimplemented();
  }

  async nip44GetKey(rPubkey: string): Promise<string> {
    return unimplemented();
  }

  async nip44Encrypt(rPubkey: string, plaintext: string): Promise<string> {
    return unimplemented();
  }

  async nip44Decrypt(rPubkey: string, cypher: string): Promise<string> {
    return unimplemented();
  }

  async ping(): Promise<"pong"> {
    return "pong";
  }
};
