import type { apiResponse, genre } from '../../../types';

export const genreTemplate = (response: apiResponse): React.JSX.Element => {
  console.log(response);
  return (
    <>
      <p>&#123;</p>
      <div className="ml-5 flex">
        <p className="text-amber-200">"status"</p>
        <p>:</p>
        <p className="text-orange-300 ml-2">{response.status.toString()}</p>
        <span>,</span>
      </div>
      <span className="ml-5 flex flex-col">
        <p className="text-amber-200">
          "data"<span className="text-white">:</span>
          <span className=" ml-2 text-white">&#91;</span>
        </p>
        <div>
          <p className="ml-6">&#123;</p>
          {response.data?.map((genre: genre, index) => (
            <div key={genre.id}>
              <div className="flex flex-col">
                <div className="flex ml-10">
                  <p className="text-amber-200">"id"</p>
                  <p>:</p>
                  <p className="text-orange-300 ml-2">{genre.id}</p>
                  <span>,</span>
                </div>

                <div className="flex ml-10">
                  <p className="text-amber-200">"name"</p>
                  <p>:</p>
                  <p className="text-orange-300 ml-2">{genre.name}</p>
                </div>
              </div>
              <p className="ml-6">
                &#125;
                {(response.data?.length ?? 0) - 1 !== index ? (
                  <span>,</span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
        <p>
          &#93;<span>,</span>
        </p>
      </span>
      <span className="ml-5">
        <span className="text-amber-200">"message"</span>
        <span>:</span>
        <span className="text-orange-300 ml-2">{response.message}</span>
      </span>
      <span>&#125;</span>
    </>
  );
};
