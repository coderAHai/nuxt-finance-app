export const useAppToast = () => {
  const toast = useToast();
  const toastSucess = (title, description = null) => {
    toast.add({
      title,
      description,
      icon: "i-heroicons-check-circle",
      color: "green",
    });
  };
  const toastError = (title, description = null) => {
    toast.add({
      title,
      description,
      icon: "i-heroicons-exclamation-circle",
      color: "red",
    });
  };

  return { toastSucess, toastError };
};
