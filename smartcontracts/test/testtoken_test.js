const TestToken = artifacts.require("TestToken");

contract("TestToken", () => {
    it("has been deployed successfully", async () => {
        const contr = await TestToken.deployed();

        assert(contr, "contract was not deployed")
    })

    describe("balanceOf()", () => {
        it("0.5: check owner balance after minting", async () => {
            const contr = await TestToken.deployed();
            const ownerBalance = await contr.balanceOf('0xea269bFd460D33500290a1eCb1c554EccF7a3a22');
            const totalSuppy = await contr.totalSupply();

            assert(ownerBalance > 0, "minting not executed successfully");
            assert(totalSuppy > 0, "minting not executed successfully");
        })
    })
})
