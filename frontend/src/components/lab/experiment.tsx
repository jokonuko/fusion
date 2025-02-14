/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/self-closing-comp */
import { DeviceInfo } from "@neurosity/sdk/dist/esm/types/deviceInfo";
import { FC, useState, useEffect, use } from "react";

import { Button } from "../ui/button/button";

import { connectToNeurosityDevice, useNeurosityState } from "~/hooks";
import { neurosityService, neurosity, EventData } from "~/services";
import { PlugZap } from "lucide-react";

import { IExperiment } from "~/@types";
import SignalQuality from "./signalquality";
import { Input } from "../ui";
import dayjs from "dayjs";
import exp from "constants";

export const Experiment: FC<IExperiment> = (experiment) => {
  const [isRecording, setIsRecording] = useState(false);

  const { user, getNeurositySelectedDevice } = useNeurosityState();
  const [neurositySelectedDevice] = useState(getNeurositySelectedDevice());
  const [deviceStatus, setDeviceStatus] = useState("offline");
  const [connectedDevice, setConnectedDevice] = useState<DeviceInfo | null>(null);
  const [showSignalQuality, setShowSignalQuality] = useState(true);

  const [sandboxData, setSandboxData] = useState("");

  // const { activeMuseDevice } = useMuseState();

  const [duration, setDuration] = useState(0);
  const [tags, setTags] = useState<string[]>([]);

  const [experimentInfo, setExperimentInfo] = useState<IExperiment>(experiment);

  useEffect(() => {
    setExperimentInfo({ ...experiment, duration, tags });
  }, [experiment, tags, duration]);

  async function startNeurosityRecording() {
    if (connectedDevice) {
      console.log(experimentInfo);
      neurosityService.startRecording(experimentInfo, connectedDevice?.channelNames);
    }
  }

  async function stopNeurosityRecording() {
    neurosityService.stopRecording();
  }

  useEffect(() => {
    if (user && neurositySelectedDevice) {
      (async () => {
        const connectedDevice = await connectToNeurosityDevice(neurositySelectedDevice);
        if (!connectedDevice) return;
        setConnectedDevice(connectedDevice);
      })();

      (async () => {
        await neurosity.status().subscribe((status) => {
          if (status.state !== deviceStatus) {
            let deviceState: any = status.state;
            if (status.sleepMode) {
              deviceState = "sleep";
            } else {
              deviceState = status.state;
            }
            setDeviceStatus(deviceState);
          }
        });
      })();
    }
  }, [user, deviceStatus, neurositySelectedDevice]);

  if (typeof window !== "undefined") {
    window.addEventListener("message", (event) => {
      // IMPORTANT: Check the origin of the data!
      // You should probably not use '*', but restrict it to certain domains:
      if (event.origin.startsWith("https://localhost:") || event.origin.startsWith("https://usefusion.app")) {
        console.log("event", event);
        if (typeof event.data === "string") {
          return;
        }
        // The data sent from the iframe
        setSandboxData(event.data);
      }
    });
  }

  useEffect(() => {
    if (sandboxData !== "") {
      console.log("sandbox data obtained", sandboxData);
      (async () => {
        await downloadSandboxData(sandboxData, experiment.name, dayjs().unix());
      })();
    }
  }, [sandboxData]);

  // download the data
  async function downloadSandboxData(sandboxData: any, dataName: string, fileTimestamp: number) {
    const fileName = `${dataName}_${fileTimestamp}.json`;

    const hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sandboxData));
    hiddenElement.target = "_blank";
    hiddenElement.download = fileName;
    hiddenElement.click();
  }

  return (
    <div>
      {/* this needs to move to it's own component */}

      {/* {add live brain wave} */}

      <div id="experiment-container" className="mt-5">
        {experiment.description && (
          <div className="mt-10">
            <h1>Description:</h1>
            <p>{experiment.description}</p>
          </div>
        )}

        {!experiment.url && (
          <div className="mt-5">
            {/* <div className="my-5">
              <p>
                Duration <em>(optional)</em> :
              </p>
              <Input
                type="number"
                placeholder="Duration"
                onChange={(e) => setDuration(e.target.valueAsNumber)}
                value={duration ?? 0}
              />
            </div> */}
            <div className="my-5">
              <p>
                Tags <em>(optional)</em> :
              </p>
              <Input
                type="text"
                placeholder="Tags"
                onChange={(e) => {
                  console.log(e.target.value);
                  setTags(e.target.value.split(","));
                }}
                value={tags.join(",")}
              />
            </div>
          </div>
        )}
        {experiment.url && (
          <div className="m-3">
            <iframe
              src={experiment.url}
              style={{ width: "100%", height: "500px", border: "0", borderRadius: "4px", overflow: "hidden" }}
              title={experiment.name}
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking; download; fullscreen;"
              sandbox="allow-forms allow-downloads allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            ></iframe>
          </div>
        )}
        <>
          {sandboxData !== "" && (
            <p>
              Event data obtained
              {/* TODO: include this in the same zip for recordings */}
            </p>
          )}

          {/* TODO: we need a section that throws an error if the eeg device isn't active */}
          {deviceStatus === "online" && (
            <div className="my-10">
              {isRecording ? (
                <Button
                  onClick={() => {
                    // stop recording & save eeg data
                    setIsRecording(false);

                    // stop neurosity recording
                    stopNeurosityRecording();
                  }}
                >
                  Stop EEG Recording
                </Button>
              ) : (
                <Button
                  onClick={async () => {
                    // record eeg data
                    setIsRecording(true);

                    // start neurosity recording
                    await startNeurosityRecording();
                  }}
                >
                  Start EEG Recording
                </Button>
              )}
            </div>
          )}
        </>
      </div>

      {!connectedDevice && (
        <>
          <Button
            intent={"dark"}
            className="ml-auto"
            leftIcon={<PlugZap className="fill-current" />}
            onClick={() => {
              location.href = "/integrations";
            }}
          >
            Connect EEG device
          </Button>
        </>
      )}
      {/* {activeMuseDevice ? (
        <>
          <p>Active Muse Device: {activeMuseDevice?.deviceNickname}</p>
          <p>Device Status: {deviceStatus}</p>
        </>
      ) : (
        <>
          <Button
            intent={"dark"}
            className="ml-auto"
            leftIcon={<PlugZap className="fill-current" />}
            onClick={() => {}}
          >
            Connect Muse device
          </Button>
        </>
      )} */}

      {connectedDevice && (
        <>
          <p>Active Neurosity Device: {connectedDevice?.deviceNickname}</p>
          <p>Device Status: {deviceStatus}</p>
        </>
      )}

      {deviceStatus === "online" && connectedDevice?.channelNames && (
        <div className="flex flex-col justify-between">
          <div className="my-5">
            {showSignalQuality && (
              <>
                <SignalQuality channelNames={connectedDevice?.channelNames} deviceStatus={deviceStatus} />
              </>
            )}
            <Button
              onClick={() => {
                setShowSignalQuality(!showSignalQuality);
              }}
            >
              {showSignalQuality ? "Hide" : "Show"} Signal Quality
            </Button>
          </div>

          <div className="my-5"></div>
        </div>
      )}
    </div>
  );
};
