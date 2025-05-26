import React from "react";
import PropTypes from "prop-types";

ExperienceFields.propTypes = {
  experiencias: PropTypes.array.isRequired,
  handleArrayChange: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired,
  t: PropTypes.object.isRequired,
};

export default function ExperienceFields({
  experiencias,
  handleArrayChange,
  removeField,
  addField,
  t,
}) {
  return (
    <div>
      {experiencias.map((exp, idx) => (
        <div
          key={exp.id}
          className="mb-8 p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100 relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.campos.cargo}
              </label>
              <input
                type="text"
                value={exp.cargo}
                onChange={(e) =>
                  handleArrayChange("experiencias", idx, "cargo", e.target.value)
                }
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder={t.placeholders.cargo}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.campos.empresa}
              </label>
              <input
                type="text"
                value={exp.empresa}
                onChange={(e) =>
                  handleArrayChange("experiencias", idx, "empresa", e.target.value)
                }
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder={t.placeholders.empresa}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.campos.periodo}
              </label>
              <input
                type="text"
                value={exp.periodo}
                onChange={(e) =>
                  handleArrayChange("experiencias", idx, "periodo", e.target.value)
                }
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder={t.placeholders.periodo}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.campos.tecnologias}
              </label>
              <input
                type="text"
                value={exp.tecnologias}
                onChange={(e) =>
                  handleArrayChange("experiencias", idx, "tecnologias", e.target.value)
                }
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder={t.placeholders.tecnologias}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.campos.atividades}
            </label>
            <textarea
              value={exp.atividades}
              onChange={(e) =>
                handleArrayChange("experiencias", idx, "atividades", e.target.value)
              }
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              rows={3}
              placeholder={t.placeholders.atividades}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.campos.resultados}
            </label>
            <textarea
              value={exp.resultados}
              onChange={(e) =>
                handleArrayChange("experiencias", idx, "resultados", e.target.value)
              }
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              rows={3}
              placeholder={t.placeholders.resultados}
            />
          </div>

          <button
            type="button"
            onClick={() => removeField("experiencias", idx)}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-red-500 transition-colors"
            title="Remover experiência"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          addField("experiencias", {
            id: Date.now(),
            cargo: "",
            empresa: "",
            periodo: "",
            tecnologias: "",
            atividades: "",
            resultados: "",
          })
        }
        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition-colors w-full sm:w-auto justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          />
        </svg>
        {t.botoes.adicionarExperiencia}
      </button>
    </div>
  );
}