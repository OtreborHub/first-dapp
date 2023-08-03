const TestNFT = artifacts.require("TestNFT");

contract("TestNFT", () => {
    it("0: has been deployed successfully", async () => {
        const contr = await TestNFT.deployed();

        assert(contr, "contract was not deployed")
    })

    describe("initialAward( example card )", () => {
        it("1: check existing example NFT after minting", async () => {
            const contr = await TestNFT.deployed();
            const owner = await contr.owner();
            //Funzione di write-only: Se proviamo a recuperare il tokenId e usarlo per i test, vedremo la difficoltà nel recuperare il valore
            await contr.initialAward(owner, "{'name': 'ExampleNFT TEST', 'content': 'example content TEST'}");
            const balance = await contr.balanceOf(owner);
            assert(balance > 0, "minting not executed successfully: " + balance)
        })
    })

})
