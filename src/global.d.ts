import type { EIP1193Provider } from "@web3-onboard/core";

declare global {
  interface Window {
    ethereum: EIP1193Provider | undefined;
  }
}
