export function validateForm(formData, t) {
  const errors = {};
  let firstErrorSection = null;

  // Nome
  if (!formData.nome.trim()) {
    errors.nome = t.campos.nome.replace("*", "") + " é obrigatório";
    if (!firstErrorSection) firstErrorSection = "info";
  }

  // Email
  if (!formData.email.trim()) {
    errors.email = t.campos.email.replace("*", "") + " é obrigatório";
    if (!firstErrorSection) firstErrorSection = "info";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = "Email inválido";
    if (!firstErrorSection) firstErrorSection = "info";
  }

  // Resumo
  if (!formData.resumo.trim()) {
    errors.resumo = t.campos.resumo.replace("*", "") + " é obrigatório";
    if (!firstErrorSection) firstErrorSection = "resumo";
  }

  // Formações
  formData.formacoes.forEach((form, idx) => {
    if (!form.curso.trim()) {
      errors[`formacao_curso_${idx}`] = t.campos.curso.replace("*", "") + " é obrigatório";
      if (!firstErrorSection) firstErrorSection = "formacao";
    }
    if (!form.instituicao.trim()) {
      errors[`formacao_instituicao_${idx}`] = t.campos.instituicao.replace("*", "") + " é obrigatória";
      if (!firstErrorSection) firstErrorSection = "formacao";
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    firstErrorSection,
  };
}