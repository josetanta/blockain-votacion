import { Fragment, useState } from 'react';
import useCounterVotes from '../hooks/useCounterVotes';
import { useUser } from '../contexts/UserContext';
// Images
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';

function Container() {
  const elector = useUser();
  const votos = useCounterVotes();
  const [voto, setVoto] = useState(0);

  // const handlerGetCandidateName = async (candidateId) => {
  //   const candidateName = await window.getCandidateName(candidateId);

  // };

  const handlerGetCandidateVoters = async (candidateId) => {
    const candidateVoters = await window.getVotersCandidate(candidateId);
    setVoto(candidateVoters);
  };
  const handlerVotarClick = (candidateId) => {
    (async () => {
      // await handlerGetCandidateName(candidateId);
      await handlerGetCandidateVoters(candidateId);

      window.votar(candidateId);
    })();
    elector.handleVotar();
  };
  return (
    <div className="bg-app ">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h1 className="text-center title-votacion">Elecciones UNSCH</h1>
            <div className="container">
              <div>{voto > 0 ? <div>Numero de votos {voto}</div> : null}</div>
            </div>
          </div>
        </div>
        <div className="row mt-5 justify-content-center">
          {elector.state.isVoted ? (
            <h1 className="text-center text-name-candidate">
              Usted ya realizo su voto
            </h1>
          ) : (
            <Fragment>
              <div className="col d-flex align-items-center flex-column col-md-6">
                <img
                  className="image-logo-candidato"
                  src={logo1}
                  alt="Logo 1"
                />
                <button
                  className="btn button-voter"
                  onClick={() => handlerVotarClick(1)}
                >
                  Candidato 1
                </button>
              </div>
              <div className="col d-flex align-items-center flex-column col-md-6">
                <img
                  className="image-logo-candidato"
                  src={logo2}
                  alt="Logo 2"
                />
                <button
                  className="btn button-voter"
                  onClick={() => handlerVotarClick(2)}
                >
                  Candidato 2
                </button>
              </div>
            </Fragment>
          )}
          {elector.state.isVoted ? (
            <div className="row justify-content-center">
              <div className="col d-flex align-items-center flex-column col-md-6">
                <p className="text-info-votes mt-5">
                  Candidato 1
                  <span className="counter-voter">
                    {votos.c1 > 0 ? votos.c1 : ''}
                  </span>
                  <span>Votos hasta el momento</span>
                </p>
              </div>
              <div className="col d-flex align-items-center flex-column col-md-6">
                <p className="text-info-votes mt-5">
                  Candidato 2
                  <span className="counter-voter">
                    {votos.c2 > 0 ? votos.c2 : ''}
                  </span>
                  <span>Votos hasta el momento</span>
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Container;
