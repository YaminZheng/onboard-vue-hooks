import { BrowserProvider } from "ethers";
import { WalletState } from "@web3-onboard/core";
import { useOnboard } from "@web3-onboard/vue";
import { sleep } from "~/assets/utils";
import { computed } from "vue";
import type { ComputedRef, Ref } from "vue";
import type { EIP1193Provider } from "@web3-onboard/core";
import WalletError from "~/assets/error";

const _getEip1193Provider = (
  connectedWallet: ComputedRef<WalletState | null>,
  connectingWallet: Readonly<Ref<boolean>>,
  useEthereumIfWithout = false
) => {
  return new Promise<EIP1193Provider>(async (resolve, reject) => {
    const resolveProvider = (wallet: EIP1193Provider) => resolve(wallet);
    const rejectProvider = () =>
      reject(new WalletError("未链接钱包", "UNCONNECTED_WALLET"));

    if (connectingWallet.value) {
      while (!connectedWallet.value) {
        await sleep(100);
      }
      return resolveProvider(connectedWallet.value.provider);
    }

    if (connectedWallet.value) {
      return resolveProvider(connectedWallet.value.provider);
    }

    if (useEthereumIfWithout && window.ethereum) {
      return resolveProvider(window.ethereum);
    } else {
      rejectProvider();
    }
  });
};

export const useEip1193Provider = (useEthereumIfWithout = false) => {
  const { connectedWallet, connectingWallet } = useOnboard();

  const eip1193Provider = computed(() =>
    connectedWallet.value?.provider
      ? connectedWallet.value.provider
      : useEthereumIfWithout
      ? window.ethereum
      : void 0
  );

  const getEip1193Provider = async () => {
    if (eip1193Provider.value) return eip1193Provider.value;
    return await _getEip1193Provider(
      connectedWallet,
      connectingWallet,
      useEthereumIfWithout
    );
  };

  return { eip1193Provider, getEip1193Provider };
};

export const useBrowserProvider = (useEthereumIfWithout = false) => {
  const { eip1193Provider, getEip1193Provider } =
    useEip1193Provider(useEthereumIfWithout);

  const browserProvider = computed(() =>
    eip1193Provider.value ? new BrowserProvider(eip1193Provider.value) : void 0
  );

  const getBrowserProvider = async () => {
    if (browserProvider.value) return browserProvider.value;
    const eip1193Provider = await getEip1193Provider();
    return new BrowserProvider(eip1193Provider);
  };

  return { browserProvider, getBrowserProvider };
};
