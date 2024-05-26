import { Stars } from './starfield.styledComponents';

export const Starfield = () => (
  <>
    <Stars size={1} shadowCount={1000} id="stars1" />
    <Stars size={2} shadowCount={200} id="stars2" />
    <Stars size={3} shadowCount={100} id="stars3" />
  </>
);
