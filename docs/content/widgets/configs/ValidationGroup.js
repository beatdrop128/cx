import {Md} from '../../../components/Md';

import pureContainer from './PureContainer';

export default {
    ...pureContainer,
    invalid: {
        key: true,
        type: 'boolean',
        description: <cx><Md>
            Binding which will be set to true if any of child form field reports validation error.
        </Md></cx>
    },
    valid: {
        key: true,
        type: 'boolean',
        description: <cx><Md>
            Binding which will be set to true if all child form field are valid.
        </Md></cx>
    },
    disabled: {
        key: true,
        type: 'boolean',
        description: <cx><Md>
            Set to `true` to disable all inner elements that support `disabled` property.
        </Md></cx>
    },
    enabled: {
        key: true,
        type: 'boolean',
        description: <cx><Md>
            Set to `false` to disable all inner elements that support `disabled` property.
        </Md></cx>
    }
};
