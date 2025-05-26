import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { sanitizeForATS } from "./sanitize";

// Função utilitária para formatar texto para PDF
function formatarTextoParaPDF(text, maxWidth, font, fontSize) {
  if (!text) return [""];
  const paragraphs = text.split("\n");
  let lines = [];
  for (const paragraph of paragraphs) {
    const words = paragraph.split(" ");
    let currentLine = words[0] || "";
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine + " " + word;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width < maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
  }
  return lines;
}

// Função principal para gerar o PDF
export async function gerarPDF(formData, t, tiposCurso) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const black = rgb(0, 0, 0);

  const marginX = 50;
  const marginY = 40;
  const maxWidth = width - 2 * marginX;
  let y = height - marginY;
  const lineHeight = 12;
  const sectionGap = 10;
  const minY = marginY + 30;

  // Desenha texto com quebra de linha automática
  const drawText = (text, x, y, size, maxWidth, font, color, lineHeightMultiplier = 1.2) => {
    const lines = formatarTextoParaPDF(text, maxWidth, font, size);
    lines.forEach((line, i) => {
      page.drawText(line, {
        x,
        y: y - i * (size * lineHeightMultiplier),
        size,
        font,
        color,
      });
    });
    return lines.length;
  };

  // Verifica se precisa de nova página
  const checkForNewPage = (requiredSpace = lineHeight) => {
    if (y - requiredSpace < minY) {
      pdfDoc.addPage([595, 842]);
      y = height - marginY;
    }
  };

  // Desenha título de seção
  const drawSectionTitle = (title) => {
    checkForNewPage(lineHeight * 1.5);
    page.drawText(title.toUpperCase(), {
      x: marginX,
      y,
      size: 11,
      font: boldFont,
      color: black,
    });
    page.drawLine({
      start: { x: marginX, y: y - 2 },
      end: { x: marginX + 50, y: y - 2 },
      thickness: 1,
      color: black,
    });
    y -= lineHeight * 1.2;
  };

  // 1. Cabeçalho (Nome e Cargo)
  const nome = sanitizeForATS(formData.nome);
  const cargo = sanitizeForATS(formData.cargoDesejado || "");
  checkForNewPage(lineHeight * 2);
  page.drawText(nome.toUpperCase(), {
    x: marginX,
    y,
    size: 16,
    font: boldFont,
    color: black,
  });
  y -= lineHeight * 1.5;
  if (cargo) {
    page.drawText(cargo, {
      x: marginX,
      y,
      size: 12,
      font,
      color: black,
    });
    y -= lineHeight * 1.2;
  }

  // 2. Informações de Contato
  const contactInfo = [
    formData.telefone && `${formData.codigoPais} ${formData.ddd} ${formData.telefone}`,
    formData.email,
    formData.linkedin && `linkedin.com/in/${formData.linkedin}`,
    formData.portfolio && (formData.portfolio.includes("github.com") ? `github.com/${formData.portfolio.split("github.com/").pop()}` : formData.portfolio),
    formData.cidade,
  ].filter(Boolean).join(" • ");
  const contactLines = drawText(
    sanitizeForATS(contactInfo),
    marginX,
    y,
    9,
    maxWidth,
    font,
    black,
    1.1
  );
  y -= contactLines * (9 * 1.1);
  y -= 8;

  // 3. Resumo Profissional
  if (formData.resumo) {
    drawSectionTitle(t.secoesPDF.resumo);
    const resumoLines = drawText(
      sanitizeForATS(formData.resumo),
      marginX,
      y,
      10,
      maxWidth,
      font,
      black,
      1.1
    );
    y -= resumoLines * (10 * 1.1);
    y -= sectionGap;
  }

  // 4. Experiência Profissional
  if (formData.experiencias.length > 0) {
    drawSectionTitle(t.secoesPDF.experiencia);
    formData.experiencias.forEach((exp, idx) => {
      const headerParts = [
        exp.cargo && `${exp.cargo}`,
        exp.empresa && `@ ${exp.empresa}`,
        exp.periodo && ` | ${exp.periodo}`,
      ].filter(Boolean);
      const header = headerParts.join(" ");
      const headerLines = drawText(
        sanitizeForATS(header),
        marginX,
        y,
        10,
        maxWidth,
        boldFont,
        black,
        1.1
      );
      y -= headerLines * (10 * 1.1);

      if (exp.tecnologias) {
        const techText = `Tecnologias: ${exp.tecnologias}`;
        const techLines = drawText(
          sanitizeForATS(techText),
          marginX + 10,
          y,
          9,
          maxWidth - 10,
          font,
          black,
          1.1
        );
        y -= techLines * (9 * 1.1);
      }

      if (exp.atividades) {
        const atividades = exp.atividades
          .split("\n")
          .filter((a) => a.trim())
          .map((a) => a.trim().replace(/^[-•*]\s*/, ""));
        if (atividades.length > 0) {
          atividades.forEach((atividade) => {
            checkForNewPage();
            page.drawText("•", {
              x: marginX,
              y: y + 1,
              size: 9,
              font,
              color: black,
            });
            const lines = drawText(
              sanitizeForATS(atividade),
              marginX + 8,
              y,
              9,
              maxWidth - 8,
              font,
              black,
              1.1
            );
            y -= lines * (9 * 1.1);
          });
        }
      }

      if (exp.resultados) {
        const resultados = exp.resultados
          .split("\n")
          .filter((r) => r.trim())
          .map((r) => r.trim().replace(/^[-•*]\s*/, ""));
        if (resultados.length > 0) {
          resultados.forEach((resultado) => {
            checkForNewPage();
            page.drawText("•", {
              x: marginX,
              y: y + 1,
              size: 9,
              font,
              color: black,
            });
            const lines = drawText(
              sanitizeForATS(resultado),
              marginX + 8,
              y,
              9,
              maxWidth - 8,
              font,
              black,
              1.1
            );
            y -= lines * (9 * 1.1);
          });
        }
      }

      if (idx < formData.experiencias.length - 1) {
        y -= 6;
        checkForNewPage();
      }
    });
    y -= sectionGap;
  }

  // 5. Formação Acadêmica
  if (formData.formacoes.some((f) => f.curso || f.instituicao)) {
    drawSectionTitle(t.secoesPDF.formacao);
    formData.formacoes.forEach((form) => {
      if (form.curso || form.instituicao) {
        const tipoCurso = tiposCurso.find((t) => t.valor === form.tipo)?.label || "";
        const titleParts = [
          tipoCurso && `${tipoCurso}`,
          form.curso && `em ${form.curso}`,
          form.instituicao && `@ ${form.instituicao}`,
          form.periodo && `(${form.periodo})`,
        ].filter(Boolean);
        const title = titleParts.join(" ");
        checkForNewPage();
        page.drawText("•", {
          x: marginX,
          y: y + 1,
          size: 9,
          font,
          color: black,
        });
        const lines = drawText(
          sanitizeForATS(title),
          marginX + 8,
          y,
          9,
          maxWidth - 8,
          font,
          black,
          1.1
        );
        y -= lines * (9 * 1.1);
      }
    });
    y -= sectionGap;
  }

  // 6. Habilidades Técnicas
  if (formData.habilidades.length > 0) {
    drawSectionTitle(t.secoesPDF.habilidades);
    const uniqueSkills = [...new Set(formData.habilidades.map((s) => s.trim()).filter((s) => s.length > 0))];
    const middleIndex = Math.ceil(uniqueSkills.length / 2);
    const column1 = uniqueSkills.slice(0, middleIndex);
    const column2 = uniqueSkills.slice(middleIndex);
    const columnWidth = (maxWidth - 10) / 2;
    let currentY = y;
    column1.forEach((skill) => {
      checkForNewPage();
      page.drawText("•", {
        x: marginX,
        y: currentY + 1,
        size: 9,
        font,
        color: black,
      });
      drawText(sanitizeForATS(skill), marginX + 8, currentY, 9, columnWidth - 8, font, black, 1.1);
      currentY -= 9 * 1.1;
    });
    if (column2.length > 0) {
      currentY = y;
      column2.forEach((skill) => {
        checkForNewPage();
        page.drawText("•", {
          x: marginX + columnWidth + 10,
          y: currentY + 1,
          size: 9,
          font,
          color: black,
        });
        drawText(sanitizeForATS(skill), marginX + columnWidth + 18, currentY, 9, columnWidth - 8, font, black, 1.1);
        currentY -= 9 * 1.1;
      });
    }
    y = currentY;
    y -= sectionGap;
  }

  // 7. Idiomas
  if (formData.idiomas.some((i) => i.idioma)) {
    drawSectionTitle(t.secoesPDF.idiomas);
    formData.idiomas.forEach((idioma) => {
      if (idioma.idioma) {
        const text = [idioma.idioma, idioma.nivel && `(${idioma.nivel})`].filter(Boolean).join(" ");
        checkForNewPage();
        page.drawText("•", {
          x: marginX,
          y: y + 1,
          size: 9,
          font,
          color: black,
        });
        const lines = drawText(
          sanitizeForATS(text),
          marginX + 8,
          y,
          9,
          maxWidth - 8,
          font,
          black,
          1.1
        );
        y -= lines * (9 * 1.1);
      }
    });
    y -= sectionGap;
  }

  // 8. Certificações
  if (formData.certificacoes.length > 0) {
    drawSectionTitle(t.secoesPDF.certificacoes);
    formData.certificacoes
      .filter((c) => c.trim())
      .forEach((cert) => {
        checkForNewPage();
        page.drawText("•", {
          x: marginX,
          y: y + 1,
          size: 9,
          font,
          color: black,
        });
        const lines = drawText(
          sanitizeForATS(cert),
          marginX + 8,
          y,
          9,
          maxWidth - 8,
          font,
          black,
          1.1
        );
        y -= lines * (9 * 1.1);
      });
  }

  // Retorna o PDF gerado
  return await pdfDoc.save();
}