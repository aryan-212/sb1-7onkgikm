import React from 'react';
import { Camera } from 'lucide-react';
import { PhotoUploader } from './components/PhotoUploader';
import { PhotoGrid } from './components/PhotoGrid';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center">
          <Camera className="h-8 w-8 text-blue-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Secure Photo Storage</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <PhotoUploader />
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Photos</h2>
          <PhotoGrid />
        </div>
      </main>
    </div>
  );
}

export default App;