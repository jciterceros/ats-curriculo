import React from "react";
import PropTypes from "prop-types";

InfoSection.propTypes = {
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  t: PropTypes.object.isRequired,
  paisesTelefone: PropTypes.array.isRequired,
};

function InfoSection({ formData, errors, handleChange, t, paisesTelefone }) {
  return (
    <div id="info" className={`space-y-4 sm:space-y-6`}>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        {t.campos.nome.split("*")[0]}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.campos.nome}</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className={`w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              errors.nome ? "border-red-500" : ""
            }`}
            placeholder={t.placeholders.nome}
          />
          {errors.nome && <p className="text-red-500 text-xs mt-1 sm:mt-2">{errors.nome}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.campos.cargoDesejado}</label>
          <input
            type="text"
            name="cargoDesejado"
            value={formData.cargoDesejado}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder={t.placeholders.cargoDesejado}
          />
        </div>
      </div>

      {/* Telefone com DDD e código do país */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.campos.codigoPais}</label>
          <select
            name="codigoPais"
            value={formData.codigoPais}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            {paisesTelefone.map((pais) => (
              <option key={pais.codigo} value={pais.codigo}>
                {pais.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.campos.ddd}</label>
          <input
            type="text"
            name="ddd"
            value={formData.ddd}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder={t.placeholders.ddd}
            maxLength="2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.campos.telefone}</label>
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder={t.placeholders.telefone}
          />
        </div>
      </div>

      {/* Cidade, LinkedIn e Portfolio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.campos.cidade}</label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder={t.placeholders.cidade}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.campos.linkedin}</label>
          <div className="flex">
            <span className="inline-flex items-center px-2 sm:px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-xs sm:text-sm">
              linkedin.com/in/
            </span>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="flex-1 min-w-0 block w-full p-2 sm:p-3 rounded-none rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder={t.placeholders.linkedin}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.campos.portfolio}</label>
          <input
            type="text"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder={t.placeholders.portfolio}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.campos.email}</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
            errors.email ? "border-red-500" : ""
          }`}
          placeholder={t.placeholders.email}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1 sm:mt-2">{errors.email}</p>}
      </div>
    </div>
  );
}

export default InfoSection;