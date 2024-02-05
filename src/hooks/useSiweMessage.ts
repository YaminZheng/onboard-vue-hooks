import { SiweMessage } from "siwe";
import { toQuantity } from "ethers";
import { useSigner } from "./useSigner";

export const useSiweMessage = () => {
  const { getSigner } = useSigner();

  const createMessage = async (
    options: Partial<SiweMessage> & { nonce: string }
  ) => {
    const params = Object.create(null);
    const signer = await getSigner();
    const address = await signer.getAddress();
    const network = await signer.provider.getNetwork();
    Object.assign(
      params,
      {
        address,
        domain: window.location.host,
        uri: window.location.origin,
        statement: "Hello World!",
        version: "1",
        chainId: toQuantity(network.chainId),
      },
      options
    );

    const message = new SiweMessage(params);
    return message.prepareMessage();
  };

  return { createMessage };
};
