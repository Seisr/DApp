// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8;
import "hardhat/console.sol";

contract Diem {
    event time(uint256 start, uint256 end);

    struct Record {
        uint256 idRec;
        uint256 idLop;
        string tenMon;
        uint256 idSV;
        string tenSV;
        uint256 idGV;
        string tenGV;
        uint256 diemTH;
        uint256 diemGK;
        uint256 diemCK;
    }

    //create struct type array to store values
    Record[] public record;
    uint256 idRec = 1;

    function get() public view returns (Record[] memory) {
        return record;
    }

    function getLength() public view returns (uint256) {
        return record.length;
    }

    function getRecByInd(
        uint256 j
    )
        public
        view
        returns (
            uint256,
            uint256,
            string memory,
            uint256,
            string memory,
            uint256,
            string memory,
            uint256,
            uint256,
            uint256
        )
    {
        uint256 i = j;
        return (
            record[i].idRec,
            record[i].idLop,
            record[i].tenMon,
            record[i].idSV,
            record[i].tenSV,
            record[i].idGV,
            record[i].tenGV,
            record[i].diemTH,
            record[i].diemGK,
            record[i].diemCK
        );
    }

    function findInd(uint256 _id) public view returns (uint256) {
        uint256 n = record.length;
        for (uint256 i; i < n; i++) {
            if (record[i].idRec == _id) return i;
        }
        revert("Record does not exist.");
    }

    function getRecById(
        uint256 _id
    )
        public
        view
        returns (
            uint256,
            uint256,
            string memory,
            uint256,
            string memory,
            uint256,
            string memory,
            uint256,
            uint256,
            uint256
        )
    {
        uint256 i = findInd(_id);
        return (
            record[i].idRec,
            record[i].idLop,
            record[i].tenMon,
            record[i].idSV,
            record[i].tenSV,
            record[i].idGV,
            record[i].tenGV,
            record[i].diemTH,
            record[i].diemGK,
            record[i].diemCK
        );
    }

    function insertRec(
        uint256 _idLop,
        string memory _tenMon,
        uint256 _idSV,
        string memory _tenSV,
        uint256 _idGV,
        string memory _tenGV,
        uint256 _diemTH,
        uint256 _diemGK,
        uint256 _diemCK
    ) public {
        uint256 start = block.timestamp;
        record.push(
            Record(
                idRec,
                _idLop,
                _tenMon,
                _idSV,
                _tenSV,
                _idGV,
                _tenGV,
                _diemTH,
                _diemGK,
                _diemCK
            )
        );
        idRec++;
        uint256 end = block.timestamp;
        console.log(end - start);
        emit time(start, end);
    }

    function updateRecById(
        uint256 _id,
        uint256 _idLop,
        string memory _tenMon,
        uint256 _idSV,
        string memory _tenSV,
        uint256 _idGV,
        string memory _tenGV,
        uint256 _diemTH,
        uint256 _diemGK,
        uint256 _diemCK
    ) public {
        uint256 i = findInd(_id);
        record[i].idLop = _idLop;
        record[i].tenMon = _tenMon;
        record[i].idSV = _idSV;
        record[i].tenSV = _tenSV;
        record[i].idGV = _idGV;
        record[i].tenGV = _tenGV;
        record[i].diemTH = _diemTH;
        record[i].diemGK = _diemGK;
        record[i].diemCK = _diemCK;
    }

    function deleteRecById(uint256 _id) public {
        uint256 i = findInd(_id);
        uint256 n = record.length - 1;
        for (i; i < n; i++) {
            record[i] = record[i + 1];
        }
        record.pop();
    }
}
