import Navbar from './components/Navbar/Navbar';
import TryIt from './components/TryIt/Tryit';
import Resource from './components/Resource/Resource';
import Route from './components/Route/Route';

function App() {
  return (
    <main className="max-w-4xl m-auto">
      <Navbar />
      <div className="mb-16 mt-10">
        <h1 className="text-5xl text-gray-700 mb-10">{`Bookworm{API}`}</h1>
        <article className="max-w-xl tex-gray-700 text-xl leading-10">
          An API inspired in books, with real information about them for testing
          and prototyping, powered by{' '}
          <span className="underline">Supabase</span> +{' '}
          <span className="underline">Render</span>.
        </article>
      </div>
      <TryIt />

      <section className="mb-16">
        <h1 className="text-4xl mb-5">When to use</h1>
        <p>
          BookwormAPI is a free online REST API made of books you can{' '}
          <span className="font-bold">whenever you need some mock data</span>.
          It can be in a README on Github, for a demo on CodeSandbox, in code
          examples on Stack Overflow or simply to test things locally.
        </p>
      </section>

      <Resource />
      <Route />
      <footer className="mb-5">
        Coded and mantained with ☕ and 💘 by{' '}
        <span className="underline">CarlosMayo1</span> &copy; 2026
      </footer>
    </main>
  );
}

export default App;
