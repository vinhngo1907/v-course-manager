import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box } from "@material-ui/core";
import PropTypes from 'prop-types';

const RootStyle = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: "flex-end"
});

const IconStyle = styled('div')(({theme})=> ({
    marginLeft: -4,
    borderRadius: '50%'
}));

ColorPreview.proptTypes = {
    colors: PropTypes.array.isRequired,
    
}