const Route = () => {
  return (
    <section className="mb-10">
      <h1 className="text-4xl mb-5">Routes</h1>
      <p className="mb-5">
        This project was deployed on Render so all HTTP methods are supported.
        You can use http or https for your requests.
      </p>
      <table className="mb-5">
        <tbody>
          <tr>
            <td className="pr-4 pl-4 pb-3">GET</td>
            <td className="pr-4 pl-4 pb-3">/book</td>
          </tr>
          <tr>
            <td className="pr-4 pl-4 pb-3">GET</td>
            <td className="pr-4 pl-4 pb-3">/book/1</td>
          </tr>
          <tr>
            <td className="pr-4 pl-4 pb-3">GET</td>
            <td className="pr-4 pl-4 pb-3">/author</td>
          </tr>
          <tr>
            <td className="pr-4 pl-4 pb-3">GET</td>
            <td className="pr-4 pl-4 pb-3">author/1</td>
          </tr>
          <tr>
            <td className="pr-4 pl-4 pb-3">GET</td>
            <td className="pr-4 pl-4 pb-3">/genre</td>
          </tr>
          <tr>
            <td className="pr-4 pl-4 pb-3">GET</td>
            <td className="pr-4 pl-4 pb-3">/genre/1</td>
          </tr>
        </tbody>
      </table>
      <p>
        <span className="font-bold">FYI</span>: see the{' '}
        <span className="underline">guide</span> for using examples.
      </p>
    </section>
  );
};

export default Route;
