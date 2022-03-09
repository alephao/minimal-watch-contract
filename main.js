// const { exec } = require("child_process");
const ethers = require("ethers")
require('dotenv').config()

const RPC_URL = process.env.RPC_URL

const genzeeAbi = [
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
]

const genzeeAddress = "0x201675fBFAAAC3A51371E4C31FF73Ac14ceE2A5A"

const startListeningToGenzeeTransfers = (provider) => {
  const contract = new ethers.Contract(genzeeAddress, genzeeAbi, provider)
  console.log("Listening to Genzee Transfer events...")
  contract.on("Transfer", (from, to, tokenId) =>{
    console.log("Genzee Transfer", from, to, tokenId)
  })
}

const wETHAbi = [
  "event Withdrawal(address indexed src, uint wad)"
]

const wETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"

const listenToWETHTransfers = (provider) => {
  const contract = new ethers.Contract(wETHAddress, wETHAbi, provider)
  console.log("Listening to WETH Withdrawal events...")
  contract.on("Withdrawal", (src, wad) =>{
    console.log("WETH Withdrawal", src, wad)
  })
}

const main = async () => {
  const provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL)
  listenToWETHTransfers(provider)
}

main()