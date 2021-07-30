import Web3 from 'web3';
import contract from './build/Votacion.json';
import { saveHashUser } from './utils/sessionStorage';

let web3;
let Votacion;

export const connectWeb3 = async () => {
  let web3provider;

  if (window.ethereum) {
    web3provider = window.ethereum;
    try {
      await window.ethereum.enable();
    } catch (err) {
      alert('Rehazo la conexion');
    }
  } else if (window.web3) {
    web3provider = window.web3.givenProvider;
  } else {
    alert('Instale metamask para un proveedor de web3');
  }

  web3 = new Web3(web3provider);
  return web3;
};
window.onload = async () => {
  await connectWeb3();
  console.log(web3);
  Votacion = new web3.eth.Contract(
    contract.abi,
    contract.networks[5777].address
  );
  console.log(Votacion);
};
//funciones

//permite al usuario al votar
window.votar = async (candidateID) => {
  const accounts = await web3?.eth.getAccounts();
  window.userToken = `${accounts[0]}`;
  saveHashUser(`${accounts[0]}`);
  try {
    await Votacion.methods.vote(candidateID).send({
      from: accounts[0],
    });
  } catch (err) {
    console.log('error al votar');
    console.log(err);
  }
  console.log(`${accounts[0]}`);
};

//retorna el nombre del candidato
window.getCandidateName = async (candidateID) => {
  const accounts = await web3.eth.getAccounts();
  try {
    const candidateName = await Votacion.methods
      .getCandidateName(candidateID)
      .call({
        from: accounts[0],
      });
    return candidateName;
  } catch (err) {
    console.log('No se pudo obtener nombre');
    console.log(err);
  }
};

//retorna en numero de votos del candidato
window.getVotersCandidate = async (candidateID) => {
  const accounts = await web3?.eth.getAccounts();
  try {
    const votersCandidate = await Votacion?.methods
      .getCandidateVotersCount(candidateID)
      .call({
        from: accounts[0],
      });
    return votersCandidate;
  } catch (err) {
    console.log('No se pudo obtener los votos');
    console.log(err);
  }
};

window.getInfoCandidato = async (candidateID) => {
  const accounts = await web3?.eth.getAccounts();
  try {
    return await Votacion?.methods.candidates(candidateID).call({
      from: accounts[0],
    });
  } catch (error) {
    console.log(error);
  }
};

window.isVoted = async (token) => {
  const accounts = await web3?.eth.getAccounts();
  try {
    return await Votacion?.methods.isVoted(token).call({
      from: accounts[0],
    });
  } catch (error) {
    console.log(error);
  }
};
