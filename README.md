<div align=center>
   <img src="https://raw.githubusercontent.com/ximon-x/agence/refs/heads/main/assets/logo-dark.png#gh-dark-mode-only">
   <img src="https://raw.githubusercontent.com/ximon-x/agence/refs/heads/main/assets/logo-light.png#gh-light-mode-only">
</div>

---

## ⚡ Summary

Hiring is hard and getting hired is even harder. Ghost listings, scams, and spam applications make it tough for everyone. If only we had a way to mitigate this. Now we do.

Agence aims to redefine the job market by introducing a decentralized platform that connects people in a new way. Inspired by the _Proof of Stake Consensus Algorithm_, powered by _Base Blockchain_, enabled by _Ethena's USDe Token_, and scaled by _LayerZero_, Agence offers a fresh solution to a global problem.

## 🎯 Objective

Agence aims to be a one-stop shop for job seekers and job providers by creating a safe environment, trustless environment. Agence uses a proof-of-stake system where users lock up tokens to ensure platform security and earn rewards. To ensure platform security, Agence requires users to stake USDe tokens. This staking mechanism discourages malicious behaviour while rewarding users with an estimated 15% APY for participating in governance and voting against malicious actors.

## ✨ System Breakdown

<div align=center>
   <img src="https://raw.githubusercontent.com/ximon-x/agence/refs/heads/main/assets/system-architecture-dark.svg#gh-dark-mode-only">
   <img src="https://raw.githubusercontent.com/ximon-x/agence/refs/heads/main/assets/system-architecture-light.svg#gh-light-mode-only">
</div>

### Registration

To join Agence, users deposit USDe (currently a mock token freely available) which is then staked to earn yield. In return, users receive ATK, a **LayerZero OFT**; ATK is also the governance token of the protocol which allows users to participate in platform decisions. Users can easily withdraw their deposits by swapping ATK back to USDe at any time unless their funds are locked in an active gig.

### Gigs

To create a gig, employers ("Agencies") must lock up a "binding amount" of their USDe, acting as a security deposit. This deposit can be slashed if the agency repeatedly fails to hire someone or is found to be scamming freelancers ("Aces"). Aces also need to have funds matching the binding amount to apply for gigs. When an Ace is hired and the gig begins, both the agency's and the Ace's USDe are locked to ensure commitment and fair play.

### Governance

Agence has a built-in system to identify and penalize bad actors. Any user can initiate an investigation into suspicious behaviour, and the community votes to determine guilt. Future plans include integrating video conferencing with AI-generated summaries to provide evidence and support informed decision-making. Penalties are categorized as follows:

- Scam (50% slash): Serious offences like attempting to steal personal information (e.g., private keys, credit card details).
- Sham (25% slash): Dishonest behaviour such as agencies creating fake job postings for marketing purposes.
- Spam (5% slash): Nuisance actions like Aces submitting irrelevant applications.

### Rewards

Agence encourages active participation in governance by rewarding users who vote on proposals with sUSDe tokens. These rewards incentivize users to contribute to the platform's security and help ensure informed decision-making. This system fosters a safer environment for all users by promoting collective responsibility and discouraging malicious activities that could jeopardize their stake.

## 🛠️ Technologies

Agence leverages a few key technologies:

1. **Ethena's USDe**: This stablecoin is used for all transactions on the platform. Agencies lock up USDe as a security deposit when creating gigs, ensuring commitment and discouraging scams. This deposit is staked to earn yield.

2. **LayerZero**: Agence utilizes LayerZero's OFT (Omnichain Fungible Token) technology for its governance token (ATK). This allows users to participate in platform governance from various EVM-compatible blockchains. Future development aims to make the governance contract an OApp, enabling cross-chain voting from any EVM chain.

3. **Base Blockchain**: This is the main blockchain where Agence is deployed and where all core contracts reside.

## ✅ Completed

I've made significant progress on Agence, completing the following core features:

- [x] User Interface: The front-end interface is ready and functional, allowing users to interact with the platform.
- [x] Agence Gigs Contract: The core contract handling the gigs, is fully implemented.
- [x] Agence Governance Contract: The contract enabling community-driven governance through proposals and voting is complete.

## 🚧 Development

Agence is under active development! Exciting new features are coming soon. Keep an eye out for updates, as I'm working hard to release v1 in the coming days.

Here's what's in the pipeline:

- [ ] Cross-chain Voting: Enable voting from multiple EVM chains by converting the governance contract into a LayerZero OApp.
- [ ] LayerZero OFT Integration: Update the Agence Token (ATK) to a LayerZero OFT and integrate it into the user interface.
- [ ] Deployment to Base Sepolia: Deploy all smart contracts to the Base Sepolia testnet.
- [ ] UI Enhancements: Integrate the Agence contracts into the UI, allowing users to interact with core platform features like gig creation.
- [ ] Content Polish: Remove placeholder data from the UI and refine the documentation for clarity and conciseness so I won't bore you with lengthy READMEs anymore. 🙃

Stay tuned for the latest updates!

## 📑 Addresses

TBD
