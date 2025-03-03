import 'bootstrap'

export async function addChainToMM ({ btn }) {
  try {
    const chainIDFromWallet = await window.ethereum.request({ method: 'eth_chainId' })
    const chainIDFromInstance = getChainIdHex()

    const coinName = document.getElementById('js-coin-name').value
    // const subNetwork = document.getElementById('js-subnetwork').value
    const jsonRPC = document.getElementById('js-json-rpc').value
    const path = process.env.NETWORK_PATH || '/'

    const blockscoutURL = location.protocol + '//' + location.host + path
    if (chainIDFromWallet !== chainIDFromInstance) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: chainIDFromInstance,
          chainName: process.env.NETWORK,
          nativeCurrency: {
            name: coinName,
            symbol: coinName,
            decimals: 18
          },
          rpcUrls: [jsonRPC],
          blockExplorerUrls: [blockscoutURL]
        }]
      })
    } else {
      btn.tooltip('dispose')
      btn.tooltip({
        title: `You're already connected to ${process.env.NETWORK}`,
        trigger: 'click',
        placement: 'bottom'
      }).tooltip('show')

      setTimeout(() => {
        btn.tooltip('dispose')
      }, 3000)
    }
  } catch (error) {
    console.error(error)
  }
}

function getChainIdHex () {
  const chainIDFromDOM = document.getElementById('js-chain-id').value
  const chainIDFromInstance = parseInt(chainIDFromDOM)
  return chainIDFromInstance && `0x${chainIDFromInstance.toString(16)}`
}
