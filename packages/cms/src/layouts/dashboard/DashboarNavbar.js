import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { Toolbar } from "@material-ui/core";

import { experimentalStyled as styled } from '@material-ui/core/styles';

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
    }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('lg')]: {
        minHeight: APPBAR_DESKTOP,
        padding: theme.spacing(0, 5)
    }
}));
DashboardNavbar.prototype = {
    profile: PropTypes.object,
    onOpenSidebar: PropTypes.func
}
export default function DashboardNavbar() {
    return (
        <RootStyle>
            <ToolbarStyle>
                <Box sx={{ flexGrow: 1 }} />
                {/* <Searchbar /> */}
                <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5 }}>
                    {/* <LanguagePopover /> */}
                    {/* <NotificationsPopover /> */}
                    {/* {profile && <AccountPopover profile={profile} />} */}
                </Stack>
            </ToolbarStyle>
        </RootStyle>
    )
}