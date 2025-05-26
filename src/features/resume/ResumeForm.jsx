import { useState } from "react";
import { getTranslation } from "../../i18n";
import { useFormData } from "../../hooks/useFormData";
import { validateForm } from "../../utils/validation";
import { gerarPDF } from "../../utils/pdf";
import ExperienceFields from "./ExperienceFields";
import EducationFields from "./EducationFields";
import LanguageFields from "./LanguageFields";
import PropTypes from "prop-types";

ResumeForm.propTypes = {
  idiomaApp: PropTypes.string.isRequired,
  paisesTelefone: PropTypes.array.isRequired,
};

const tiposCurso = [
  { valor: "superior", label: "Ensino Superior" },
  { valor: "tecnologo", label: "Tecnólogo" },
  { valor: "medio", label: "Ensino Médio" },
  { valor: "tecnico", label: "Técnico" },
  { valor: "pos", label: "Pós-Graduação" },
  { valor: "mestrado", label: "Mestrado" },
  { valor: "doutorado", label: "Doutorado" },
  { valor: "outro", label: "Outro" },
];

export default function ResumeForm({ idiomaApp, paisesTelefone }) {
  const t = getTranslation(idiomaApp);

  const {
    formData,
    setFormData,
    errors,
    setErrors,
    habilidadesInput,
    handleChange,
    handleArrayChange,
    addField,
    removeField,
    handleHabilidadesChange,
  } = useFormData({
    nome: "",
    telefone: "",
    ddd: "",
    codigoPais: "+55",
    cidade: "",
    email: "",
    linkedin: "",
    portfolio: "",
    cargoDesejado: "",
    resumo: "",
    experiencias: [],
    formacoes: [{ tipo: "superior", curso: "", instituicao: "", periodo: "" }],
    habilidades: [],
    certificacoes: [],
    idiomas: [{ idioma: "", nivel: "" }],
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [activeSection, setActiveSection] = useState("info");

  const handleValidateForm = () => {
    const result = validateForm(formData, t);
    setErrors(result.errors);
    return result;
  };

  const gerarPDFHandler = async () => {
    const validation = handleValidateForm();
    if (!validation.isValid) {
      if (validation.firstErrorSection) setActiveSection(validation.firstErrorSection);
      return;
    }
    setIsGenerating(true);
    try {
      const pdfBytes = await gerarPDF(formData, t, tiposCurso);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `CV_${formData.nome.replace(/\s+/g, "_")}_ATS.pdf`;
      link.click();
      setSuccessMessage(t.mensagens.sucesso);
      setTimeout(() => setSuccessMessage(""), 10000);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        gerarPDFHandler();
      }}
      className="space-y-6 sm:space-y-8"
    >
      {/* Informações Pessoais */}
      <div id="info" className={`space-y-4 sm:space-y-6 ${activeSection !== "info" && "hidden"}`}>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{t.campos.nome.split("*")[0]}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.campos.nome}</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={`w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.nome ? "border-red-500" : ""}`}
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
                <option key={pais.codigo} value={pais.codigo}>{pais.nome}</option>
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
            className={`w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.email ? "border-red-500" : ""}`}
            placeholder={t.placeholders.email}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 sm:mt-2">{errors.email}</p>}
        </div>
      </div>

      {/* Resumo Profissional */}
      <div id="resumo" className={`space-y-4 sm:space-y-6 ${activeSection !== "resumo" && "hidden"}`}>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{t.campos.resumo}</h2>
        <textarea
          name="resumo"
          value={formData.resumo}
          onChange={handleChange}
          className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.resumo ? "border-red-500" : ""}`}
          rows={5}
          placeholder={t.placeholders.resumo}
        />
        {errors.resumo && <p className="text-red-500 text-xs mt-1 sm:mt-2">{errors.resumo}</p>}
        <p className="text-xs text-gray-500">{t.placeholders.resumo.split(":")[0]}</p>
      </div>

      {/* Experiência Profissional */}
      <div id="experiencia" className={`space-y-4 sm:space-y-6 ${activeSection !== "experiencia" && "hidden"}`}>
        <ExperienceFields
          experiencias={formData.experiencias}
          handleArrayChange={handleArrayChange}
          removeField={removeField}
          addField={addField}
          t={t}
        />
      </div>

      {/* Formação Acadêmica */}
      <div id="formacao" className={`space-y-4 sm:space-y-6 ${activeSection !== "formacao" && "hidden"}`}>
        <EducationFields
          formacoes={formData.formacoes}
          handleArrayChange={handleArrayChange}
          removeField={removeField}
          addField={addField}
          errors={errors}
          t={t}
          tiposCurso={tiposCurso}
        />
      </div>

      {/* Habilidades Técnicas */}
      <div id="habilidades" className={`space-y-4 sm:space-y-6 ${activeSection !== "habilidades" && "hidden"}`}>
        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.placeholders.habilidades.split(":")[0]}</label>
        <input
          type="text"
          value={habilidadesInput}
          onChange={handleHabilidadesChange}
          className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder={t.placeholders.habilidades}
        />
        <p className="text-xs text-gray-500 mt-1 sm:mt-2">{t.placeholders.habilidades.split(":")[0]}</p>
        {formData.habilidades.length > 0 && (
          <div className="mt-3 sm:mt-4">
            <p className="text-sm font-medium text-gray-700 mb-1 sm:mb-2">Pré-visualização:</p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {formData.habilidades.map((skill, idx) => (
                <span key={skill} className="bg-blue-100 text-blue-800 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Idiomas */}
      <div id="idiomas" className={`space-y-4 sm:space-y-6 ${activeSection !== "idiomas" && "hidden"}`}>
        <LanguageFields
          idiomas={formData.idiomas}
          handleArrayChange={handleArrayChange}
          removeField={removeField}
          addField={addField}
          t={t}
        />
      </div>

      {/* Certificações */}
      <div id="certificacoes" className={`space-y-4 sm:space-y-6 ${activeSection !== "certificacoes" && "hidden"}`}>
        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">{t.campos.certificacoes}</label>
        {formData.certificacoes.map((cert, idx) => (
          <div key={cert} className="mb-4 flex items-center gap-2">
            <input
              type="text"
              value={cert}
              onChange={(e) => {
                const newCerts = [...formData.certificacoes];
                newCerts[idx] = e.target.value;
                setFormData((prev) => ({ ...prev, certificacoes: newCerts }));
              }}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder={t.placeholders.certificacao}
            />
            <button
              type="button"
              onClick={() => removeField("certificacoes", idx)}
              className="text-gray-500 hover:text-red-500 transition-colors"
              title="Remover certificação"
            >
              &times;
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField("certificacoes", "")}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition-colors w-full sm:w-auto justify-center"
        >
          {t.botoes.adicionarCertificacao}
        </button>
      </div>

      {/* Navegação entre seções */}
      <div className="flex flex-col-reverse sm:flex-row justify-between pt-6 sm:pt-8 border-t border-gray-200 gap-4">
        <button
          type="button"
          onClick={() => {
            const sections = ["info", "resumo", "experiencia", "formacao", "habilidades", "idiomas", "certificacoes"];
            const currentIndex = sections.indexOf(activeSection);
            if (currentIndex > 0) setActiveSection(sections[currentIndex - 1]);
          }}
          disabled={activeSection === "info"}
          className={`flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors ${
            activeSection === "info" ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:bg-blue-50"
          }`}
        >
          Anterior
        </button>
        {activeSection !== "certificacoes" ? (
          <button
            type="button"
            onClick={() => {
              const sections = ["info", "resumo", "experiencia", "formacao", "habilidades", "idiomas", "certificacoes"];
              const currentIndex = sections.indexOf(activeSection);
              if (currentIndex < sections.length - 1) setActiveSection(sections[currentIndex + 1]);
            }}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Próximo
          </button>
        ) : (
          <button
            type="submit"
            disabled={isGenerating}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium flex items-center justify-center transition-all ${
              isGenerating ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
            }`}
          >
            {isGenerating ? t.mensagens.gerando : t.botoes.gerarCV}
          </button>
        )}
      </div>
      {successMessage && <div className="text-green-600 mt-4">{successMessage}</div>}
    </form>
  );
}