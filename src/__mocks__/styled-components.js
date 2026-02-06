const styled = jest.requireActual('styled-components');

// If the actual module exports an object with a default property (ESM interop), wrapping it.
const styledDefault = styled.default || styled;

// We want to export a function that is the default export, 
// but also has all the properties of the module attached to it.
const mockStyled = styledDefault;

Object.keys(styled).forEach(key => {
  if (key !== 'default') {
    mockStyled[key] = styled[key];
  }
});

module.exports = mockStyled;
