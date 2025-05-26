import PropTypes from "prop-types";

Header.propTypes = {
  t: PropTypes.object.isRequired,
  idiomaApp: PropTypes.string.isRequired,
  setIdiomaApp: PropTypes.func.isRequired,
  idiomasApp: PropTypes.arrayOf(
    PropTypes.shape({
      codigo: PropTypes.string.isRequired,
      nome: PropTypes.string.isRequired,
      icone: PropTypes.string,
    })
  ).isRequired,
  onGenerate: PropTypes.func.isRequired,
  isGenerating: PropTypes.bool.isRequired,
};

export default function Header({ t, idiomaApp, setIdiomaApp, idiomasApp, onGenerate, isGenerating }) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{t.tituloApp}</h1>
            <p className="text-blue-100 mt-1 sm:mt-2 text-sm sm:text-base">{t.subtituloApp}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <select
              value={idiomaApp}
              onChange={(e) => setIdiomaApp(e.target.value)}
              className="bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white transition-all"
            >
              {idiomasApp.map((idioma) => (
                <option key={idioma.codigo} value={idioma.codigo} className="text-gray-800">
                  {idioma.icone} {idioma.nome}
                </option>
              ))}
            </select>
            <button
              onClick={onGenerate}
              disabled={isGenerating}
              className={`px-4 sm:px-6 py-2 rounded-full text-white font-medium flex items-center justify-center transition-all ${
                isGenerating ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg"
              }`}
            >
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-sm sm:text-base">{t.mensagens.gerando}</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-sm sm:text-base">{t.botoes.gerarCV}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}