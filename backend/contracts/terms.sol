// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract TermsAndConditions {
    mapping(address => bytes) public userSignatures;

    // Función para guardar la firma asociada con msg.sender
    function saveSignature(bytes memory signature) public {
        require(signature.length > 0, "La firma no puede estar vacía");
        userSignatures[msg.sender] = signature;
    }

    // Función para obtener la firma de una dirección específica
    function getSignature(address user) public view returns (bytes memory) {
        return userSignatures[user];
    }
}
