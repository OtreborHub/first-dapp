## Getting Started

Scaricare i progetti sotto la stessa cartella.
Aprire con VSCode la cartella padre (smart-contracts)										

Da VSCode creare 2 istanze del terminale:

Uno dalla cartella smart-contracs/dApwp **(Terminale dApp - front end Angular)**

e un altro dalla cartella smart-contracts/smartcontracts **(Terminale smartcontracs - backend Solidity)**

**dApp**

dal Terminal dApp eseguire

	- npm install.

**smartcontracts**

dal Terminal smartcontracts eseguire 

	- truffle init

	- npm install truffle-hdwallet-provider (se la dipendenza non è presente nel package.json)

	- truffle compile

aprire Ganache e creare un nuovo WK. 

Una volta creato dalle impostazioni (in alto a dx accanto a SWITCH) -> Server:

impostiamo:

	- Hostname: 127.0.0.1 - Loopback Pseudo-Interface 1

	- Port Number:8080

	- network ID:5777

queste informazioni devono combaciare con quelle presenti nel file smartcontracts\truffle-config.js

effettuare la prima build  e il primo deploy dello smart contract dal Terminale smartcontracts

eseguiamo:

	- truffle compile

	- truffle migrate (sarà necessario aggiungere --reset per i prossimi deploy
	
A seguito dell'operazione di compile vedremo comparire la cartella build/contracts. Quelli sono i nostri contratti buildati. 
Dal TestContract.json, copiamo l'**abi**.

Dopo il deploy Ganache ci mostrerà nella sezione Contracts i dettagli dei contratti deployati. Copiamo l'**address** di TestContract. 

**dApp**

nel file enviroment.ts incollare address e abi copiati in precedenza.

Ora l'applicativo angular è configurato per essere startato

eseguire

	- ng serve

ENJOY :)



