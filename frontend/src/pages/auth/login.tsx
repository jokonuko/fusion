import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { relayInit } from "nostr-tools";

import { authService } from "~/services";
import { MainLayout, Meta } from "~/components/layouts";
import { Button, Input, Logo } from "~/components/ui";
import { getPrivateKey, persistPrivateKey } from "~/utils/auth";

import { authOptions } from "../api/auth/[...nextauth]";
import dayjs from "dayjs";

const serverPublicKey = process.env.NEXT_PUBLIC_FUSION_NOSTR_PUBLIC_KEY || "";
const fusionRelayUrl = process.env.NEXT_PUBLIC_FUSION_RELAY_URL || "";

const LoginPage = React.memo(() => {
  const router = useRouter();
  const relay = relayInit(fusionRelayUrl);

  const [authSubscription, setAuthSubscription] = useState<any>(null);

  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showNostrExtensionLogin, setShowNostrExtensionLogin] = useState(false);

  useEffect(() => {
    (async () => {
      relay.on("connect", () => {
        console.log(`connected to ${relay.url}`);
      });
      relay.on("error", () => {
        console.log(`failed to connect to ${relay.url}`);
      });
      await relay.connect();

      const loginTimestamp = dayjs().unix();
      let sub = relay.sub([
        {
          authors: [serverPublicKey!],
          kinds: [4],
          "#p": [publicKey],
          since: loginTimestamp,
        },
      ]);

      setAuthSubscription(sub);
    })();

    return () => {
      relay.close();
      console.log("closed relay connection");
    };
  }, []);

  useEffect(() => {
    // @ts-ignore
    setShowNostrExtensionLogin(global.window && global.window.nostr);
  }, []);

  const useGuestAccount = async () => {
    try {
      const privateKey = getPrivateKey();
      const { publicKey } = await persistPrivateKey(privateKey);
      completeNostrLogin(publicKey, privateKey);
    } catch (error) {
      console.error(error);
    }
  };

  const useExtension = async () => {
    try {
      // @ts-ignore
      const nostr = global.window.nostr;
      if (nostr) {
        const publicKey = await nostr.getPublicKey();
        completeNostrLogin(publicKey, privateKey);
      } else {
        console.error("Nostr extension not installed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const useExistingAccount = async (privateKey: string) => {
    try {
      if (privateKey.length !== 64) {
        return;
      }
      setPrivateKey(privateKey);
      const { publicKey } = await persistPrivateKey(privateKey);
      setPublicKey(publicKey);
    } catch (error) {
      console.error(error);
    }
  };

  const completeNostrLogin = async (publicKey: string, privateKey?: string) => {
    if (!authSubscription) {
      console.error("No auth subscription");
      return;
    }

    const authObject = await authService.completeNostrLogin(authSubscription, publicKey, privateKey);

    console.log(authObject);
    if (authObject) {
      await signIn("credentials", {
        ...authObject,
        privateKey,
        redirect: true,
        callbackUrl: router.query.callbackUrl?.toString(),
      });
    } else {
      // TODO: render error message
      console.error("Error logging in");
    }
  };

  return (
    <MainLayout>
      <Meta
        meta={{
          title: "Fusion | Login",
        }}
      />
      <div className="mx-auto mt-16 flex w-full justify-center">
        <div className="m-4 flex w-96 max-w-sm flex-col items-center space-y-6 rounded-md border bg-white pt-12 pb-8 px-4 shadow-md dark:border-secondary-400 dark:border-opacity-50 dark:bg-transparent dark:shadow-sm dark:shadow-gray-700">
          <Logo className="w-16" />
          <h1 className="text-2xl font-bold">Login to Fusion</h1>
          <p className="w-full text-center mb-1">
            We're private by design
            <br />
            Get started with an anonymous account
          </p>
          <Button type="button" onClick={useGuestAccount} size="lg" fullWidth className="mt-4">
            Continue as Guest
          </Button>
          {showNostrExtensionLogin && (
            <Button type="button" onClick={useExtension} size="lg" fullWidth className="mt-4">
              Use Nostr Extension
            </Button>
          )}
          <a className="text-sm text-gray-500" onClick={() => setShowInput(!showInput)} href="#">
            Use Existing Account
          </a>
          {showInput && (
            <div className="w-full flex flex-row self-center">
              <Input
                // className="text-center"
                size="lg"
                fullWidth
                placeholder="Paste Nostr Private Key"
                onChange={(e) => useExistingAccount(e.target.value)}
                value={privateKey}
              />
              <Button
                type="button"
                disabled={privateKey.length !== 64}
                onClick={() => completeNostrLogin(publicKey, privateKey)}
                size="lg"
                fullWidth
                className="w-[30%] ml-2 h-full"
              >
                Continue
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
});

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/playground",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
