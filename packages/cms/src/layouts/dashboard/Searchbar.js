import { Icon } from '@iconify/react';
import { useState } from 'react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { experimentalStyled as styled, alpha } from '@material-ui/core/styles';
import {
    Box,
    Input,
    Slide,
    Button,
    InputAdornment,
    ClickAwayListener,
    IconButton
} from '@material-ui/core';


// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;
const SearchbarStyle = styled('div')(({ theme }) => ({
    top: 0, left: 0,
    zIndex: 99, width: "100%", display: "flex", position: 'absolute', alignItems: 'center',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    padding: theme.spacing(0, 3),
    boxShadow: theme.customShadows.z8,
    backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
    height: APPBAR_MOBILE,
    [theme.breakpoints.up('md')]: {
        height: APPBAR_DESKTOP,
        padding: theme.spacing(0, 5)
    }
}));

export default function Searchbar() {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        setIsOpen(prev => !prev)
    };
    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <div>
                {!isOpen && (
                    <IconButton onClick={handleOpen}>
                        <Icon icon={searchFill} width={20} height={20} />
                    </IconButton>
                )}
                <Slide direction='down' in={isOpen} mountOnEnter unmountOnExit>
                    <SearchbarStyle>
                        <Input autoFocus fullWidth disableUnderline
                            placeholder='Search...'
                            startAdornment={
                                <InputAdornment position="start">
                                    <Box
                                        component={Icon}
                                        icon={searchFill}
                                        sx={{ color: 'text.disabled', width: 20, height: 20 }}
                                    />
                                </InputAdornment>
                            }
                        />
                        <Button variant="contained" onClick={handleClose}>
                            Search
                        </Button>
                    </SearchbarStyle>
                </Slide>
            </div>
        </ClickAwayListener>
    )
}