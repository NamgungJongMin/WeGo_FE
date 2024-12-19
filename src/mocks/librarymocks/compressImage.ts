export const compressImage = jest.fn((file) =>
  Promise.resolve(
    new File([file], `compressed-${file.name}`, { type: file.type }),
  ),
);
