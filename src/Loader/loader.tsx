import {Box, ColorWrap} from './loader.styledComponents';

export const Loader = () => (
  <ColorWrap>
    {Array.from({ length: 49 }, (_, index) => <Box key={index} index={index} />)}
  </ColorWrap>
);