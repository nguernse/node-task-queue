export const extractFormData = (formData: FormData) => {
  return Object.fromEntries(formData.entries());
};

export const formDataDecorator = (fn: Function) => {
  const wrapped = (formData: FormData) => {
    const data = extractFormData(formData);

    return fn(data);
  };

  return wrapped;
};
