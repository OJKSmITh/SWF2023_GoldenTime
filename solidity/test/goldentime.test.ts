import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("GoldenTime", async () => {
    let goldenTime: Contract;
    beforeEach(async () => {
        const [owner, otherAccount] = await ethers.getSigners();

        const goldenTimeContract = await ethers.getContractFactory("GoldenTime");
        goldenTime = await goldenTimeContract.deploy();
    });

    it.skip("deployed", () => {
        const address = goldenTime.address;
        expect(42).to.equal(address.length);
    });

    it.skip("occur", async () => {
        // await expect(await goldenTime.occurs(1, 0, 1, "ktas1"))
        //     .to.emit(goldenTime, "Emergency")
        //     .withArgs(1, 0, 1, "ktas1", 1690778650);

        await expect(await goldenTime.occurs(1, 0, 1, "사망"))
            .to.emit(goldenTime, "Minted")
            .withArgs("사망", 10);
    });

    it.skip("listpush", async () => {
        await goldenTime.mint("test");
        await goldenTime.received(1, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
        await goldenTime.received(1, "0xa8EaeF888a4e3aBf6efBBC92029BbC09221434b8");
        await goldenTime.received(1, "0x57fc4909Be5cdB9f7c658f35a94D0Bb81Cf23932");
        const List = await goldenTime.getHospitalList(1);
        expect(List).to.equal(["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "0xa8EaeF888a4e3aBf6efBBC92029BbC09221434b8", "0x57fc4909Be5cdB9f7c658f35a94D0Bb81Cf23932"]);
    });

    it.skip("Choice", async () => {
        await expect(await goldenTime.choice(1, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))
            .to.emit(goldenTime, "Choice")
            .withArgs(1, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb9226");
    });

    it.skip("owner", async () => {
        const owner = await goldenTime.owner();

        expect(42).to.equal(owner.length);
    });

    it.skip("setAmb", async () => {
        await goldenTime.setAmb("0xa8EaeF888a4e3aBf6efBBC92029BbC09221434b8");
        expect(false).to.equal(await goldenTime.checkAmbAddress("0xa8EaeF888a4e3aBf6efBBC92029BbC09221434b8"));
    });

    it.skip("reject", async () => {
        await expect(await goldenTime.reject(0, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "병상없음"))
            .to.emit(goldenTime, "HospitalList")
            .withArgs(0, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", false, "병상없음");
    });

    it("List", async () => {
        await goldenTime.occurs(1, 0, 1, "사망");
        await goldenTime.occurs(1, 0, 1, "사망");
        await goldenTime.occurs(1, 0, 1, "사망");
        await goldenTime.occurs(1, 0, 1, "사망");
        const List = await goldenTime.getList();
        console.log(List);
    });
});

