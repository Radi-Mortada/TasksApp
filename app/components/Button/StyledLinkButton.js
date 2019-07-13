import styled from 'styled-components';
import { Link } from 'react-router-dom';
import buttonStyles from './buttonStyles';

const StyledLinkButton = styled(Link)`
  ${buttonStyles}
`;

export default StyledLinkButton;
