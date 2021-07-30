import { useEffect, useState } from 'react';

function useCounterVotes() {
  const [value, setValue] = useState({ c1: 0, c2: 0 });

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        let c1 = Number(await window.getVotersCandidate(1));
        let c2 = Number(await window.getVotersCandidate(2));
        setValue((s) => ({ ...s, c1, c2 }));
      })();
    }, 200);
  }, []);

  return value;
}

export default useCounterVotes;
