import Button from "../../components/Button";

export default function PaymentModal({ show, onClose, showQRCode, setShowQRCode }) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 sm:p-8 shadow-2xl animate-[fadeIn_0.3s_ease-out] border border-gray-200">
        {/* Botão X com animação */}
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 focus:outline-none"
          aria-label="Fechar modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>

        {/* Cabeçalho com ícone */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                   2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                   C13.09 3.81 14.76 3 16.5 3 
                   19.58 3 22 5.42 22 8.5 
                   c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </div>
          <h3 id="modal-title" className="text-2xl font-bold text-gray-800 mb-2">
            Juntos, vamos mais longe!
          </h3>
          <p className="text-sm text-gray-500">Sua contribuição me ajuda a manter este projeto gratuito e a melhorar ainda mais a experiência para todos.</p>
        </div>

        {/* QR Code com animação de entrada */}
        {showQRCode && (
          <div className="flex flex-col items-center mb-6 animate-[slideUp_0.4s_ease-out]">
            <div className="relative p-2 bg-white rounded-xl shadow-lg ring-2 ring-blue-200/50">
              <img src="/qrcode.png" alt="QR Code para doação via PIX" className="w-44 h-44 object-contain rounded-lg" />
              <div className="absolute inset-0 rounded-lg border-2 border-dashed border-blue-200 animate-ping opacity-0 pointer-events-none"></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Escaneie o QR Code</p>
          </div>
        )}

        {/* Mensagem motivacional */}
        <div className={`text-center mb-6 transition-all duration-300 ${showQRCode ? "opacity-100" : "opacity-0 h-0"}`}>
          <p className="text-sm text-gray-600">Cada doação, por menor que seja, ajuda a manter esse site no ar!</p>
        </div>

        {/* Chave PIX (aparece após mostrar QR Code) */}
        {showQRCode && (
          <div className="mb-6 animate-[fadeIn_0.5s_ease-out]">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <p className="text-xs font-medium text-blue-800 mb-1">Chave PIX (copiada automaticamente):</p>
              <div className="flex items-center justify-between bg-white p-2 rounded">
                <p className="text-xs font-mono text-gray-700 break-all">80eb8e06-493b-4870-9dfc-47ed230c5d16</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                  <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Botões com animações */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => {
              setShowQRCode(true);
              navigator.clipboard.writeText("80eb8e06-493b-4870-9dfc-47ed230c5d16");
              const button = document.getElementById("donate-button");
              if (button) {
                button.classList.add("animate-[pulse_0.5s_ease-in-out]");
                setTimeout(() => {
                  button.classList.remove("animate-[pulse_0.5s_ease-in-out]");
                }, 500);
              }
            }}
            id="donate-button"
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Doar
          </Button>

          <Button
            onClick={() => {
              window.location.href = "mailto:codegabriel.ti@gmail.com?subject=Reportar%20Erro%20ou%20Sugestão";
              const button = document.getElementById("report-button");
              if (button) {
                button.classList.add("animate-[shake_0.5s_ease-in-out]");
                setTimeout(() => {
                  button.classList.remove("animate-[shake_0.5s_ease-in-out]");
                }, 500);
              }
            }}
            id="report-button"
            className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Reportar Problema
          </Button>
        </div>

        {/* Rodapé */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">Obrigado por fazer parte dessa jornada conosco!</p>
        </div>
      </div>
    </div>
  );
}
