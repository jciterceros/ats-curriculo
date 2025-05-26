import { useCallback } from "react";

export function useSectionNavigation(sectionList, activeSection, setActiveSection) {
  const goToNext = useCallback(() => {
    const sections = sectionList.map((s) => s.id);
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  }, [sectionList, activeSection, setActiveSection]);

  const goToPrev = useCallback(() => {
    const sections = sectionList.map((s) => s.id);
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  }, [sectionList, activeSection, setActiveSection]);

  return { goToNext, goToPrev };
}