import { useState } from "react";

// Hooks
import { useFormData } from "./hooks/useFormData";
import { useSectionNavigation } from "./hooks/useSectionNavigation";

// Utils
import { getTranslation } from "./i18n";
import { validateForm } from "./utils/validation";
import { gerarPDF } from "./utils/pdf";

// Constantes
import { idiomasApp } from "./constants/idiomasApp";
import { paisesTelefone } from "./constants/paisesTelefone";
import { tiposCurso } from "./constants/tiposCurso";

// Componentes globais
import Header from "./components/Header";
import Footer from "./components/Footer";
import SectionNav from "./components/SectionNav";
import SuccessMessage from "./components/SuccessMessage";
import GenerationAnimationModal from "./components/GenerationAnimationModal";

// Features
import PaymentModal from "./features/payment/PaymentModal";
import ResumeFormContainer from "./features/resume/ResumeFormContainer";
import { sectionsConfig } from "./features/resume/sections";

function App() {
  // Formulário e estado principal
  const { formData, setFormData, errors, setErrors, habilidadesInput, handleChange, handleArrayChange, addField, removeField, handleHabilidadesChange } =
    useFormData({
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

  // Estados auxiliares
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [idiomaApp, setIdiomaApp] = useState("pt");
  const [activeSection, setActiveSection] = useState("info");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showGenerationAnimation, setShowGenerationAnimation] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  // Tradução
  const t = getTranslation(idiomaApp);

  // Seções do currículo
  const sectionList = sectionsConfig.map((section) => ({
    id: section.id,
    label: section.label(t),
  }));

  // Navegação entre seções
  const { goToNext, goToPrev } = useSectionNavigation(sectionList, activeSection, setActiveSection);

  // Contexto para as seções
  const sectionContext = {
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
    t,
    tiposCurso,
    paisesTelefone,
  };

  // Validação do formulário
  const handleValidateForm = () => {
    const result = validateForm(formData, t);
    setErrors(result.errors);
    return result;
  };

  // Handler para gerar PDF
  const gerarPDFHandler = async () => {
    const validation = handleValidateForm();
    if (!validation.isValid) {
      if (validation.firstErrorSection) {
        setActiveSection(validation.firstErrorSection);
        setTimeout(() => {
          const sectionElement = document.getElementById(validation.firstErrorSection);
          if (sectionElement) {
            sectionElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 100);
      }
      return;
    }

    setIsGenerating(true);
    setShowGenerationAnimation(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setShowPaymentModal(true);

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
      setShowGenerationAnimation(false);
    }
  };

  // Renderização
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header t={t} idiomaApp={idiomaApp} setIdiomaApp={setIdiomaApp} idiomasApp={idiomasApp} onGenerate={gerarPDFHandler} isGenerating={isGenerating} />

      {showGenerationAnimation && <GenerationAnimationModal />}

      {/* Navegação por seções */}
      <SectionNav sections={sectionList} activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {successMessage && <SuccessMessage message={successMessage} />}

        <ResumeFormContainer
          activeSection={activeSection}
          sectionList={sectionList}
          sectionContext={sectionContext}
          formData={formData}
          setFormData={setFormData}
          addField={addField}
          removeField={removeField}
          t={t}
          errors={errors}
          isGenerating={isGenerating}
          gerarPDFHandler={gerarPDFHandler}
          goToPrev={goToPrev}
          goToNext={goToNext}
        />
      </main>

      {/* Modal de pagamento */}
      {showPaymentModal && (
        <PaymentModal
          show={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setShowQRCode(false);
          }}
          showQRCode={showQRCode}
          setShowQRCode={setShowQRCode}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
