const Resource = () => {
  return (
    <section className="mb-16">
      <h1 className="text-4xl mb-5">Resources</h1>
      <p className="mb-5">
        BookwormAPI comes with a set of 3 common resources:{' '}
      </p>
      <table>
        <tbody>
          <tr>
            <td className="pr-4 pl-4 pb-3">/book</td>
            <td className="pr-4 pl-4 pb-3">5 books</td>
          </tr>
          <tr>
            <td className="pr-4 pl-4 pb-3">/author</td>
            <td className="pr-4 pl-4 pb-3">5 authors</td>
          </tr>
          <tr>
            <td className="pr-4 pl-4 pb-3">/genre</td>
            <td className="pr-4 pl-4 pb-3">5 genres</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Resource;
