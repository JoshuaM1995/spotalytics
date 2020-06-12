import React, {ReactNode} from 'react';
import {Tooltip} from "rsuite";

const tooltip = (inner: ReactNode|string) => <Tooltip>{ inner }</Tooltip>;

export default tooltip;
