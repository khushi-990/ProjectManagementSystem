import { ReactNode } from 'react';

import { AuthWrapper } from './FormLayout.Styled';

export interface IAuthProps {
  containerClassName?: string;
  authBg?: string;
  children?: ReactNode;
}
const FormLayout = (props: IAuthProps) => {
  const { containerClassName, authBg, children } = props;
  return (
    <AuthWrapper className={`authLayout ${containerClassName}`}>
      <div className={`authWrapper ${!authBg ? 'authBg' : authBg}`}>
        <div className="contentWrapper">{children}</div>
      </div>
    </AuthWrapper>
  );
};

export default FormLayout;
