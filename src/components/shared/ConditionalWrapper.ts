import {ReactElement} from 'react';

interface ConditionalWrapperProps {
  condition?: boolean;
  wrapper: any;
  children: ReactElement;
}

const ConditionalWrapper = ({ condition, wrapper, children }: ConditionalWrapperProps) => {
  return condition ? wrapper(children) : children;
}

export default ConditionalWrapper;
