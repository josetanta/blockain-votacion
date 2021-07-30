// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6.12;

contract Votacion {
    // Estructura de un Candidato
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }
    address[] private addresses = [
        0x033543C6e665a3d67A33A7C6085f6aBD49a7f098,
        0x78C35A5FE4BcC134adca2e9d4222E2a5c4d50736,
        0x07145aECD7B0A10CC4dF0C7e32000Ff545695Af7
    ];

    // Almacena las cuentas que ya votaron
    mapping(address => bool) public voters;

    // Almacena candidato
    // y Buscar Candidato
    mapping(uint256 => Candidate) public candidates;

    // Total de candidatos
    uint256 public candidatesCount;

    // Evento votacion
    event votedEvent(uint256 indexed _candidateId);

    //CONSTRUCTOR
    constructor() public {
        addCandidate("Candidato 1");
        addCandidate("Candidato 2");
    }

    //FUNCIONES

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint256 _candidateId) public {
        //verificamos si es una llave valida para votar
        require(isAddressValid(msg.sender));

        //verificamos que una cuenta no voto antes
        require(!voters[msg.sender]);

        // verificamos si es un candidato valido para votar
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // establecemos que la cuenta ya voto
        voters[msg.sender] = true;

        // actualiza numero de votos del candidato
        candidates[_candidateId].voteCount++;

        // emitimos un evento
        emit votedEvent(_candidateId);
    }

    //FUNCIONES DE AYUDA

    //verifica si es una llave valida para votar
    function isAddressValid(address _address) public view returns (bool) {
        for (uint256 i = 0; i < addresses.length; i++) {
            if (addresses[i] == _address) {
                return true;
            }
        }
        return false;
    }

    //para comprobar que el candidato ya voto
    function isVoted(address _voterAddress) public view returns (bool) {
        return voters[_voterAddress];
    }

    //obtiene el id del candidato
    function getCandidateId(uint256 _candidateId)
        public
        view
        returns (uint256)
    {
        return candidates[_candidateId].id;
    }

    //obtine el id del candidato para verificar que tiene el mismo id
    function getCandidateName(uint256 _candidateId)
        public
        view
        returns (string memory)
    {
        return candidates[_candidateId].name;
    }

    //obtiene los votos de un candidato
    function getCandidateVotersCount(uint256 _candidateId)
        public
        view
        returns (uint256)
    {
        return candidates[_candidateId].voteCount;
    }
}
