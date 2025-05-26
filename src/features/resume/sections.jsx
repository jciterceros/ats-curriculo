import InfoSection from "./InfoSection";
import ExperienceFields from "./ExperienceFields";
import EducationFields from "./EducationFields";
import HabilidadesSection from "./HabilidadesSection";
import LanguageFields from "./LanguageFields";
import PropTypes from "prop-types";

ResumoSection.propTypes = {
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  t: PropTypes.object.isRequired,
};

// Exemplo de componente para o resumo (crie se ainda não existir)
function ResumoSection({ formData, errors, handleChange, t }) {
  return (
    <div className="space-y-4 sm:space-y-6">
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        {t.campos.resumo}
      </h2>
      <textarea
        name="resumo"
        value={formData.resumo}
        onChange={handleChange}
        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
          errors.resumo ? "border-red-500" : ""
        }`}
        rows={5}
        placeholder={t.placeholders.resumo}
      />
      {errors.resumo && <p className="text-red-500 text-xs mt-1 sm:mt-2">{errors.resumo}</p>}
      <p className="text-xs text-gray-500">{t.placeholders.resumo.split(":")[0]}</p>
    </div>
  );
}

export const sectionsConfig = [
  {
    id: "info",
    label: (t) => t.campos.nome.split("*")[0],
    component: InfoSection,
    props: (ctx) => ({
      formData: ctx.formData,
      errors: ctx.errors,
      handleChange: ctx.handleChange,
      t: ctx.t,
      paisesTelefone: ctx.paisesTelefone,
    }),
  },
  {
    id: "resumo",
    label: (t) => t.campos.resumo.split("*")[0],
    component: ResumoSection,
    props: (ctx) => ({
      formData: ctx.formData,
      errors: ctx.errors,
      handleChange: ctx.handleChange,
      t: ctx.t,
    }),
  },
  {
    id: "experiencia",
    label: (t) => t.campos.experiencia,
    component: ExperienceFields,
    props: (ctx) => ({
      experiencias: ctx.formData.experiencias,
      handleArrayChange: ctx.handleArrayChange,
      removeField: ctx.removeField,
      addField: ctx.addField,
      t: ctx.t,
    }),
  },
  {
    id: "formacao",
    label: (t) => t.campos.formacao,
    component: EducationFields,
    props: (ctx) => ({
      formacoes: ctx.formData.formacoes,
      handleArrayChange: ctx.handleArrayChange,
      removeField: ctx.removeField,
      addField: ctx.addField,
      errors: ctx.errors,
      t: ctx.t,
      tiposCurso: ctx.tiposCurso,
    }),
  },
  {
    id: "habilidades",
    label: (t) => t.campos.habilidades,
    component: HabilidadesSection,
    props: (ctx) => ({
      formData: ctx.formData,
      habilidadesInput: ctx.habilidadesInput,
      handleHabilidadesChange: ctx.handleHabilidadesChange,
      t: ctx.t,
      errors: ctx.errors,
    }),
  },
  {
    id: "idiomas",
    label: (t) => t.campos.idiomas,
    component: LanguageFields,
    props: (ctx) => ({
      idiomas: ctx.formData.idiomas,
      handleArrayChange: ctx.handleArrayChange,
      removeField: ctx.removeField,
      addField: ctx.addField,
      t: ctx.t,
    }),
  },
  // Certificações pode ser um componente próprio, mas aqui é só label para navegação
  {
    id: "certificacoes",
    label: (t) => t.campos.certificacoes,
    // O componente de certificações é renderizado diretamente no App.js, então pode deixar vazio ou criar um componente se quiser padronizar
    component: null,
    props: () => ({}),
  },
];