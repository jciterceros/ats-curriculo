import CertificacoesSection from "./CertificacoesSection";
import SectionNavigationButtons from "../../components/SectionNavigationButtons";
import { sectionsConfig } from "./sections";
import PropTypes from "prop-types";

ResumeFormContainer.propTypes = {
  activeSection: PropTypes.string.isRequired,
  sectionList: PropTypes.array.isRequired,
  sectionContext: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  t: PropTypes.object.isRequired,
  errors: PropTypes.object,
  isGenerating: PropTypes.bool,
  gerarPDFHandler: PropTypes.func.isRequired,
  goToPrev: PropTypes.func.isRequired,
  goToNext: PropTypes.func.isRequired,
};

export default function ResumeFormContainer({
  activeSection,
  sectionList,
  sectionContext,
  formData,
  setFormData,
  addField,
  removeField,
  t,
  errors,
  isGenerating,
  gerarPDFHandler,
  goToPrev,
  goToNext,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        gerarPDFHandler();
      }}
      className="space-y-6 sm:space-y-8"
    >
      {sectionsConfig.map((section) => {
        if (!section.component) return null;
        const SectionComponent = section.component;
        return (
          <div key={section.id} id={section.id} className={activeSection !== section.id ? "hidden" : ""}>
            <SectionComponent {...section.props(sectionContext)} />
          </div>
        );
      })}

      {activeSection === "certificacoes" && (
        <CertificacoesSection
          certificacoes={formData.certificacoes}
          setFormData={setFormData}
          addField={addField}
          removeField={removeField}
          t={t}
          errors={errors}
          isActive={activeSection === "certificacoes"}
          isGenerating={isGenerating}
          gerarPDFHandler={gerarPDFHandler}
        />
      )}

      <SectionNavigationButtons
        activeSection={activeSection}
        sectionList={sectionList}
        goToPrev={goToPrev}
        goToNext={goToNext}
        isGenerating={isGenerating}
        gerarPDFHandler={gerarPDFHandler}
        t={t}
      />
    </form>
  );
}