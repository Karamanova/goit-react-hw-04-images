import errorImage from '../../asset/errorImage.webp';
import { ErrorBox } from './SearchError.styled';

export const SearchError = () => {
  return (
    <ErrorBox role="alert">
      <img src={errorImage} alt="errorImageUnicorn" />
    </ErrorBox>
  );
};