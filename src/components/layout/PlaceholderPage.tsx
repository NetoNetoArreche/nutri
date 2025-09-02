import React from 'react';

interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-neutral-700 mb-2">{title}</h2>
        <p className="text-neutral-500">Em desenvolvimento...</p>
      </div>
    </div>
  );
};
