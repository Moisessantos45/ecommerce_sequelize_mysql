const isString = (value: string): boolean => {
  return typeof value === "string";
};

const convertStringToBoolean = (value: string): boolean => {
  if (!isString(value)) {
    throw new Error("The value is not a string");
  }

  if (["true", "false"].indexOf(value) === -1) {
    throw new Error("The value is not a boolean");
  }

  return JSON.parse(value);
};

export { isString, convertStringToBoolean };
