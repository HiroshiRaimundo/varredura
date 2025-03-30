
import React from 'react';

export interface PressReleaseFormProps {
  clientType: string;
}

const PressReleaseForm: React.FC<PressReleaseFormProps> = ({ clientType }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Criar novo Release</h2>
      <p>Formulário para o tipo de cliente: {clientType}</p>
      {/* Form implementation */}
    </div>
  );
};

export default PressReleaseForm;
