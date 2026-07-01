import { useState } from 'react';
import { genreTemplate } from '../../utils/templates';

const TryIt = () => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<React.JSX.Element | string>('{}');

  const onFetchGenre = () => {
    if (loading) return;
    setLoading(true);
    fetch('https://bookworm-1tj4.onrender.com/api/library/author')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        setCode(genreTemplate(res));
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  return (
    <section className="mb-16">
      <h1 className="text-4xl mb-5">Try it</h1>
      <p className="mb-5">Run this code here, to fetch data</p>
      <code className="flex flex-col bg-code p-5 rounded-lg mb-5 text-white">
        <span>
          <span className="text-violet-400">fetch</span>
          <span>&#40;</span>
          <span className="text-pink-400">
            'https://bookworm-1tj4.onrender.com/api/library/author'
          </span>
          <span>&#41;</span>
        </span>
        <span className="ml-16">
          <span className="text-violet-400">.then</span>
          <span>&#40;</span>
          <span className="text-white">response</span>
          <span> {`=> `}</span>
          response.<span className="text-violet-400">json</span>()
          <span>&#41;</span>
        </span>
        <span className="ml-16">
          <span className="text-violet-400">.then</span>
          <span className="text-white">
            <span>&#40;</span>
            response
          </span>
          <span> {`=> `}</span>
          console<span className="text-violet-400">.log</span>(response)
          <span>&#41;</span>
        </span>
      </code>

      <button
        type="button"
        className="bg-black p-3 rounded-lg text-white font-semibold text-sm mb-5"
        onClick={onFetchGenre}
      >
        Run script
      </button>

      <code className="flex flex-col bg-code p-5 rounded-lg mb-5 text-white">
        {loading ? <p>&#123;loading...&#125;</p> : code}
      </code>
      {typeof code !== 'string' ? (
        <p>Congrats! You've made your first call to BookwormAPI. 🎊🎉👏</p>
      ) : null}
    </section>
  );
};

export default TryIt;
