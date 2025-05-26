import Button from "../../components/Button";
import PropTypes from "prop-types";

CertificacoesSection.propTypes = {
  certificacoes: PropTypes.array.isRequired,
  setFormData: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  t: PropTypes.object.isRequired,
  errors: PropTypes.object,
  isActive: PropTypes.bool,
  isGenerating: PropTypes.bool,
  gerarPDFHandler: PropTypes.func,
};

export default function CertificacoesSection({
  certificacoes,
  setFormData,
  addField,
  removeField,
  t,
  errors,
  isActive,
  isGenerating,
  gerarPDFHandler,
}) {
  return (
    <div id="certificacoes" className={`space-y-4 sm:space-y-6 ${!isActive && "hidden"}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          {t.campos.certificacoes}
        </h2>
        <Button
          type="button"
          onClick={() => addField("certificacoes", "")}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition-colors w-full sm:w-auto justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          {t.botoes.adicionarCertificacao}
        </Button>
      </div>

      {certificacoes.length > 0 ? (
        certificacoes.map((cert, idx) => (
          <div key={idx} className="mb-6 sm:mb-8 p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 relative">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.campos.certificacao}</label>
              <input
                type="text"
                value={cert}
                onChange={(e) => {
                  const newCerts = [...certificacoes];
                  newCerts[idx] = e.target.value;
                  setFormData((prev) => ({ ...prev, certificacoes: newCerts }));
                }}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder={t.placeholders.certificacao}
              />
            </div>
            <Button
              type="button"
              onClick={() => removeField("certificacoes", idx)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-red-500 transition-colors"
              title="Remover certificação"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        ))
      ) : (
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-500">{t.mensagens.nenhumaCertificacao}</p>
        </div>
      )}

      {/* Botão de gerar PDF pode ser passado como children ou controlado pelo App */}
    </div>
  );
}