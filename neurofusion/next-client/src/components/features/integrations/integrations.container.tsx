import { useState } from "react";

import { integrations } from "./data";
import { Integration } from "./integration/integration";
import { ActivityWatchModal, BiometricsModal, FusionConnectModal, MagicFlowModal, NeurosityModal } from "./modals";

import { useGetMagicFlowToken, useNeurosityState } from "~/hooks";
import { MuseClient } from "muse-js";

type IntegrationSlug =
  | (typeof integrations)[number]["slug"]
  | undefined
  | "fusion"
  | "magicflow"
  | "activityWatch"
  | "spotify"
  | "biometrics";

export const IntegrationsContainer = () => {
  const [modalOpen, setModalOpen] = useState<IntegrationSlug>();
  const { data: magicflowData, isLoading: magicflowLoading } = useGetMagicFlowToken();
  const { user, loading: neurosityLoading, connectNeurosityAccount } = useNeurosityState();

  function handleIntegrationClick(integrationSlug: IntegrationSlug) {
    switch (integrationSlug) {
      case "fusion":
        // call function for fusion integration
        setModalOpen("fusion");
        break;
      case "neurosity":
        if (user) {
          setModalOpen("neurosity");
        } else {
          connectNeurosityAccount();
        }
        break;
      case "magicflow":
        setModalOpen("magicflow");
        break;
      case "activityWatch":
        // call function for activityWatch integration
        setModalOpen("activityWatch");
        break;
      case "spotify":
        // call function for spotify integration
        break;
      case "biometrics":
        // call function for biometrics integration
        // connectMuse();
        setModalOpen("biometrics");
        break;
      default:
      // handle default case (optional)
    }
  }

  const isIntegrationConnected = (integrationSlug: IntegrationSlug) => {
    switch (integrationSlug) {
      case "fusion":
        // check if fusion is connected
        return false;
      case "spotify":
        // check if Spotify is connected
        return false;
      case "neurosity":
        // check if Neurosity is connected
        return Boolean(user);
      case "magicflow":
        // check if MagicFlow is connected
        return Boolean(magicflowData?.magicflowToken);
      case "activityWatch":
        // check if activityWatch is connected
        return false;
      default:
        return false;
    }
  };

  const integrationLoading = (integrationSlug: IntegrationSlug) => {
    switch (integrationSlug) {
      case "fusion":
        // check if fusion is connected
        return false;
      case "spotify":
        // check if Spotify is connected
        return false;
      case "neurosity":
        // check if Neurosity is connected
        return neurosityLoading;
      case "magicflow":
        // check if MagicFlow is connected
        return magicflowLoading;
      case "activityWatch":
        // check if activityWatch is connected
        return false;
      default:
        return false;
    }
  };

  return (
    <section>
      <h1 className="text-4xl">Integrations and all connected apps</h1>
      <p className="mb-10 mt-2 text-lg dark:text-slate-400">
        Supercharge your workflow and connect to tools you use everyday{" "}
      </p>
      <div className="flex flex-wrap gap-8">
        {integrations.map((integration) => (
          <Integration
            key={integration.slug}
            integration={integration}
            onclick={() => handleIntegrationClick(integration.slug)}
            isConnected={isIntegrationConnected(integration.slug)}
            loading={integrationLoading(integration.slug)}
          />
        ))}
      </div>
      {modalOpen === "magicflow" && (
        <MagicFlowModal isOpen={modalOpen === "magicflow"} onCloseModal={() => setModalOpen(undefined)} />
      )}
      {modalOpen === "neurosity" && (
        <NeurosityModal isOpen={modalOpen === "neurosity"} onCloseModal={() => setModalOpen(undefined)} />
      )}
      {modalOpen === "biometrics" && (
        <BiometricsModal isOpen={modalOpen === "biometrics"} onCloseModal={() => setModalOpen(undefined)} />
      )}
      {modalOpen === "activityWatch" && (
        <ActivityWatchModal isOpen={modalOpen === "activityWatch"} onCloseModal={() => setModalOpen(undefined)} />
      )}
      {modalOpen === "fusion" && (
        <FusionConnectModal isOpen={modalOpen === "fusion"} onCloseModal={() => setModalOpen(undefined)} />
      )}
    </section>
  );
};
