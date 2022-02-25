import React, { FC, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const RepositoriesList: FC = () => {
  const [term, setTerm] = useState('');
  const { searchRepositories } = useActions();
  const { data, loading, error } = useTypedSelector(
    (state) => state.repositories,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(term);
    searchRepositories(term);
    setTerm('');
  };

  return (
    <>
      <div className="px-8">
        <div className="mx-auto">
          <h1 className="text-center text-3xl font-bold mt-6 mb-10">
            Search NPM for a package!
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="p-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm  focus-within:border-cyan-600">
              <label
                htmlFor="pokemon"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium">
                npm package search
              </label>
              <input
                onChange={(e) => setTerm(e.target.value)}
                value={term}
                type="text"
                placeholder="Enter package name here..."
                className="block w-full border-0 px-0 py-2 focus:outline-0 focus:ring-0 sm:text-sm"
              />
            </div>
          </form>
          <div>
            <button className="mb-4 mt-4 py-2 px-4 bg-cyan-600 border border-1-gray-200 hover:bg-cyan-800 rounded-xl text-white shadow-lg shadow-cyan-200/50">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 mx-auto px-8">
        {error && <h1>Ooops, an error occurred</h1>}
        {loading && <h1>BRB I'm loading...</h1>}
        {data && (
          <ul className="mx-auto">
            {data.map((repo) => {
              return <li className="p-4 text-xl">{repo}</li>;
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default RepositoriesList;
