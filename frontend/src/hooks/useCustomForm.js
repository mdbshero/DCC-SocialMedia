import { useState } from "react";

const useCustomForm = (initialValues = {}, onSubmit) => {
  const [formData, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    e.persist();
    if (e.target.name === "isAdmin") {
      console.log("ADMIN!");
      setFormValues({ ...formData, [e.target.name]: e.target.checked });
    } else if (e.target.name === "image") {
      console.log("image!", e.target.files);
      setFormValues({ ...formData, "image": e.target.files[0] });
    } else {
      console.log("ELSE!");
      setFormValues({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log(formData);
  };

  const reset = () => {
    setFormValues(initialValues);
  };

  return [formData, handleInputChange, handleSubmit, reset];
};

export default useCustomForm;
