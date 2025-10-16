import React from 'react';
import CompaniesList from '.pages/CompaniesList';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex w-full">
      <div className="w-full p-2">
        <CompaniesList />
      </div>
    </div>
  );
}

export default App;
