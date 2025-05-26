import { useState } from "react";

export function useFormData(initialState) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [habilidadesInput, setHabilidadesInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, name, value) => {
    setFormData((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = { ...newArray[index], [name]: value };
      return { ...prev, [field]: newArray };
    });
  };

  const addField = (field, initialValue = "") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [
        ...prev[field],
        typeof initialValue === "object" ? { ...initialValue } : initialValue,
      ],
    }));
  };

  const removeField = (field, index) => {
    setFormData((prev) => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };

  const handleHabilidadesChange = (e) => {
    const value = e.target.value;
    setHabilidadesInput(value);

    const habilidadesArray = value
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);

    setFormData((prev) => ({ ...prev, habilidades: habilidadesArray }));
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    habilidadesInput,
    setHabilidadesInput,
    handleChange,
    handleArrayChange,
    addField,
    removeField,
    handleHabilidadesChange,
  };
}