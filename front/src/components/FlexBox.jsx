import Box from '@material-ui/core/Box';

import {withStyles} from '@material-ui/core/styles';

const FlexBox = withStyles((theme) => ({
  root: {
    display: 'flex',
  },
}))(Box);

export default FlexBox;
