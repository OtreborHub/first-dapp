const TestContract = artifacts.require("TestContract");

contract("TestContract", () => {
    
    it("0: has been deployed successfully", async () => {
        const contr = await TestContract.deployed();
        
        assert(contr, "contract was not deployed")
    })

    describe("Ownable", () => {
        it("0.5: retrieve owner as deployer account", async () => {
            const contr = await TestContract.deployed();
            const owner = await contr.owner();
            
            assert(owner, "the current owner");
        })
    })

    describe("newResource()", () => {
        it("1: add a resource in storage Resource[]", async () => {
            const contr = await TestContract.deployed();
            const name = "Name0";
            const content = "Content0";
            await contr.newResource(name, content);
            const resources = await contr.getResources();
            
            assert(resources.length > 0, "No resource added!");
            assert.equal(resources[0].name, name, "Resource added successfully");
        })
    })

    describe("searchById()", () => {
        it("2: retrieve a resource by id", async () => {
            const contr = await TestContract.deployed();
            const name = "Name1";
            const content = "Content1";
            await contr.newResource(name, content);

            const resources = await contr.getResources();
            const resource = await contr.searchById(0)
            
            assert(resources.length > 0, "No resource added!");
            assert.equal(resource.id, 0, "Resource not retrieved correctly");
        })
    })

    describe("getResource()", () => {
        it("3: retrieve multiple resources", async () => {
            const contr = await TestContract.deployed();
            for(let i = 2; i < 7; i++){
                let name = "Name" + i ;
                let content = "Content" + i;
                await contr.newResource(name, content);
            }

            const resources = await contr.getResources();

            assert(resources.length > 0, "No resource added!");
            assert(resources.length == 7, "Wrong number of resources");

            for(let x = 0; x < resources.length; x++){
                assert.equal(resources[x].id, x, "Resource id " + x + " not retrieved correctly");
                assert.equal(resources[x].name, "Name"+ x, "Resource name " + x + " not retrieved correctly");
                assert.equal(resources[x].content, "Content"+ x, "Resource content " + x + " not retrieved correctly");
            }
        })
    })

   
})
