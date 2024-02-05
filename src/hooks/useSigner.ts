import { computed } from "vue";
import { TransactionRequest } from "ethers";
import { useBrowserProvider } from "./useProvider";

export const useSigner = () => {
  const { browserProvider, getBrowserProvider } = useBrowserProvider();

  const singer = computed(() => browserProvider.value?.getSigner());

  const getSigner = async () => {
    if (singer.value) return singer.value;
    const browserProvider = await getBrowserProvider();
    return browserProvider.getSigner();
  };

  const signMessage = async (message: string) => {
    const signer = await getSigner();
    return await signer.signMessage(message);
  };

  const signTransaction = async (tx: TransactionRequest) => {
    const signer = await getSigner();
    return await signer.signTransaction(tx);
  };

  return {
    singer,
    getSigner,
    signMessage,
    signTransaction,
  };
};
