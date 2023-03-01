import { Rings } from 'react-loader-spinner';
import { LoaderBox } from './Loader.styled';
export const Loader = () => {
  return (
    <LoaderBox role="alert">
      <Rings color="#21c18e" height={100} width={100} ariaLabel="loading" />
    </LoaderBox>
  );
};