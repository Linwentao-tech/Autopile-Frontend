const categoryConverter = (category: number) => {
  if (category === 0) {
    return "accessories";
  }
  if (category === 1) {
    return "vehicle-body-parts";
  }
  if (category === 2) {
    return "wheels-and-rims";
  }
  if (category === 3) {
    return "engine";
  }
};

export default categoryConverter;
